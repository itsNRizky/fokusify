import React, { FC } from "react";
import { Button } from "../ui/button";
import { CgMenuRight } from "react-icons/cg";
import NavHeader from "./navHeader";

type Props = {
  className?: string;
};

const Header: FC<Props> = ({ className }) => {
  return (
    <header
      className={` ${className} fixed top-0 z-50 flex w-screen items-center justify-between bg-white py-4`}
    >
      <h2 className="text-xl font-bold">Fokusify</h2>
      {/* <NavHeader type="shown" className="hidden sm:block" /> */}
      <a className="hidden sm:block" href="/login">
        <Button>Login</Button>
      </a>
      <NavHeader type="hamburger" className="sm:hidden" />
    </header>
  );
};

export default Header;
