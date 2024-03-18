import { type DefaultSession } from "next-auth";
type ExtendedUser = DefaultSession["user"] & {
  subscription: "free" | "pro";
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
