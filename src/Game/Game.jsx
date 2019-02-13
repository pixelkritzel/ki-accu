import React from 'react';

import { StoreContext } from 'Store';

export default class Game extends React.Component {
  static contextType = StoreContext;

  render() {
    const { accumulate, recover, reset, spend } = this.context.actions;
    const { character } = this.context.values;

    return (
      <div>
        <em>{character.name}</em>
        <table className="table">
          <thead>
            <tr>
              <th>Characteristic</th>
              <th>Pool</th>
              <th>Accumlated</th>
            </tr>
          </thead>
          <tbody>
            {character.characteristics.map((c, index) => (
              <tr key={index}>
                <td>{c.name}</td>
                <td>
                  {c.pool - c.accumulated - c.spendKiPoints} / {c.pool}
                </td>
                <td>
                  {c.accumulated}{' '}
                  <button className="button" onClick={() => spend(c.name)}>
                    spend
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="button" onClick={accumulate}>
          Full
        </button>
        <button className="button" onClick={() => accumulate(false)}>
          Half
        </button>
        <button className="button" onClick={recover}>
          Recover
        </button>
        <button className="button" onClick={reset}>
          Reset
        </button>
      </div>
    );
  }
}
