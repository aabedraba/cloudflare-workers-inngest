import { serve } from 'inngest/edge';
import { Inngest } from 'inngest';

export interface Env {
	INNGEST_EVENT_KEY: string;
	INNGEST_SIGNING_KEY?: string;
	BRANCH?: string;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const inngest = new Inngest({
			name: 'My Cloudflare Worker',
			eventKey: env.INNGEST_EVENT_KEY,
			env: env?.BRANCH,
		});

		const helloWorld = inngest.createFunction({ name: 'Hello World' }, { event: 'demo/hello.world' }, () => 'Hello, Inngest!');

		const handler = serve(inngest, [helloWorld], {
			signingKey: env.INNGEST_SIGNING_KEY,
		});

		return handler(request, ctx);
	},
};
