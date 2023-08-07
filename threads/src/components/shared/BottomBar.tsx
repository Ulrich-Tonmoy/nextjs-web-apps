"use client";

import { sidebarLinks } from "@/constants";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const BottomBar = () => {
  const router = useRouter();
  const pathName = usePathname();

  return (
    <section className="bottom-bar">
      <div className="bottom-bar_container">
        {sidebarLinks.map((link, i) => {
          const isActive =
            (pathName.includes(link.route) && link.route.length > 1) ||
            pathName === link.route;

          return (
            <Link
              href={link.route}
              key={i}
              className={`bottom-bar_link ${isActive && "bg-primary-500"}`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-subtle-medium text-light-1 max-sm:hidden">
                {link.label.split(/\s+./)[0]}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default BottomBar;
