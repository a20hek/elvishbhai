// import { NextApiRequest, NextApiResponse } from 'next';
// import { supabase } from '@/lib/supabase';

// const incrementCount = async (id: 'Elvish bhaaai' | 'Yes') => {
// 	try {
// 		const { data: initialData, error: getError } = await supabase
// 			.from('count')
// 			.select('count')
// 			.eq('id', id)
// 			.single();

// 		if (getError) {
// 			throw getError;
// 		}

// 		if (!initialData || typeof initialData.count !== 'number') {
// 			throw new Error('Count not found');
// 		}

// 		const incrementedCount = initialData.count + 1;

// 		const { data, error: updateError } = await supabase
// 			.from('count')
// 			.update({ count: incrementedCount })
// 			.eq('id', id);

// 		if (updateError) {
// 			throw updateError;
// 		}

// 		return data;
// 	} catch (error) {
// 		throw error;
// 	}
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
// 	if (req.method === 'POST') {
// 		const { id } = req.body;

// 		if (id === 'Elvish bhaaai' || id === 'Yes') {
// 			try {
// 				const updatedData = await incrementCount(id);
// 				res.status(200).json(updatedData);
// 			} catch (error: any) {
// 				res.status(500).json({ error: error.message || error });
// 			}
// 		} else {
// 			res.status(400).json({ error: 'Invalid id' });
// 		}
// 	} else {
// 		res.status(405).end();
// 	}
// }
