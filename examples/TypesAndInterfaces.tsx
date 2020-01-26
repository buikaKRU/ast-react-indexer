import './ExNumber.scss';
import 'react';

export type TypeExportTest = {
  name: string;
  id: number;
  value: string;
};

export interface InterfaceExportTest {
  name: string;
  onClick: (value: number) => string;
}
