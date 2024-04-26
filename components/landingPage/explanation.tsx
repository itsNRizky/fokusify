import Image from "next/image";
import React from "react";
import { Card, CardContent } from "../ui/card";

type Props = {};

const ExplanationImage = (props: Props) => {
  return (
    <section className="flex flex-col items-center px-6">
      <Card className="w-ful">
        <CardContent>
          <Image
            src="/images/explanation.png"
            alt="explanation"
            width={1280}
            height={720}
          />
        </CardContent>
      </Card>
    </section>
  );
};

export default ExplanationImage;
