/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef } from 'react';
import CountUp from 'react-countup';
interface ProgressBarProps {
	elvishCount: number;
	yesCount: number;
	maxCount?: number;
	rotateElvish: boolean;
}

export const ProgressBar = ({
	elvishCount,
	yesCount,
	rotateElvish,
	maxCount = 100,
}: ProgressBarProps) => {
	const elvishPercentage = (elvishCount / maxCount) * 100;
	const yesPercentage = (yesCount / maxCount) * 100;

	const prevElvishCountRef = useRef<number>(elvishCount);
	const prevYesCountRef = useRef<number>(yesCount);

	useEffect(() => {
		prevElvishCountRef.current = elvishCount;
	}, [elvishCount]);

	useEffect(() => {
		prevYesCountRef.current = yesCount;
	}, [yesCount]);

	return (
		<div className='my-12 lg:my-20 relative'>
			<div className='flex w-full z-0'>
				<div
					className='bg-[#22C55E] h-12 mt-2'
					style={{
						width: `${elvishPercentage}%`,
					}}></div>
				<div
					className='bg-[#94A3B8] h-12 mt-2'
					style={{
						width: `${yesPercentage}%`,
					}}></div>
			</div>

			<img
				src='/elv.png'
				alt='Elvish bhaaai'
				className={`absolute top-0 left-[-12px] h-16 w-auto object-cover z-10 ${
					rotateElvish ? 'fast-spin' : ''
				}`}
			/>
			<img
				src='/yes.png'
				alt='Yes'
				className='absolute top-0 right-[-16px] h-16 object-cover z-10'
			/>

			<div className='flex justify-between mt-4'>
				<div>
					<p className='font-bold text-2xl'>Elvish Bhaaai</p>
					<p className='font-semibold text-2xl text-gray-500'>
						<CountUp start={prevElvishCountRef.current} end={elvishCount} duration={2} />
					</p>
				</div>
				<div>
					<p className='font-bold text-2xl'>Yes</p>
					<p className='font-semibold text-2xl text-gray-500'>
						<CountUp start={prevYesCountRef.current} end={yesCount} duration={2} />
					</p>
				</div>
			</div>
		</div>
	);
};
