"use client";

import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Video, VideoOff } from "lucide-react";


import ActionTooltip from "@/components/action-tooltip";

const ChatVideoButton = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const isVideo = searchParams?.get("call");

  const onClick = () => {
    const url = qs.stringifyUrl({
      url: pathname || "",
      query: {
        call: isVideo ? undefined : true,
      }
    }, { skipNull: true });

    router.push(url);
  }
  
  const Icon = isVideo ? VideoOff : Video;
  const tooltipLabel = isVideo ? "End video call" : "Start video call";

  return (
    <ActionTooltip side="bottom" label={tooltipLabel}>
      <button onClick={onClick} className="mr-4 transition hover:opacity-75">
        <Icon className="w-6 h-6 text-zinc-500 dark:text-zinc-400" />
      </button>
    </ActionTooltip>
  )
}

export default ChatVideoButton;