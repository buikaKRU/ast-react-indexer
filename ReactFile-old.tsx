import * as React from 'react';

/** Default Props to read */
interface Props {
  dsGhost?: boolean;
  /** Variant of Component */
  dsVariant: 'standard' | 'primary';
  dsColor: string;
  /** This method gets invoked after every click event */
  dsOnClick?: (event: MouseEvent) => void;
  /** Initial Value*/
  dsValue: number;
}

const ReactFile: React.FunctionComponent<Props> = props => {
  return <h1>{this.props.dsValue}</h1>;
};

ReactFile.defaultProps = {
  dsVariant: 'standard',
  dsColor: 'red',
  dsValue: 10
};

export default ReactFile;
