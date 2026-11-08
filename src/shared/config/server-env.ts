import "server-only";

import { requireEnv } from "./require-env";

export const DEMO_EMAIL = requireEnv(process.env.DEMO_EMAIL, "DEMO_EMAIL");

export const DEMO_PASSWORD = requireEnv(process.env.DEMO_PASSWORD, "DEMO_PASSWORD");
