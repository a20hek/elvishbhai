// import { NextApiRequest, NextApiResponse } from 'next';
// import { supabase } from '@/lib/supabase';

// const getCountById = async (id: 'Elvish bhaaai' | 'Yes'): Promise<number> => {
// 	try {
// 		const { data, error } = await supabase.from('count').select('count').eq('id', id).single();

// 		if (error) {
// 			throw error;
// 		}

// 		if (!data || typeof data.count !== 'number') {
// 			throw new Error('Count not found');
// 		}

// 		return data.count;
// 	} catch (error) {
// 		throw error;
// 	}
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
// 	if (req.method === 'GET') {
// 		try {
// 			const elvishCount = await getCountById('Elvish bhaaai');
// 			const yesCount = await getCountById('Yes');

// 			const realElvishCount = elvishCount + 12000;
// 			const realYesCount = yesCount + 2000;

// 			res.status(200).json({ elvishCount: realElvishCount, yesCount: realYesCount });
// 		} catch (error: any) {
// 			res.status(500).json({ error: error.message || error });
// 		}
// 	} else {
// 		res.status(405).end();
// 	}
// }
