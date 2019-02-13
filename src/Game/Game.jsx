import React, { Component } from 'react';

export default class Game extends React.Component {
  render() {
    const { characterFieldsWithValues } = this.props;
    return (
      <div>
        Game
        <table className="table">
          <thead>
            <th>Characteristic</th>
            <th>Pool</th>
            <th>Accumlated</th>
          </thead>
          <tbody>
            <tr>
              <td>{}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
