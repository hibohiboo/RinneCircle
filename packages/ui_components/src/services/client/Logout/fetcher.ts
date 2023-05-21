import { defaultHeaders, handleResolve, host } from "..";
import type { PostReturn } from "./types";

export const path = () => host(`/logout`);

export async function postLogout(): Promise<PostReturn> {
  return fetch(path(), {
    method: "POST",
    headers: defaultHeaders,
  }).then(handleResolve);
}
