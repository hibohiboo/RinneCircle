// import * as ApiMyProfile from "@/pages/api/my/profile";
import { defaultHeaders, handleResolve, host } from "..";

export const path = () => host(`/my/profile`);
type GetReturn = any;
export async function getMyProfile(): Promise<GetReturn> {
  return fetch(path(), {
    headers: defaultHeaders,
  }).then(handleResolve);
}
