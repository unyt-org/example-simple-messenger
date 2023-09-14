import { UIX } from "uix";
import { type Chat } from "backend/entrypoint.tsx";
import { map } from "unyt_core/functions.ts";
import { type Message } from 'backend/entrypoint.tsx';
import { Datex } from "unyt_core/datex.ts";

declare const DatexRuntime: any;

@UIX.template(function(this: ChatPage) {
	const members = this.options.$.chat.$.members;
	const other = members.val?.find(e => e !== DatexRuntime.endpoint)!;
	return <div>
		<a href="/" class="header">
			<img src={`https://api.dicebear.com/7.x/identicon/svg?seed=${other.name}`}/>
			<h1>@{other.name}</h1>
			<span>{other.alias ?? ""}</span>
		</a>
		<div class="chat">
			{
				map(this.options.chat.messages, (message) => 
				message && 
					<div 
						class="message"
						data-sender={message.origin === DatexRuntime.endpoint}>
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

	sendMessage() {
		if (!this.canSend)
			return;
		const message: Message = {
			content: this.message.value.trim(),
			timestamp: Datex.Time.now(),
			origin: DatexRuntime.endpoint
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
		this.message.oninput = () => {
			this.send.classList.toggle("active", this.canSend);
		}
	}
}