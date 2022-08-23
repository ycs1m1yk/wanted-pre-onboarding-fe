import 'styled-components';

declare module 'styled-components'{
    export interface DefaultTheme {
        palette: {
            borderGray: string,
            gray: string,
            black: string,
        },
    }
}