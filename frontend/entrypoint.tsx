import { Entrypoint } from "uix/providers/entrypoints.ts";
import { Chats } from "backend/entrypoint.tsx";
import { ChatPage } from "common/components/ChatPage.tsx";
import { Overview } from "common/components/Overview.tsx";

export default {
  "/": async () => {
    const chats = await Chats.getChats();
    return <Overview chats={chats} />;
  },
  "*": async (ctx) => {
    const id = decodeURIComponent(ctx.path).slice(1);
    console.log(id);
    try {
      const chat = await Chats.getChat(id ?? "unyt");
      if (!chat) {
        throw new Error("Chat not found!");
      }
      console.log(chat);
      return <ChatPage chat={chat} />; // render the chat component
    } catch (error) {
      console.error(error);
      return (
        <div class="error">
          <h1>Oups, this endpoint does not exist!</h1>
          <span>{(error as Error)?.message ?? ""}</span>
          <a href={"/"}>Go back</a>
        </div>
      );
    }
  },
} satisfies Entrypoint;
