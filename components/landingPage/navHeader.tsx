"use client";

import React, { FC, useState } from "react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { CgMenuRight } from "react-icons/cg";

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
                <a href="/login">
                  <Button variant={"link"}>Login</Button>
                </a>
              </li>
            </ul>
          </SheetContent>
        </Sheet>
      ) : (
        <ul className="flex items-center justify-between">
          <li>
            <Button variant={"link"}>Get Started</Button>
          </li>
          <li>
            <Button variant={"link"}>Pricing</Button>
          </li>
          <li>
            <Button variant={"link"}>About</Button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default NavHeader;
