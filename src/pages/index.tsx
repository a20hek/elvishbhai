/* eslint-disable @next/next/no-img-element */
import { ProgressBar } from '@/components/progress-bar';
import axios from 'axios';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

const MessagesComponent = ({ messages }: { messages: string[] }) => {
	return (
		<ul>
			{[...messages].reverse().map((msg, idx) => {
				const [_, name, content] = msg.match(/@([\w\d]+): (.+)/) || [];
				return (
					<li key={idx} className='mb-2'>
						<span className='font-semibold text-lg lg:text-xl text-slate-500'>{`@${name}:`}</span>
						<span className='ml-2 text-lg lg:text-xl text-slate-500'>{content}</span>
					</li>
				);
			})}
		</ul>
	);
};

export default function Home() {
	const [name, setName] = useState<string>('');
	const [onlineUsers, setOnlineUsers] = useState<number>(0);
	const [messages, setMessages] = useState<string[]>([]);
	const wsRef = useRef<WebSocket | null>(null);

	const [elvishCount, setElvishCount] = useState<number>(0);
	const [yesCount, setYesCount] = useState<number>(0);

	const [rotateElvish, setRotateElvish] = useState(false);

	useEffect(() => {
		const populateMessages = async () => {
			try {
				const response = await axios.get('/api/getMessages');
				const fetchedMessages = response.data.map(
					(message: any) => `@${message.name}: ${message.content}`
				);
				setMessages(fetchedMessages);
			} catch (error) {
				console.error('An error occurred while fetching messages:', error);
			}
		};

		const fetchCounts = async () => {
			try {
				const response = await axios.get('/api/getCount');
				setElvishCount(response.data.elvishCount);
				setYesCount(response.data.yesCount);
			} catch (error) {
				console.error('An error occurred while fetching counts:', error);
			}
		};

		populateMessages();
		fetchCounts();

		wsRef.current = new WebSocket('wss://wsgo-production.up.railway.app/ws');
		// wsRef.current = new WebSocket('ws://localhost:8080/ws');

		wsRef.current.onmessage = (event) => {
			const data = JSON.parse(event.data);

			switch (data.messageType) {
				case 'online':
					setOnlineUsers(data.data);
					break;
				case 'chat':
					setMessages((prevMessages) => [...prevMessages, data.data]);
					break;
				default:
					break;
			}
		};

		return () => {
			if (wsRef.current) {
				wsRef.current.close();
			}
		};
	}, []);

	useEffect(() => {
		let timer: NodeJS.Timeout;
		if (rotateElvish) {
			timer = setTimeout(() => {
				setRotateElvish(false);
			}, 1500);
		}
		return () => {
			clearTimeout(timer);
		};
	}, [rotateElvish]);

	const sendMessage = async (content: 'Elvish bhaaai' | 'Yes') => {
		if (name && content && wsRef.current) {
			if (content === 'Elvish bhaaai') {
				const audio = new Audio('/elv.mp3');
				setRotateElvish(true);
				audio.play().catch((error) => console.error('Audio play failed:', error));
			}

			const composedMessage = `@${name}: ${content}`;
			wsRef.current.send(
				JSON.stringify({
					messageType: 'chat',
					data: composedMessage,
				})
			);
			try {
				const response = await axios.post('/api/postMessage', {
					name,
					content,
				});
				console.log('Message posted successfully:', response.data);
			} catch (error) {
				console.error('An error occurred while posting the message:', error);
			}
		}
	};

	return (
		<>
			<Head>
				<title>Elvish Bhai ke aage koi kuch bol sakta hai kya?</title>
			</Head>
			<main className={`${inter.className} mx-6 mt-4 lg:mt-12`}>
				<div className='flex flex-col lg:flex-row lg:max-w-[1200px] mx-auto'>
					<div className='mx-auto max-w-[600px]'>
						<h1 className='text-5xl lg:text-7xl font-bold mb-4 mt-8'>
							Elvish Bhai ke aage koi kuch bol sakta hai kya?
						</h1>
						<ProgressBar
							elvishCount={elvishCount}
							yesCount={yesCount}
							rotateElvish={rotateElvish}
						/>
						<div className='space-y-4'>
							<div className='relative'>
								<input
									value={name}
									onChange={(e) => setName(e.target.value)}
									placeholder='enter your name'
									className='pl-10 p-2 border rounded w-full text-gray-600 text-xl h-12'
								/>
								<span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-[#CBD5E1] text-xl'>
									@
								</span>
							</div>
							<div className='flex justify-between gap-4'>
								<button
									onClick={() => sendMessage('Elvish bhaaai')}
									className='w-3/5 px-4 py-2 bg-[#C2CAC526] text-black rounded font-bold text-2xl border border-black transition-transform transform active:scale-95 hover:bg-[#C2CAC540] text-center'>
									Elvish bhaaai
								</button>

								<button
									onClick={() => sendMessage('Yes')}
									className='flex-1 px-4 py-2 bg-[#C2CAC526] text-black rounded font-bold text-2xl border border-black transition-transform transform active:scale-95 hover:bg-[#C2CAC540] text-center'>
									Yes
								</button>
							</div>
						</div>
					</div>
					<div className='max-w-[600px] sm:mx-auto'>
						<div className='lg:w-auto sm:w-[600px] '>
							<div className='flex items-center my-4 mt-10 lg:my-10 lg:mb-12'>
								<div className='h-3 w-3 bg-green-500 rounded-full animate-pulse mr-2'></div>
								<p className='text-gray-400 text-lg lg:text-xl'>
									<span className='text-black font-semibold'>{onlineUsers}</span> People Online
								</p>
							</div>
							<div>
								<MessagesComponent messages={messages} />
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
