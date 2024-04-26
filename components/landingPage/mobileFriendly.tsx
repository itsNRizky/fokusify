import Image from "next/image";
import React from "react";

type Props = {};

const MobileFriendly = (props: Props) => {
  return (
    <section className="mx-auto flex justify-end px-6 sm:w-4/5">
      <div className="hidden w-1/2 lg:block">
        {/* <Image src={'explanation-mobile.png'} alt="Mobile Friendly" width={} /> */}
      </div>
      <div className="space-y-4 text-right md:w-4/5 lg:w-1/2">
        <h2 className="text-4xl font-bold md:text-5xl">
          Mobile friendly. Track it from your phone
        </h2>
        <p className="text-xl">
          Mobile friendly designed to bring your productive day everywhere. Same
          as on the desktop, but compact
        </p>
      </div>
    </section>
  );
};

export default MobileFriendly;
