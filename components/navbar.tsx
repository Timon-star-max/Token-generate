"use client";
import { useState } from "react";
import Image from "next/image";
import Logo from "@/public/images/logo.svg";
import Icon_Menu from "@/public/images/icons/menu/cross.svg";
import Icon_Menu_squre from "@/public/images/icons/menu/menu-square.svg";

const NavItem = ({ text, href, newTab, closeMobileMenu }: any) => {
  const handleClick = () => {
    try {
      closeMobileMenu();
    } catch (err) {}
  };
  return (
    <div
      className={` p-2 h-10 cursor-pointer rounded-sm text-white hover:text-[#FF6243] hover:bg-opacity-10`}
    >
      <a
        href={href}
        target={newTab ? "_blank" : "_self"}
        rel="noopener noreferrer"
        onClick={handleClick}
      >
        {text}
      </a>
    </div>
  );
};

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navItems = [
    { text: "Home", href: "/" },
    { text: "Deploy", href: "/#about" },
    { text: "About", href: "/#about" },
  ];

  return (
    <div
      className={`${
        isMobileMenuOpen
          ? "flex-col sticky h-screen top-0 w-full"
          : "flex-row sticky"
      } flex md:justify-between items-center md:py-6 md:px-12 px-4 py-2 bg-transparent backdrop-blur-xl top-0 z-[99]`}
    >
      <div className="flex flex-row w-full justify-between">
        <div>
          <Image src={Logo} width={40} height={40} alt="trial" />
        </div>
        <div className="hidden mx-auto gap-6 md:flex">
          {navItems.map((item, index) => (
            <NavItem key={index} text={item.text} href={item.href} />
          ))}
        </div>
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="px-4 py-2 text-sm">
            {isMobileMenuOpen ? (
              <Image
                src={Icon_Menu}
                width={24}
                height={24}
                alt="menu"
              />
            ) : (
              <Image
                src={Icon_Menu_squre}
                width={24}
                height={24}
                alt="menu"
              />
            )}
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden sticky top-0 left-0 w-full h-[screen]  backdrop-blur-sm bg-transparent">
          <div className="flex flex-col items-center mt-16 gap-5 text-lg">
            {navItems.map((item, index) => (
              <NavItem
                key={index}
                text={item.text}
                href={item.href}
                closeMobileMenu={closeMobileMenu}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
