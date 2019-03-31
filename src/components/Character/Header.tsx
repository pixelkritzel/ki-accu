import * as React from 'react';
import { inject, observer } from 'mobx-react';

import { Button, Input } from 'reactstrap';

import { IStore } from '@/store';

import CSS from './CharacterHeader.module.scss';

@inject('store')
@observer
export class CharacterHeader extends React.Component<{ store?: IStore }> {
  render() {
    const store = this.props.store!;
    const { currentCharacter, setCurrentCharacter } = store.ui;
    const { characters } = store.data;
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
            <option selected={char === currentCharacter} value={char.id}>
              {char.name}
            </option>
          ))}
        </Input>
      </div>
    );
  }
}
