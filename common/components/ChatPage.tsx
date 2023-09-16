import { UIX } from "uix";
import { type Chat } from "backend/entrypoint.tsx";
import { map } from "unyt_core/functions.ts";
import { type Message } from 'backend/entrypoint.tsx';
import { Datex } from "unyt_core/datex.ts";

@UIX.template(function(this: ChatPage) {
	const members = this.options.$.chat.$.members;
	const other = members.val?.find(e => e !== Datex.Runtime.endpoint)!;
	return <div>
		<a href="/" class="header">
			<img src={`https://api.dicebear.com/7.x/identicon/svg?seed=${other.toString()}`}/>
			<h1>{other.toString()}</h1>
			<span>{other.alias ?? "No Alias"}</span>
		</a>
		<div class="chat" id="chat">
			{
				map(this.options.chat.messages, (message) => 
				message && 
					<div 
						class="message"
						data-sender={message.origin === Datex.Runtime.endpoint}>
						{message.content}
					</div>
				)
			}
		</div>
		<div class="input">
			<i class="fas fa-camera"/>
			<i class="far fa-laugh-beam"/>
			<input id="message" placeholder="Text message" type="text"/>
			<i onclick={UIX.inDisplayContext(()=>this.sendMessage())} id="send" class="fa fa-arrow-up"/>
		</div>
	</div>
})
export class ChatPage extends UIX.BaseComponent<UIX.BaseComponent.Options & {chat: Chat}> {
	/** references to the DOM elements */
	@id declare send: HTMLElement;
	@id declare message: HTMLInputElement;
	@id declare chat: HTMLDivElement;

	sendMessage() {
		if (!this.canSend)
			return;
		const message: Message = {
			content: this.message.value.trim(),
			timestamp: Datex.Time.now(),
			origin: Datex.Runtime.endpoint
		};

		this.options.chat.messages.push(message);
		this.message.value = '';
		this.message.dispatchEvent(new Event("input"));
	}

	get canSend() {
		return this.message.value.trim().length > 0;
	}

	// Life-cycle method that is called when the component is displayed
	protected override onDisplay(): void | Promise<void> {
		console.info("The chat pointer", this.options.chat);
		this.message.oninput = () =>
			this.send.classList.toggle("active", this.canSend);

		this.message.addEventListener("keydown", e => 
			e.key === "Enter" && this.sendMessage()
		);

		this.options.$.chat.$.messages.observe(()=>this.scrollDown());
		setTimeout(()=>this.scrollDown(), 400);
	}
	


	private scrollDown() {
		this.chat.scroll({ top: this.chat.scrollHeight, behavior: 'smooth' });
	}
}