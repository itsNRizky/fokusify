import Image from "next/image";
import React from "react";
import { Card, CardContent } from "../ui/card";

type Props = {};

const Customizable = (props: Props) => {
  return (
    <section className="flex flex-col items-center px-6">
      <div className="mx-auto mb-5 flex flex-col space-y-4 text-center sm:w-4/5 xl:w-3/5">
        <h2 className="text-4xl font-bold md:text-5xl ">
          Match it to your liking, just like your focus board
        </h2>
        <p className="text-lg">
          You can change the background, choose dark or light theme, and even
          set your board with your favourite background music on youtube
        </p>
      </div>
      <Card className="">
        <CardContent>
          <Image
            src="/images/custom-theme.png"
            alt="explanation"
            width={1280}
            height={720}
          />
        </CardContent>
      </Card>
    </section>
  );
};

export default Customizable;
