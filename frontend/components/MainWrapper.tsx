import { ReactNode } from "react";
import Image from "next/image";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "@nextui-org/link";

interface MainWrapperProps {
  children: ReactNode;
}

export default function MainWrapper({ children }: MainWrapperProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 border-b bg-white shadow-md">
        <div className="container mx-auto p-2">
          <div className="flex items-center justify-between">
            <div className="relative h-12 w-32 sm:h-14 sm:w-40 md:h-16 md:w-48">
              <Image
                src="/Nawy_Logo.png"
                alt="Nawy Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden md:flex md:gap-8">
              <Link href="/" color="foreground" isBlock>
                Home
              </Link>
              <Link href="/about" color="foreground" isBlock>
                About
              </Link>
            </div>
            <div className="relative h-12 w-32 sm:h-14 sm:w-40 md:h-16 md:w-48"></div>
          </div>
        </div>
      </header>

      <main className="flex-grow">{children}</main>

      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="relative mb-6 h-20 w-60 md:mb-0">
              <Image
                src="/Nawy_Logo.png"
                alt="Nawy Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col items-center md:items-end">
              <div className="mb-4 flex gap-4">
                <a
                  href="#"
                  className="text-gray-600 transition-colors hover:text-gray-900"
                >
                  <FaFacebook size={35} />
                </a>
                <a
                  href="#"
                  className="text-gray-600 transition-colors hover:text-gray-900"
                >
                  <FaTwitter size={35} />
                </a>
                <a
                  href="#"
                  className="text-gray-600 transition-colors hover:text-gray-900"
                >
                  <FaInstagram size={35} />
                </a>
                <a
                  href="#"
                  className="text-gray-600 transition-colors hover:text-gray-900"
                >
                  <FaLinkedin size={35} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
