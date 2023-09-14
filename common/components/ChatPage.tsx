import { UIX } from "uix";
import { type Chat } from "backend/entrypoint.tsx";
import { map } from "unyt_core/functions.ts";
import { always } from 'unyt_core/datex_short.ts';

@UIX.template(function(this: ChatPage) {
	const messages = this.options.$.chat.$.messages;
	return <div>
		<div class="header">
			<img src="https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/7/73/SMH_Mentor_6.png"/>
			<h1>Jonas Strehle</h1>
			<span>Today at 12:55</span>
		</div>
		<div class="chat">
			{
				map(this.options.chat.messages, (message, index) => 
				message && 
					<div class="message" data-sender={!!message.origin ?? false}>
						{message.content}
					</div>
				)
			}
		</div>
		<div class="input">
			<i class="fas fa-camera"/>
			<i class="far fa-laugh-beam"/>
			<input placeholder="Text message" type="text"/>
			<i id="send-button" class="fa fa-arrow-up"/>
		</div>
	</div>
})
export class ChatPage extends UIX.BaseComponent<UIX.BaseComponent.Options & {chat: Chat}> {
	/** references to the DOM elements */
	@id declare name: HTMLInputElement;
	@id declare amount: HTMLInputElement;
	@id declare type: HTMLOptionElement;
	@id declare dialog: HTMLDivElement;

	// Method that returns the internal route of the component
	override getInternalRoute() {
		return [globalThis.location.pathname]
	}

	// Life-cycle method that is called when the component is displayed
	protected override onDisplay(): void | Promise<void> {
		console.info("The list pointer", this.options.chat)
	}
}