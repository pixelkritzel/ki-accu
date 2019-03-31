import * as React from 'react';

import uuid4 from 'uuid/v4'

import { Label, FormGroup, Input, InputProps } from 'reactstrap';

interface IFormFieldProps extends InputProps {
  labelText: React.ReactNode | string;
  type?: InputProps['type'];
  handleChange?: (name: string, value: string) => void
}

export class FormField extends React.Component<IFormFieldProps> {

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { handleChange, name = '', onChange: onChangeFromProps } = this.props;
    handleChange && handleChange(name, event.target.value);
    onChangeFromProps && onChangeFromProps(event)
  }

  id = uuid4();
  render() {
    const { id: idFromProps, handleChange, labelText: labelText, ...passedProps
    } = this.props
    const id = idFromProps || this.id;
    return (
      <FormGroup>
        <Label htmlFor={id}>{labelText}</Label>
        <Input onChange={this.onChange} id={id} {...passedProps} />
      </FormGroup>
    )
  }
}
