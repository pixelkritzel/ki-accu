import * as React from 'react';
import { inject, observer } from 'mobx-react';

import { IStore } from '@/store';
import { Table, Button } from 'reactstrap';
import { CharacterRow } from './CharacterRow';

import CSS from './AllCharacters.module.scss';

@inject('store')
@observer
export class AllCharacters extends React.Component<{ store?: IStore }> {
  render() {
    const store = this.props.store!;
    return (
      <>
        <Button className={CSS.new} onClick={store.newCharacter}>
          New Character
        </Button>
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
