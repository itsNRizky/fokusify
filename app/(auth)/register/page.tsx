import RegisterForm from "@/components/blocks/registerForm";
import React from "react";

type Props = {};

const RegisterPage = (props: Props) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <RegisterForm />
    </main>
  );
};

export default RegisterPage;
