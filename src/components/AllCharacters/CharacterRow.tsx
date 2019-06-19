import * as React from 'react';
import { observer } from 'mobx-react';

import { StoreContext } from '@/store/StoreContext';
import { ICharacter } from '@/store/character';

interface ICharacterRowProps {
  character: ICharacter;
}

@observer
export class CharacterRow extends React.Component<ICharacterRowProps> {
  static contextType = StoreContext;
  context!: React.ContextType<typeof StoreContext>;

  openCharacter = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const store = this.context;
    const { character } = this.props;
    store.ui.setCurrentCharacter(character);
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
