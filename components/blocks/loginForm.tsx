"use client";
import React, { useState, useTransition } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { useForm } from "react-hook-form";
import { loginFormSchema } from "@/schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa6";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { login, loginGoogle } from "@/actions/login";

type Props = {};

const LoginForm = (props: Props) => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submitHandler = async (data: z.infer<typeof loginFormSchema>) => {
    startTransition(async () => {
      const res = await login(data);
      if (res.success) {
        setSuccess(res.success);
      } else {
        setError(res.error!);
      }
    });
  };

  const loginGoogleHandler = async () => {
    await loginGoogle();
  };

  return (
    <Card className="w-96">
      <CardHeader className="text-center">
        <h1 className="text-2xl font-bold">Login to Fokusify</h1>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitHandler)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoginError error={error} />
            <LoginSuccess success={success} />
            <Button disabled={isPending} className="w-full">
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <span className="text-sm">Don&apos;t have an account?</span>
        <Link href="/register">
          <Button className="p-0" variant={"link"}>
            Regist Here
          </Button>
        </Link>
      </CardFooter>
      <div className="-mt-4 mb-2 w-full text-center text-sm">or</div>
      <CardFooter>
        <Button
          onClick={loginGoogleHandler}
          className="flex w-full items-center gap-2"
          variant={"outline"}
        >
          <FaGoogle />
          Login with Google
        </Button>
      </CardFooter>
    </Card>
  );
};

const LoginError = ({ error }: { error?: string }) => {
  if (error) {
    return (
      <div className="flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
        <FaExclamationTriangle className="h-4 w-5" />
        <p>{error}</p>
      </div>
    );
  }
};

const LoginSuccess = ({ success }: { success?: string }) => {
  if (success) {
    return (
      <div className="flex items-center gap-x-2 rounded-md bg-emerald-500/15 p-3 text-sm text-emerald-500">
        <FaCheckCircle className="h-4 w-5" />
        <p>{success}</p>
      </div>
    );
  }
};

export default LoginForm;
