import ExSelect, {
  ExOption as ExSelectExOption,
  ExTest as ExSelectExTest,
  Props as ExSelectProps,
  olusia_podpowedz as ExSelectOlusia_podpowiedz
} from './ExSelect';

export namespace DS {
  namespace ExSelect {
    type ExOption = ExSelectExOption
    interface ExOptionInterface extends ExSelectExOption {}
    interface ExTest extends ExSelectExTest {}
    interface Props extends ExSelectProps {}
    type olusia_podpowedz = ExSelectOlusia_podpowiedz;
  }
}
