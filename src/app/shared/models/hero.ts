import { Superpower } from "./superpower";

export class Hero {
  id: number;
  name: string;
  type?: string;
  nemesis?: number;
  superpowers?: Superpower[];
}
