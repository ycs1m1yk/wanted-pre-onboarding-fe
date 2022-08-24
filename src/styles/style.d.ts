import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    palette: {
      black: string;
      gray: string;
      borderGray: string;
      disabledGray: string;
      wetAsphalt: string;
      emerald: string;
      pomegranate: string;
      peterRiver: string;
    };
  }
}
