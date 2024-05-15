import { FC } from "react";
import Toolbar from "./toolbar";

type Props = {
  className?: string;
};

const FooterApp: FC<Props> = (props: Props) => {
  return (
    <footer className={props.className}>
      <nav>
        <ul className="flex items-center justify-center p-4">
          <li className="hidden w-1/3 justify-start sm:flex">
            <h6 className="text-xs">Fokusify ver 0.36</h6>
          </li>
          <li className="flex flex-1 justify-center">
            <Toolbar />
          </li>
          <li className="flex w-1/3 justify-end"></li>
        </ul>
      </nav>
    </footer>
  );
};

export default FooterApp;
