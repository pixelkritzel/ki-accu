import * as React from 'react';
import { observer } from 'mobx-react';

import { IFatigue } from '@/store/fatigue';
import { Button, Table } from 'reactstrap';

@observer
export class Fatigue extends React.Component<{ fatigue: IFatigue }> {
  render() {
    const { availablePoints, basePoints, pay, recover, spend } = this.props.fatigue;
    return (
      <>
        <h3>Fatigue</h3>
        <Table size="sm">
          <thead>
            <tr>
              <td>Available</td>
              <td />
              <td>Spend</td>
              <td />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {availablePoints} / {basePoints}
              </td>
              <td>
                <Button className="btn-sm" onClick={() => pay()}>
                  ⇒ 1
                </Button>
              </td>
              <td>{spend}</td>
              <td>
                <Button className="btn-sm" onClick={() => recover()}>
                  ⤺ 1
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </>
    );
  }
}
