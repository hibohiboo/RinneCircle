import { addHours, format } from "date-fns";

export const utcToJst = (d: Date) => addHours(d, 9);
export const utcToJstWithResponseFormat = (s: string) =>
  format(utcToJst(new Date(s)), "yyyy-MM-dd HH:mm:ss");
