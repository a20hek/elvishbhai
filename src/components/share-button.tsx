/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import { Toaster } from './ui/toaster';
import { useToast } from './ui/use-toast';

export const ShareButton = ({ title, text, url }: any) => {
	const [isShareSupported, setIsShareSupported] = useState(false);
	const { toast } = useToast();

	useEffect(() => {
		if (typeof window !== 'undefined' && 'navigator' in window) {
			setIsShareSupported('share' in navigator);
		}
	}, []);

	const copyToClipboard = async (textToCopy: string) => {
		try {
			await navigator.clipboard.writeText(textToCopy);
			toast({
				description: 'Copied to clipboard',
			});
		} catch (error) {
			console.error('Failed to copy text: ', error);
		}
	};

	const handleShareClick = async () => {
		if (isShareSupported && navigator.share) {
			try {
				await navigator.share({
					title,
					text,
					url,
				});
			} catch (error) {
				console.error('Something went wrong with sharing', error);
			}
		} else {
			copyToClipboard(url);
		}
	};

	return (
		<div className='w-full flex justify-end'>
			<Toaster />
			<button
				onClick={handleShareClick}
				className='align-right px-4 py-1 rounded-md border border-slate-400 flex items-center justify-center text-black font-semibold text-lg mb-6'>
				<img src='/share.svg' className='w-auto h-6 mr-2' alt='share' />
				share
			</button>
		</div>
	);
};
