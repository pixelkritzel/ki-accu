import * as React from 'react';
import { inject, observer } from 'mobx-react';

import { Form, Row, Col } from 'reactstrap';

import { FormField } from '@/components/FormField';
import { IncrementDecrement } from '@/components/IncrementDecrement';

import { characterModel, ICharacter } from '@/store/character';
import { IStore } from '@/store';

interface ISubmit {
  submitFn: () => void;
  submitButtonText: string;
}

interface ICharacterFormProps {
  store?: IStore;
  submit: ISubmit;
}

@inject('store')
@observer
export class CharacterForm extends React.Component<ICharacterFormProps> {
  character: ICharacter;

  constructor(props: any) {
    super(props);
    const { store } = this.props;
    this.character = store!.ui.newCharacter! || store!.ui.currentCharacter!;
  }

  submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.submit.submitFn();
  };

  render() {
    const { character } = this;
    const { submitButtonText } = this.props.submit;
    const { agility, constitution, dexterity, strength, power, willpower } = character.characteristics;
    return (
      <Form onSubmit={this.submitForm}>
        <FormField labelText="Name" value={character.name} handleChange={(_, name) => character.changeName(name)} />
        <Row>
          <Col>
            <IncrementDecrement
              labelText="Agility Basepoints"
              name="agility-basepoints"
              value={agility.basePoints.toString()}
              handleChange={(_, points) => agility.changeBasepoints(Number(points))}
            />
          </Col>
          <Col>
            <IncrementDecrement
              labelText="Agility Accumulation"
              name="agility-accumulation"
              value={agility.accumulation.toString()}
              handleChange={(_, points) => agility.changeAccumulation(Number(points))}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <IncrementDecrement
              labelText="constitution Baespoints"
              name="constitution-basepoints"
              value={constitution.basePoints.toString()}
              handleChange={(_, points) => constitution.changeBasepoints(Number(points))}
            />
          </Col>
          <Col>
            <IncrementDecrement
              labelText="constitution Accumulation"
              name="constitution-accumulation"
              value={constitution.accumulation.toString()}
              handleChange={(_, points) => constitution.changeAccumulation(Number(points))}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <IncrementDecrement
              labelText="dexterity Basepoints"
              name="dexterity-basepoints"
              value={dexterity.basePoints.toString()}
              handleChange={(_, points) => dexterity.changeBasepoints(Number(points))}
            />
          </Col>
          <Col>
            <IncrementDecrement
              labelText="dexterity Accumulation"
              name="dexterity-accumulation"
              value={dexterity.accumulation.toString()}
              handleChange={(_, points) => dexterity.changeAccumulation(Number(points))}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <IncrementDecrement
              labelText="strength Basepoints"
              name="strength-basepoints"
              value={strength.basePoints.toString()}
              handleChange={(_, points) => strength.changeBasepoints(Number(points))}
            />
          </Col>
          <Col>
            <IncrementDecrement
              labelText="strength Accumulation"
              name="strength-accumulation"
              value={strength.accumulation.toString()}
              handleChange={(_, points) => strength.changeAccumulation(Number(points))}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <IncrementDecrement
              labelText="power Basepoints"
              name="power-basepoints"
              value={power.basePoints.toString()}
              handleChange={(_, points) => power.changeBasepoints(Number(points))}
            />
          </Col>
          <Col>
            <IncrementDecrement
              labelText="power Accumulation"
              name="power-accumulation"
              value={power.accumulation.toString()}
              handleChange={(_, points) => power.changeAccumulation(Number(points))}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <IncrementDecrement
              labelText="willpower Basepoints"
              name="willpower-basepoints"
              value={willpower.basePoints.toString()}
              handleChange={(_, points) => willpower.changeBasepoints(Number(points))}
            />
          </Col>
          <Col>
            <IncrementDecrement
              labelText="willpower Accumulation"
              name="willpower-accumulation"
              value={willpower.accumulation.toString()}
              handleChange={(_, points) => willpower.changeAccumulation(Number(points))}
            />
          </Col>
        </Row>

        <button type="submit">{submitButtonText}</button>
      </Form>
    );
  }
}
