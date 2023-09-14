import { UIX } from "uix/uix.ts";
import { Entrypoint } from "../backend/entrypoint.tsx";
import { ChatPage } from "../common/components/ChatPage.tsx";
import "../common/theme.ts";

export default {
	'/': null,
	'/*': async(ctx) => {
		const id = ctx.path.slice(1); // remove leading slash
		return <ChatPage chat={await Entrypoint.getChat(id)}/> // render the list component
	}
} satisfies UIX.Entrypoint;
