// /api/countMessages.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'GET') {
		return res.status(405).end();
	}

	try {
		const { data, error } = await supabase.from('message').select('content');

		if (error) {
			throw error;
		}

		if (!data) {
			return res.status(500).json({ error: 'Data is null' });
		}

		let elvishCount = 0;
		let yesCount = 0;
		data.forEach((row) => {
			if (row.content === 'Elvish bhaaai') {
				elvishCount++;
			}
			if (row.content === 'Yes') {
				yesCount++;
			}
		});

		return res.status(200).json({ elvishCount, yesCount });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'An error occurred while fetching the data.' });
	}
}
