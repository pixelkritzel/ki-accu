import * as React from 'react';
import { InputGroup, InputGroupText, InputGroupAddon, Input, Label, InputProps, FormGroup } from 'reactstrap';
import uuid4 from 'uuid/v4';

interface IIncrementDecrementProps extends InputProps {
  labelText: React.ReactNode | string;
  handleChange?: (name: string, value: number) => void;
}

export class IncrementDecrement extends React.Component<IIncrementDecrementProps> {
  id = uuid4();

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { handleChange, name = '' } = this.props;
    handleChange && handleChange(name, Number(event.target.value));
  }

  decrement = () => {
    const { handleChange, name = '', value } = this.props;
    handleChange && handleChange(name, Number(value) - 1);
  }

  increment = () => {
    const { handleChange, name = '', value } = this.props;
    handleChange && handleChange(name, Number(value) + 1);
  }

  render() {
    const { id: idFromProps, handleChange, labelText: labelText, ...passedProps } = this.props;
    const id = idFromProps || this.id;
    return (
      <FormGroup>
        <Label htmlFor={id}>{labelText}</Label>
        <InputGroup>
          <InputGroupAddon tabIndex={1} onClick={this.decrement} addonType="prepend">
            <InputGroupText>-</InputGroupText>
          </InputGroupAddon>
          <Input onChange={this.onChange} id={id} {...passedProps} />
          <InputGroupAddon tabIndex={1} onClick={this.increment} addonType="append">
            <InputGroupText>+</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </FormGroup>
    );
  }
}
