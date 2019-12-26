import * as ts from 'typescript';

export const simpleTransformer = (): string => {
  const source = `
const x: string  = 'string90'
interface testingInterface  {
  test01: string
  test02: boolean
}`;

  let result = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS }
  });

  console.log(JSON.stringify(result.outputText));
  return 'test'
};

interface testingInterface {
  test01: string;
  test02: boolean;
}

export class test implements testingInterface {
  public test01 = "abc"
  public test02 = true
}
