// deno-lint-ignore-file require-await
import { UIX } from "uix/uix.ts";
import "common/theme.ts";
import { Datex } from "unyt_core/datex.ts";

export type Message = {
	content: string,
	timestamp: Datex.Time,
	origin?: Datex.Endpoint
}

export type Chat = {
	id: string,
	members: Datex.Endpoint[],
	messages: Message[]
}

const chat: Chat = $$({
	id: "test",
	members: $$([]),
	messages: $$([
		{
			content: "Das ist ein Test",
			timestamp: Datex.Time.now(),
		},
		{
			content: "Das ist ein Test",
			timestamp: Datex.Time.now(),
			origin: "x",
		},
		{
			content: "Das ist ein Test",
			timestamp: Datex.Time.now(),
		}
	])
})

// The backend endpoint definition
@endpoint
export class Entrypoint {
	@property
	// Exposing the getList backend function
	static async getChat(id: string): Promise<Chat> {
		return chat;
	}
}

// The frontend routes definition
export default {
	'/*': null // Letting the frontend handle all other routes
} satisfies UIX.Entrypoint;