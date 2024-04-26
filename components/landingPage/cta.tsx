import React from "react";
import { Button } from "../ui/button";
import Footer from "./footer";

type Props = {};

const Cta = (props: Props) => {
  return (
    <>
      <section className="bg-primary">
        <div className="mx-auto w-4/5 space-y-3 px-6 py-14 text-center text-primary-foreground">
          <h2 className="text-xl font-bold sm:text-3xl lg:text-5xl">
            Forget about those other time-consuming focus boards
          </h2>
          <p>Start using Fokusify today</p>
          <a className="block" href="/register">
            <Button variant={"secondary"} size={"lg"}>
              Try now for free
            </Button>
          </a>
        </div>
        <Footer />
      </section>
    </>
  );
};

export default Cta;
