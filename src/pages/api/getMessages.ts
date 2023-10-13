import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'GET') {
		return res.status(405).end();
	}

	try {
		const { data, error } = await supabase.from('message').select('*');

		if (error) {
			throw error;
		}

		return res.status(200).json(data);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'An error occurred while fetching the data.' });
	}
}
