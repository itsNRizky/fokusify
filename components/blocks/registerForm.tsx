"use client";
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { useForm } from "react-hook-form";
import { registerFormSchema } from "@/schemas";
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
import { register } from "@/actions/register";

type Props = {};

const RegisterForm = (props: Props) => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const submitHandler = async (data: z.infer<typeof registerFormSchema>) => {
    const res = await register(data);
    if (res.success) {
      setSuccess(res.success);
      form.reset();
    } else {
      setError(res.error!);
      form.reset();
    }
  };

  return (
    <Card className="w-96">
      <CardHeader className="text-center">
        <h1 className="text-2xl font-bold">Register Fokusify Account</h1>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitHandler)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <Button className="w-full">Register</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <span className="text-sm">Already have an account?</span>
        <Link href="/login">
          <Button className="p-0" variant={"link"}>
            Login Page
          </Button>
        </Link>
      </CardFooter>
      <div className="-mt-4 mb-2 w-full text-center text-sm">or</div>
      <CardFooter>
        <Button className="flex w-full items-center gap-2" variant={"outline"}>
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

export default RegisterForm;
