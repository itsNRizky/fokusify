"use client";
import React, { FC } from "react";
import { Button } from "../ui/button";
import BottomSheet from "../ui/bottomSheet";
import Toolbar from "./toolbar";

type Props = {
  className?: string;
};

const FooterApp: FC<Props> = (props: Props) => {
  return (
    <footer className={props.className}>
      <nav>
        <ul className="flex items-center justify-between p-4">
          <li className="hidden w-1/3 justify-start sm:flex">
            <h6 className="text-xs">Fokusify ver 1.0</h6>
          </li>
          <li className="flex flex-1 justify-center">
            <Toolbar />
          </li>
          <li className="flex w-1/3 justify-end">
            <Button>Finish</Button>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default FooterApp;
