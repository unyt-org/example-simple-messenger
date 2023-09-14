// deno-lint-ignore-file require-await
import "common/theme.ts";
import { Datex } from "unyt_core/datex.ts";

// Our chat list
const chats: Chat[] = eternalVar("chats") ?? $$([]);

// The message definition
export type Message = {
	content: string,
	timestamp: Datex.Time | number,
	origin: Datex.Endpoint
}

// The chat definition
export type Chat = {
	id: string,
	createdAt: Datex.Time | number,
	members: Datex.Endpoint[],
	messages: Message[]
}

// The backend endpoint definition
@endpoint
export class Entrypoint {

	@property
	// Exposing the getChats backend function
	static async getChats(): Promise<Chat[]> {
		const me = datex.meta?.sender;
		return chats
			.filter(e => me && e.members.includes(me))
			.sort((a, b) => (
				+(b.messages.at(-1)?.timestamp || b.createdAt) - +(a.messages.at(-1)?.timestamp || a.createdAt)
			));
	}

	@property
	// Exposing the getChat backend function
	static async getChat(endpointId: string): Promise<Chat | undefined> {
		const other = new Datex.IdEndpoint(endpointId);
		const me = datex.meta?.sender;
		const chat = me && chats.find((chat) => 
			chat.members.includes(me) && 
			chat.members.includes(other)
		);
		return chat || await this.startChat(endpointId);
	}

	// The startChat backend function
	private static async startChat(endpointId: string): Promise<Chat> {
		const sender = datex.meta?.sender!;
		const other = new Datex.IdEndpoint(endpointId);
		if (other === sender)
			throw new Error("You can't chat with yourself! Or can you?");

		const members = [other, sender];
		const chat = $$({
			id: (Math.random() * 1000).toString(),
			createdAt: Datex.Time.now(),
			members,
			messages: $$([])
		});
		chats.push(chat);
		return chat;
	}
}