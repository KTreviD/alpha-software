import { Configuration, IdentityApi } from "@ory/client";

const basePath = process.env.NEXT_PUBLIC_ORY_SDK_URL;

export const ory = new IdentityApi(
  new Configuration({
    basePath,
    baseOptions: {
      withCredentials: true,
    },
  })
);
