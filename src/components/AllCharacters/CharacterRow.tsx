import * as React from 'react';
import { observer, inject } from 'mobx-react';

import { IStore } from '@/store';
import { ICharacter } from '@/store/character';

interface ICharacterRowProps {
  character: ICharacter;
  store?: IStore;
}

@inject('store')
@observer
export class CharacterRow extends React.Component<ICharacterRowProps> {
  openCharacter = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const { character, store } = this.props;
    store!.ui.setCurrentCharacter(character);
  };

  render() {
    const { name } = this.props.character;
    return (
      <tr>
        <td>
          <a href="#" onClick={this.openCharacter}>
            {name}
          </a>
        </td>
        <td />
      </tr>
    );
  }
}
