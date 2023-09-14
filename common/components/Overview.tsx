import { UIX } from "uix";
import { type Chat } from "backend/entrypoint.tsx";
import { map } from "unyt_core/functions.ts";

declare const DatexRuntime: any;

@UIX.template(function(this: Overview) {
	const chats = this.options.chats;
	return <div>
		<i onclick={UIX.inDisplayContext(()=>this.write())} class="write fa-solid fa-pen-to-square"/>
		<h1 onclick={UIX.inDisplayContext(()=>{
			navigator.clipboard.writeText(new URL("/".concat(DatexRuntime.endpoint.name), location.href).toString())
		})}>@{DatexRuntime.endpoint.name}</h1>
		<>{
			map(chats, (chat) => {
				const other = chat.members?.find(e => e !== DatexRuntime.endpoint)!;
				const latestMessage = chat.messages.at(-1);
				return <a class="chat" href={`/${other.name}`}>
					<img src={`https://api.dicebear.com/7.x/identicon/svg?seed=${other.name}`}/>
					<div>
						<h1>@{other.name}</h1>
						<span data-empty={!latestMessage}>
							{latestMessage ? 
								<>{latestMessage.origin !== other ? <span>You:</span> : undefined} {latestMessage!.content}</> : 
								'No messages...'
							}
						</span>
					</div>
				</a>
			})
		}
		</>
		<>
			{
				chats.length === 0 ? <h1 class="empty">Pretty empty in here...</h1> : undefined
			}
		</>
	</div>
})
export class Overview extends UIX.BaseComponent<UIX.BaseComponent.Options & {chats: Chat[]}> {
	private write() {
		const endpointId = prompt("Write a message to", "");
		if (endpointId)
			window.location.href = `/${endpointId}`;
	}

	// Life-cycle method that is called when the component is displayed
	protected override onDisplay(): void | Promise<void> {
		console.info("The chats pointer", this.options.chats);
	}
}