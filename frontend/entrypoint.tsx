import { UIX } from "uix/uix.ts";
import { Entrypoint } from "backend/entrypoint.tsx";
import { ChatPage } from "common/components/ChatPage.tsx";
import "common/theme.ts";
import { Overview } from 'common/components/Overview.tsx';

export default {
	'/': async() => <Overview chats={await Entrypoint.getChats()}/>,
	'/:id': async(ctx) => {
		const id = ctx.urlMatch.get("id") ?? "unyt";
		try {
			const chat = await Entrypoint.getChat(id);
			if (!chat)
				throw new Error("Chat not found!");
			return <ChatPage chat={chat}/> // render the chat component
		} catch (error) {
			console.error(error);
			return <div class="error">
				<h1>Oups, this endpoint does not exist!</h1>
				<span>{error?.message ?? ''}</span>
				<a href={"/"}>Go back</a>
			</div>
		}
	}
} satisfies UIX.Entrypoint;
