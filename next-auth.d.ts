import { UserSubscription } from "@prisma/client";
import { type DefaultSession } from "next-auth";
type ExtendedUser = DefaultSession["user"] & {
  subscription: UserSubscription;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
