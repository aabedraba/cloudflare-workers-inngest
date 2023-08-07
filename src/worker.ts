import { serve } from 'inngest/edge';
import { Inngest } from 'inngest';

export interface Env {
	INNGEST_EVENT_KEY: string;
}

export const inngest = new Inngest({
	name: 'My Cloudflare Worker',
});

const helloWorld = inngest.createFunction({ name: 'Hello World' }, { event: 'demo/hello.world' }, () => 'Hello, Inngest!');

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const handler = serve(inngest, [helloWorld]);

		return handler(request, ctx);
	},
};
