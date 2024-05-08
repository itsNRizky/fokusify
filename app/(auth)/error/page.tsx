import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";

type Props = {};

const ErrorPage = (props: Props) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Card className="w-96">
        <CardHeader className="text-center">
          <h1 className="text-2xl font-bold">Authenticate to Fokusify</h1>
        </CardHeader>
        <CardContent>
          <h2>Ops... something went wrong, please try again</h2>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/login">
            <Button className="p-0" variant={"link"}>
              Login Here
            </Button>
          </Link>
          <Link href="/register">
            <Button className="p-0" variant={"link"}>
              Regist Here
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
};

export default ErrorPage;
