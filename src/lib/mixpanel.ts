import mixpanel from 'mixpanel-browser';

mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_KEY as string);

export const Mixpanel = {
	trackVote: (vote: 'Y' | 'N') => {
		mixpanel.track('Vote', { vote });
	},
	trackVisitor: () => {
		mixpanel.track('New Visitor');
	},
	trackMessageSent: () => {
		mixpanel.track('Message Sent');
	},
};
