import * as React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

import { Button, Input } from 'reactstrap';

import { Actions } from './Actions';
import { BackButton } from './BackButton';
import { Characteristics } from './Characteristics';
import { Fatigue } from './Fatigue';

import { StoreContext } from 'store/StoreContext';

import CSS from './Character.module.scss';

import { RouteComponentProps } from 'react-router';

type ICharacterProps = RouteComponentProps<{ characterId: string }>;

@observer
export class Character extends React.Component<ICharacterProps> {
  static contextType = StoreContext;
  context!: React.ContextType<typeof StoreContext>;

  render() {
    const { characters } = this.context.data;
    const { history, match } = this.props;
    const { characterId } = match.params;
    const currentCharacter = characters.find(char => char.id === characterId);
    const { name, fatigue } = currentCharacter!;
    return (
      <>
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
        <div className={CSS.title}>
          <h3>{name}</h3>
          <Link to={`/characters/${characterId}/edit`}>
            <Button>Edit</Button>
          </Link>
        </div>
        <Actions character={currentCharacter!} />
        <Characteristics character={currentCharacter!} />
        <div className={CSS.additionalActions} />
        <Fatigue fatigue={fatigue} />
      </>
    );
  }
}
