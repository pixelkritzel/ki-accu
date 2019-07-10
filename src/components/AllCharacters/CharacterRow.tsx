import * as React from 'react';
import { Link } from 'react-router-dom';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import cx from 'classnames';

import { StoreContext, store } from 'store/StoreContext';
import { ICharacter } from 'store/character';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import CSS from './CharacterRow.module.scss';

interface ICharacterRowProps {
  character: ICharacter;
}

@observer
export class CharacterRow extends React.Component<ICharacterRowProps> {
  static contextType = StoreContext;
  context!: React.ContextType<typeof StoreContext>;

  @observable isAreYouSureShown = false;

  deleteCharacter = () => store.data.deleteCharacter(this.props.character);

  toggleAreYouSure = () => (this.isAreYouSureShown = !this.isAreYouSureShown);

  areYouSure = () => {
    return (
      <Modal isOpen={this.isAreYouSureShown} toggle={this.toggleAreYouSure}>
        <ModalHeader toggle={this.toggleAreYouSure}>DELETING CHARACTER: {this.props.character.name}</ModalHeader>
        <ModalBody>Are you sure?</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={this.deleteCharacter}>
            Yes!
          </Button>{' '}
          <Button color="success" onClick={this.toggleAreYouSure}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  };

  render() {
    const { character } = this.props;
    const { id, name } = character;
    return (
      <tr>
        <td>
          <Link to={`/characters/${id}`}>{name}</Link>
        </td>
        <td>
          <Link to={`/characters/${id}/edit`}>
            <Button className={cx('btn-sm', CSS.buttonSpacing)}>Edit</Button>
          </Link>
          <Button className={cx('btn-sm', 'btn-danger')} onClick={this.toggleAreYouSure}>
            Delete
          </Button>
          {this.areYouSure()}
        </td>
      </tr>
    );
  }
}
