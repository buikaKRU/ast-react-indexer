
/** This is some comment about Props
 * which should be read by AST reader
 */
interface Props {
  dsGhost?: boolean;
  /** Variant of Component */
  dsVariant: 'standard' | 'primary';
  dsColor: string
  /** This method gets invoked after every click event */
  dsOnClick: (event: MouseEvent) => void
  /** Initial Value*/
  dsValue: number;
}