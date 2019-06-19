import * as React from 'react';
import { observer } from 'mobx-react';

import { Button, Input } from 'reactstrap';

import { StoreContext } from '@/store/StoreContext';

import CSS from './CharacterHeader.module.scss';

@observer
export class CharacterHeader extends React.Component {
  static contextType = StoreContext;
  context!: React.ContextType<typeof StoreContext>;

  render() {
    const { currentCharacter, setCurrentCharacter } = this.context.ui;
    const { characters } = this.context.data;
    return (
      <div className={CSS.header}>
        <Button className={CSS.backButton} onClick={() => setCurrentCharacter(undefined)}>
          All Characters
        </Button>
        <Input
          type="select"
          className={CSS.characterSelect}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const selectedCharacter = characters.find(char => char.id === event.target.value);
            setCurrentCharacter(selectedCharacter);
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
