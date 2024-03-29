import LoginForm from "@/components/blocks/loginForm";
import React from "react";

type Props = {};

const LoginPage = (props: Props) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <LoginForm />
    </main>
  );
};

export default LoginPage;
