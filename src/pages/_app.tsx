import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';

const initMessage = () => {
	console.log(
		'%celvish bhai sees you.',
		'color: light-green; font-size: 22px; font-weight: medium;'
	);
};

const consoleOpenMsg = () => {
	console.log(
		'%celvish bhai wants you to get a life.',
		'color: red; font-size: 24px; font-weight: medium;'
	);
};

export default function App({ Component, pageProps }: AppProps) {
	const [messageDisplayed, setMessageDisplayed] = useState(false);
	const [initMessageDisplayed, setInitMessageDisplayed] = useState(false);
	useEffect(() => {
		if (!initMessageDisplayed) {
			initMessage();
			setInitMessageDisplayed(true);
		}

		let timeoutId: NodeJS.Timeout;

		const onConsoleOpen = () => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}

			timeoutId = setTimeout(() => {
				if (!messageDisplayed) {
					consoleOpenMsg();
					setMessageDisplayed(true);
				}
			}, 5000);
		};

		window.addEventListener('resize', onConsoleOpen);

		return () => {
			window.removeEventListener('resize', onConsoleOpen);
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
		};
	}, [messageDisplayed, initMessageDisplayed]);
	return <Component {...pageProps} />;
}
