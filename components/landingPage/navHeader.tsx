"use client";

import React, { FC, useState } from "react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { CgMenuRight } from "react-icons/cg";
import Link from "next/link";

type Props = {
  className?: string;
  type: "shown" | "hamburger";
};

const NavHeader: FC<Props> = ({ className, type }) => {
  return (
    <nav className={`${className}`}>
      {type === "hamburger" ? (
        <Sheet>
          <SheetTrigger>
            <Button asChild variant={"ghost"} size={"icon"}>
              <CgMenuRight size={32} />
            </Button>
          </SheetTrigger>
          <SheetContent side={"top"} className="pt-14">
            <ul className="text-right">
              <li>
                <Link href="/login">
                  <Button variant={"link"}>Login</Button>
                </Link>
              </li>
              <li>
                <Link href="mailto:its.nrizky@gmail.com">
                  <Button variant={"link"}>Contact</Button>
                </Link>
              </li>
            </ul>
          </SheetContent>
        </Sheet>
      ) : null}
    </nav>
  );
};

export default NavHeader;
