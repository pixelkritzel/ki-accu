import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Input extends Component {
  onChange = event => {
    const { name, value } = event.target;
    this.props.onChange(name, value);
  };

  render() {
    const { label, name, placeholder, type, value } = this.props;
    return (
      <div className="field">
        <label className="label">{label}</label>
        <div className="control">
          <input
            className="input"
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}
