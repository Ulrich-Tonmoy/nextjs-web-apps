import { Hash, Mic, Video } from "lucide-react";

import MobileToggle from "@/components/mobile-toggle";
import UserAvatar from "@/components/user-avatar";
import { ChannelType } from "@prisma/client";
import SocketIndicator from "@/components/socket-indicator";

// import { ChatVideoButton } from "./chat-video-button";

interface ChatHeaderProps {
  serverId: string;
  name: string;
  channelType?: ChannelType;
  type: "channel" | "conversation";
  imageUrl?: string;
}

const iconMap = {
  [ChannelType.TEXT]: Hash,
  [ChannelType.AUDIO]: Mic,
  [ChannelType.VIDEO]: Video,
};

const ChatHeader = ({
  serverId,
  name,
  channelType = ChannelType.TEXT,
  type,
  imageUrl,
}: ChatHeaderProps) => {
  const Icon = iconMap[channelType];

  return (
    <div className="flex items-center h-12 px-3 font-semibold border-b-2 text-md border-neutral-200 dark:border-neutral-800">
      <MobileToggle serverId={serverId} />
      {type === "channel" && <Icon className="w-5 h-5 mr-2 text-zinc-500 dark:text-zinc-400" />}
      {type === "conversation" && (
        <UserAvatar src={imageUrl} className="w-8 h-8 mr-2 md:h-8 md:w-8" />
      )}
      <p className="font-semibold text-black text-md dark:text-white">{name}</p>
      <div className="flex items-center ml-auto">
        {type === "conversation" && (
          // <ChatVideoButton />
          <div />
        )}
        <SocketIndicator />
      </div>
    </div>
  );
};

export default ChatHeader;
