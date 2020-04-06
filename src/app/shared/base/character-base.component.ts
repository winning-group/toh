import { Villain, Hero } from 'shared/models';
import { Observable, Subject } from 'rxjs';
import { CharacterTypes } from '../enum/character-types';

export abstract class CharacterBaseComponent {
  character: Hero | Villain;
  id: number;
  type: string;

  protected unsubscriber$ = new Subject<boolean>();

  get characterName() {
    return (this.character) ? this.character.name : '';
  }

  get characterUrl() {
    return (this.type === CharacterTypes.HERO) ?
      `/heroes/${this.id}` :
      `/villains/${this.id}`;
  }

  get characterImage() {
    return (this.character) ? `assets/images/${this.character.name.toLowerCase()}.jpg` : '';
  }

  constructor() {}

  baseOnInit() {
    this.getCharacter().subscribe(character => {
      this.character = character;
    });
  }

  baseOnDestroy() {
    this.unsubscriber$.next(true);
    this.unsubscriber$.complete();
  }

  protected abstract getCharacter(): Observable<Hero | Villain>;

}
