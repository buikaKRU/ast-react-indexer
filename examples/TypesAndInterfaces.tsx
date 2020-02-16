export type TypeExportTest = {
  name: string;
  id: number;
  value: string;
};

export interface InterfaceExportTest {
  id: number;
  name: string;
  onClick: (value: number) => TypeExportTest;
}
