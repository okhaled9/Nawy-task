"use client";
import { ReactNode, useState } from "react";
import Image from "next/image";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link
} from "@nextui-org/react";
import { usePathname } from "next/navigation";

interface MainWrapperProps {
  children: ReactNode;
}

export default function MainWrapper({ children }: MainWrapperProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" }
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar onMenuOpenChange={setIsMenuOpen} isBordered>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <div className="relative h-12 w-32 sm:h-14 sm:w-40 md:h-16 md:w-48">
              <Image
                src="/Nawy_Logo.png"
                alt="Nawy Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden gap-4 sm:flex" justify="center">
          {menuItems.map((item) => (
            <NavbarItem key={item.name} isActive={pathname === item.href}>
              <Link color="foreground" href={item.href}>
                {item.name}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item) => (
            <NavbarMenuItem key={item.name}>
              <Link
                className="w-full"
                color={pathname === item.href ? "primary" : "foreground"}
                href={item.href}
                size="lg"
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>

      <main className="flex-grow">{children}</main>

      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="relative mb-6 h-12 w-32 sm:h-14 sm:w-40 md:mb-0 md:h-16 md:w-48">
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
