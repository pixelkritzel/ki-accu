import React from 'react';

import Input from 'Input';
import { StoreContext } from 'Store';

export default class CharacterForm extends React.Component {
  static contextType = StoreContext;

  render() {
    return (
      <div>
        <Input
          label="Character name"
          name="characterName"
          type="text"
          value={this.context.values.character.name}
          onChange={(name, value) => this.context.actions.set('character.name', value)}
        />

        {this.context.values.character.characteristics.map((c, index) => (
          <React.Fragment key={index}>
            <Input
              label={`${c.name} pool`}
              name={c.name}
              type="number"
              value={c.pool}
              onChange={(name, value) => this.context.actions.set(`character.characteristics[${index}].pool`, value)}
            />

            <Input
              label={`${c.name} accumulation`}
              name={c.name}
              type="number"
              value={c.accumulation}
              onChange={(name, value) =>
                this.context.actions.set(`character.characteristics[${index}].accumulation`, value)
              }
            />
          </React.Fragment>
        ))}
      </div>
    );
  }
}
