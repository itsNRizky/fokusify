import React from "react";
import { Button } from "../ui/button";
import PwaInstall from "./pwaInstall";

type Props = {};

const Hero = (props: Props) => {
  return (
    <section className="mt-32 flex flex-col space-y-6 px-6 md:mx-auto">
      <h1 className="w-4/5 text-5xl font-bold sm:mx-auto sm:text-center md:w-3/4 md:text-6xl xl:text-7xl">
        Bring your <span className="underline">personalized</span> fokus board
        wherever you are
      </h1>
      <p className="m-auto sm:text-center sm:text-lg md:w-4/5">
        Fokusify is a productivity app that helps you stay focused on your
        tasks. Not the board. Personalized your board with your daily tasks.
      </p>
      <div className="m-auto space-x-5">
        <PwaInstall />
        <a className="m-auto" href="/register">
          <Button variant={"secondary"}>Try now on browser</Button>
        </a>
      </div>
    </section>
  );
};

export default Hero;
