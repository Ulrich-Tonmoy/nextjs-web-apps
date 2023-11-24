import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";
import HomeIcon from "../icons/homeIcon";
import SettingsIcon from "../icons/settingsIcon";
import TrashIcon from "../icons/trashIcon";
import Settings from "../settings/settings";
import Trash from "../trash/trash";

interface NativeNavigationProps {
  myWorkspaceId: string;
  className?: string;
}

const NativeNavigation = ({ myWorkspaceId, className }: NativeNavigationProps) => {
  return (
    <nav className={twMerge("my-2", className)}>
      <ul className="flex flex-col gap-2">
        <li>
          <Link
            className="group/native flex text-Neutrals/neutrals-7 transition-all gap-2"
            href={`/dashboard/${myWorkspaceId}`}
          >
            <HomeIcon />
            <span>My Workspace</span>
          </Link>
        </li>

        <Settings>
          <li className="group/native flex text-Neutrals/neutrals-7 transition-all gap-2 cursor-pointer">
            <SettingsIcon />
            <span>Settings</span>
          </li>
        </Settings>

        <Trash>
          <li className="group/native flex text-Neutrals/neutrals-7 transition-all gap-2">
            <TrashIcon />
            <span>Trash</span>
          </li>
        </Trash>
      </ul>
    </nav>
  );
};

export default NativeNavigation;
