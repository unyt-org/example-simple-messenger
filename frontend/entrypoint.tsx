import { Entrypoint } from "uix/html/entrypoints.ts";
import { Chats } from "backend/entrypoint.tsx";
import { ChatPage } from "common/components/ChatPage.tsx";
import { Overview } from 'common/components/Overview.tsx';

export default {
	'/': async () => <Overview chats={await Chats.getChats()}/>,
	'/:id': async (_, { id }) => {
		try {
			const chat = await Chats.getChat(id ?? "unyt");
			if (!chat)
				throw new Error("Chat not found!");
			return <ChatPage chat={chat}/> // render the chat component
		} catch (error) {
			console.error(error);
			return (
				<div class="error">
					<h1>Oups, this endpoint does not exist!</h1>
					<span>{error?.message ?? ''}</span>
					<a href={"/"}>Go back</a>
				</div>
			)
		}
	}
} satisfies Entrypoint;
