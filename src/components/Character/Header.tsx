import * as React from 'react';
import { observer } from 'mobx-react';

import { Input } from 'reactstrap';

import { StoreContext } from 'store/StoreContext';

import { ICharacter } from 'store/character';

import CSS from './CharacterHeader.module.scss';
import { History } from 'history';
import { BackButton } from './BackButton';

@observer
export class CharacterHeader extends React.Component<{ character: ICharacter; history: History }> {
  static contextType = StoreContext;
  context!: React.ContextType<typeof StoreContext>;

  render() {
    const { characters } = this.context.data;
    const { character: currentCharacter, history } = this.props;

    return (
      <div className={CSS.header}>
        <BackButton />
        <Input
          type="select"
          className={CSS.characterSelect}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const selectedCharacter = characters.find(char => char.id === event.target.value);
            history.push(`/characters/${selectedCharacter!.id}`);
          }}
        >
          {characters.map(char => (
            <option key={char.id} selected={char === currentCharacter} value={char.id}>
              {char.name}
            </option>
          ))}
        </Input>
      </div>
    );
  }
}
