import { footerLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex flex-col text-black-100 mt-5 border-t border-gray-100">
      <div className="flex max-md:flex-col flex-wrap justify-between gap-5 sm:px-16 px-6 py-10">
        <div className="flex flex-col justify-start gap-6">
          <Image
            src="/logo.svg"
            alt="Car Logo"
            width={118}
            height={18}
            className="object-contain"
          />
          <p className="text-base text-gray-700">
            Car Hub {new Date().getFullYear()} <br />
            All Rights Reserved &copy;
          </p>
        </div>
        <div className="footer__links">
          {footerLinks?.map((link) => (
            <div key={link.title} className="footer_link">
              <h3 className="font-bold">{link?.title}</h3>
              <div className="flex flex-col gap-5">
                {link?.links?.map((item) => (
                  <Link key={item.title} href={item.url} className="text-gray-500">
                    {item?.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between items-center flex-wrap mt-10 border-t border-gray-100 sm:px-16 px-6 py-10">
        <p>@{new Date().getFullYear()} CarHub. All rights reserved</p>
        <div className="footer__copyrights-link">
          <Link href="/" className="text-gray-500">
            Privacy & Policy
          </Link>
          <Link href="/" className="text-gray-500">
            Terms & Condition
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
