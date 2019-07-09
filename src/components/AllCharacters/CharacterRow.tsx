import * as React from 'react';
import { Link } from 'react-router-dom';
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

  render() {
    const { id, name } = this.props.character;
    return (
      <tr>
        <td>
          <Link to={`/characters/${id}`}>{name}</Link>
        </td>
        <td />
      </tr>
    );
  }
}
