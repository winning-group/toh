import { Superpower } from "./superpower";

export class Hero {
  id: number;
  name: string;
  nemesis?: number;
  superpowers: Superpower[];
}
