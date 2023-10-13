import mixpanel from 'mixpanel-browser';

mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_KEY as string);

export const Mixpanel = {
	trackVote: (vote: 'Y' | 'N') => {
		console.log(`Tracking vote: ${vote}`);
		mixpanel.track('Vote', { vote });
	},
	trackVisitor: () => {
		console.log('Tracking new visitor');
		mixpanel.track('New Visitor');
	},
	trackMessageSent: () => {
		console.log('Tracking message sent');
		mixpanel.track('Message Sent');
	},
};
