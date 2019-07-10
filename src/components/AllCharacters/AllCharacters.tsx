import * as React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

import { Table, Button } from 'reactstrap';
import { CharacterRow } from './CharacterRow';

import { StoreContext } from 'store/StoreContext';

import CSS from './AllCharacters.module.scss';
import { getSnapshot } from 'mobx-state-tree';

import fileDownload from 'js-file-download';

@observer
export class AllCharacters extends React.Component {
  static contextType = StoreContext;
  context!: React.ContextType<typeof StoreContext>;

  export = () => {
    const storeSnapShot = getSnapshot(this.context.data);
    fileDownload(JSON.stringify(storeSnapShot, undefined, 2), 'ki.json');
  };

  import = (event: React.ChangeEvent<HTMLInputElement>) => {
    const store = this.context;
    const { target } = event;
    const files = target.files; // FileList object
    if (files) {
      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result === 'string') {
          try {
            const dataSnapshot = JSON.parse(reader.result);
            store.loadData(dataSnapshot);
          } catch (e) {
            console.log(e);
            alert('This file was not valid. :-/');
          }
        }
        target.value = '';
      };
      try {
        reader.readAsText(files[0]);
      } catch (e) {
        console.log(e);
      }
    }
  };

  render() {
    const store = this.context;
    return (
      <>
        <div className={CSS.buttons}>
          <Link to="/new_character">
            <Button tag="span">New Character</Button>
          </Link>
          <Button tag="label" className={CSS.import}>
            Load
            <input className={CSS.visuallyHidden} type="file" onChange={this.import} />
          </Button>
          <Button onClick={this.export}>Export</Button>
        </div>
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
