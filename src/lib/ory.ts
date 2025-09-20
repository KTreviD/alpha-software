import { Configuration, IdentityApi } from "@ory/client";

const basePath =
  process.env.NEXT_PUBLIC_ORY_URL ||
  "https://epic-khorana-b08b6z8lit.projects.oryapis.com";

export const ory = new IdentityApi(
  new Configuration({
    basePath,
    baseOptions: {
      withCredentials: true,
    },
  })
);
