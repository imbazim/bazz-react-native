import { ReactNode, ComponentType } from 'react';
import type { JSX } from 'react';
import { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import BAZZ_COLORS from './colors';
import BAZZ_SIZES from './sizes';
export interface BazzTheme {
    COLORS: typeof BAZZ_COLORS;
    SIZES: typeof BAZZ_SIZES;
    [key: string]: any;
}
export interface BazzProviderProps {
    children: ReactNode;
    theme?: {
        COLORS?: Partial<typeof BAZZ_COLORS>;
        SIZES?: Partial<typeof BAZZ_SIZES>;
        customTheme?: Record<string, any>;
    };
}
declare const DEFAULT_THEME: BazzTheme;
export declare function useBazzTheme(): BazzTheme;
export declare function BazzProvider({ theme, children }: BazzProviderProps): JSX.Element;
export declare function useBazzStyles<T>(styles?: (theme: BazzTheme) => T): T | undefined;
type NamedStyles = ViewStyle | TextStyle | ImageStyle;
export declare function withBazz<T extends ComponentType<any>>(Component: T, styles: NamedStyles): ComponentType<any>;
export default DEFAULT_THEME;
//# sourceMappingURL=index.d.ts.map