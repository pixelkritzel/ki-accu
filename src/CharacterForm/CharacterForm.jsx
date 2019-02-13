import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Input from 'Input';
import { StoreContext } from 'Store';

export default class CharacterForm extends Component {
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
          <>
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
          </>
        ))}
      </div>
    );
  }
}
