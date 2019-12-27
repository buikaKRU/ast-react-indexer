import * as React from 'react';

/** Default Props to read */
interface Props {
  count?: number;
}

export default class Count extends React.Component<Props> {
  static defaultProps: Props = {
    count: 10
  };

  render () {
    return <h1>{this.props.count}</h1>;
  }
}