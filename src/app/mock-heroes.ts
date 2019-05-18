import { Hero } from './models/hero';
import { Villain } from './models/villains';

export const HEROES: Hero[] = [
  { id: 11, name: 'Mr. Nice', nemesis: {} as Villain as Villain },
  { id: 12, name: 'Narco', nemesis: {} as Villain },
  { id: 13, name: 'Bombasto', nemesis: {} as Villain },
  { id: 14, name: 'Celeritas', nemesis: {} as Villain },
  { id: 15, name: 'Magneta', nemesis: {} as Villain },
  { id: 16, name: 'RubberMan', nemesis: {} as Villain },
  { id: 17, name: 'Dynama', nemesis: {} as Villain },
  { id: 18, name: 'Dr IQ', nemesis: {} as Villain },
  { id: 19, name: 'Magma', nemesis: {} as Villain },
  { id: 20, name: 'Tornado', nemesis: {} as Villain }
];

export const VILLAINS: Villain[] = [
  { id: 21, name: 'Dr. Doom' },
  { id: 22, name: 'Thanos' },
  { id: 23, name: 'Galactus' },
  { id: 24, name: 'Ultron' },
  { id: 25, name: 'Juggernaut' },
  { id: 26, name: 'Surtur' },
  { id: 27, name: 'Onslaught' },
  { id: 28, name: 'Apocalypse' },
  { id: 29, name: 'Kingpin' },
  { id: 30, name: 'Magneto' }
];