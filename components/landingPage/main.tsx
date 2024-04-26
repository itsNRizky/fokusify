import React, { FC } from "react";
import Hero from "./hero";
import Explanation from "./explanation";
import AllInOne from "./allInOne";
import Customizable from "./customizable";
import Progress from "./progress";
import MobileFriendly from "./mobileFriendly";
import Cta from "./cta";

type Props = {
  className: string;
};

const Main: FC<Props> = ({ className }) => {
  return (
    <main className={`${className} space-y-40`}>
      <Hero />
      <Explanation />
      <AllInOne />
      <MobileFriendly />
      <Customizable />
      <Progress />
      <Cta />
    </main>
  );
};

export default Main;
