import { format, parseISO } from "date-fns";

export function formatTime(isoString: string) {
  return format(parseISO(isoString), "p");
}
