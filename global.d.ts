import { create } from "twrnc";

declare global {
  var tw: ReturnType<typeof create>;
}

export {};
