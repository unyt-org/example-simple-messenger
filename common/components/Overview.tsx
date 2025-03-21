import { type Chat } from "backend/entrypoint.tsx";
import { map } from "datex-core-legacy/functions.ts";
import { Datex } from "datex-core-legacy/datex.ts";
import { template } from "uix/html/template.ts";
import { Component } from "uix/components/Component.ts";

@template(function () {
  const chats = this.properties.chats;
  return (
    <div>
      <div class="header">
        <i
          onclick={() => this.write()}
          class="write fa-solid fa-pen-to-square"
        />
        <h1
          onclick={() =>
            navigator.clipboard.writeText(Datex.Runtime.endpoint.toString())}
        >
          {Datex.Runtime.endpoint.toString()}
        </h1>
        <img
          src={`https://api.dicebear.com/7.x/identicon/svg?seed=${Datex.Runtime.endpoint.toString()}`}
        />
      </div>
      {map(chats, (chat) => {
        const other = chat.members?.find((e) => e !== Datex.Runtime.endpoint)!;
        const latestMessage = chat.messages.at(-1);
        return (
          <a class="chat" href={`/${other.toString()}`}>
            <img
              src={`https://api.dicebear.com/7.x/identicon/svg?seed=${other.toString()}`}
            />
            <div>
              <h1>{other.toString()}</h1>
              <span data-empty={!latestMessage}>
                {latestMessage
                  ? (
                    <uix-fragment>
                      {latestMessage.origin !== other
                        ? <span>You:</span>
                        : undefined} {latestMessage!.content}
                    </uix-fragment>
                  )
                  : "No messages..."}
              </span>
            </div>
          </a>
        );
      })}

      {chats.length === 0
        ? <h1 class="empty">Pretty empty in here...</h1>
        : undefined}
    </div>
  );
})
export class Overview extends Component<{ chats: Chat[] }> {
  private write() {
    const endpointId = prompt("Write a message to", "");
    if (endpointId) {
      globalThis.location.href = `/${endpointId}`;
    }
  }

  // Life-cycle method that is called when the component is displayed
  protected override onDisplay() {
    console.info("The chats pointer", this.properties.chats);
  }
}
