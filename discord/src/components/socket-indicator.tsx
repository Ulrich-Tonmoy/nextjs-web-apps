"use client";

import { useSocket } from "@/components/providers/socket-provider";
import { Badge } from "@/components/ui/badge";
import { Fragment } from "react";

const SocketIndicator = () => {
  const { isConnected } = useSocket();

  if (!isConnected) {
    return (
      <Badge variant="outline" className="text-white bg-yellow-600 border-none">
        Fallback<span className="hidden sm:block">: Polling every 1s</span>
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className="text-white border-none bg-emerald-600">
      Live<span className="hidden sm:block">: Real-time updates</span>
    </Badge>
  );
};

export default SocketIndicator;
