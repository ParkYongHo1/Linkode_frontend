import { getCurrentUser } from "@/entities/session";

import { AccountMenu } from "./account-menu";
import { GuestActions } from "./guest-actions";

export async function HeaderActions() {
  const user = await getCurrentUser();

  if (!user) {
    return <GuestActions />;
  }

  const initial = user.email?.[0]?.toUpperCase();

  return (
    <AccountMenu
      label={user.isAnonymous ? "체험 계정" : user.email}
      initial={initial}
    />
  );
}
