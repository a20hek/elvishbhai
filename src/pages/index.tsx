import axios from 'axios';
import { Inter } from 'next/font/google';
import { useEffect, useRef, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	const [name, setName] = useState<string>('');
	const [onlineUsers, setOnlineUsers] = useState<number>(0);
	const [messages, setMessages] = useState<string[]>([]);
	const wsRef = useRef<WebSocket | null>(null);

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

		populateMessages();

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

	const sendMessage = async (content: 'Elvish bhaaai' | 'Yes') => {
		if (name && content && wsRef.current) {
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
		<main className={`${inter.className} mx-6`}>
			<h1 className='text-5xl font-bold mb-4 mt-8'>
				Elvish Bhai ke aage koi kuch bol sakta hai kya?
			</h1>
			<hr className='my-6' />
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
						className='px-4 py-2 bg-[#C2CAC526] text-black rounded font-bold text-2xl border border-black transition-transform transform active:scale-95 hover:bg-[#C2CAC540] text-center'>
						Elvish bhaaai
					</button>

					<button
						onClick={() => sendMessage('Yes')}
						className='flex-1 px-4 py-2 bg-[#C2CAC526] text-black rounded font-bold text-2xl border border-black transition-transform transform active:scale-95 hover:bg-[#C2CAC540] text-center'>
						Yes
					</button>
				</div>
				<hr className='my-6' />
			</div>
			<div className='flex items-center my-4'>
				<div className='h-3 w-3 bg-green-500 rounded-full animate-pulse mr-2'></div>
				<p className='text-gray-400'>
					<span className='text-black font-semibold'>{onlineUsers}</span> People Online
				</p>
			</div>
			<div>
				<ul className='list-inside mt-4'>
					{[...messages].reverse().map((msg, idx) => (
						<li key={idx} className='mb-2'>
							{msg}
						</li>
					))}
				</ul>
			</div>
		</main>
	);
}
