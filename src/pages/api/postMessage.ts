import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		return res.status(405).end();
	}

	const { name, content } = req.body;

	if (!name || !content) {
		return res.status(400).json({ error: 'Name and content are required fields.' });
	}

	try {
		const { data, error } = await supabase.from('message').insert([{ name, content }]);

		if (error) {
			throw error;
		}

		return res.status(201).json(data);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'An error occurred while inserting the data.' });
	}
}
