import { Input } from ".";
import { defaultHeaders, handleResolve, host } from "..";

export const path = () => host(`/login`);

export async function postLogin(
  input: Input,
): Promise<{ redirectUrl: string }> {
  const body = JSON.stringify(input);
  return fetch(path(), {
    method: "POST",
    body,
    headers: defaultHeaders,
  }).then(handleResolve);
}
