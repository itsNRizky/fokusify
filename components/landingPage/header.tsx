import React, { FC } from "react";
import { Button } from "../ui/button";
import NavHeader from "./navHeader";
import Link from "next/link";

type Props = {
  className?: string;
};

const Header: FC<Props> = ({ className }) => {
  return (
    <header
      className={` ${className} fixed top-0 z-50 flex w-screen items-center justify-between bg-white py-4 `}
    >
      <Link href={"/"}>
        <h2 className="text-xl font-bold">Fokusify</h2>
      </Link>
      <div className="flex items-center">
        <Link href="mailto:its.nrizky@gmail.com">
          <Button variant={"link"}>Contact</Button>
        </Link>
        <a className="hidden sm:block" href="/login">
          <Button>Login</Button>
        </a>
      </div>
      <NavHeader type="hamburger" className="sm:hidden" />
    </header>
  );
};

export default Header;
