import * as React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

import { Table, Button } from 'reactstrap';
import { CharacterRow } from './CharacterRow';

import { StoreContext } from 'store/StoreContext';

import CSS from './AllCharacters.module.scss';

@observer
export class AllCharacters extends React.Component {
  static contextType = StoreContext;
  context!: React.ContextType<typeof StoreContext>;

  render() {
    const store = this.context;
    return (
      <>
        <Link to="/new_character">
          <Button tag="span" className={CSS.new}>
            New Character
          </Button>
        </Link>
        <Table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {store.data.characters.map(character => (
              <CharacterRow key={character.id} character={character} />
            ))}
          </tbody>
        </Table>
      </>
    );
  }
}
