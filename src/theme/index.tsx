import React, { createContext, ReactNode, useContext, useMemo, ComponentType } from 'react';
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

const DEFAULT_THEME: BazzTheme = {
    COLORS: BAZZ_COLORS,
    SIZES: BAZZ_SIZES,
}

const BazzContext = createContext<BazzTheme>(DEFAULT_THEME);

export function useBazzTheme(): BazzTheme {
    const theme = useContext(BazzContext);
    if (!theme) {
        throw new Error('useBazzTheme must be used within a BazzProvider');
    }
    return theme;
}

export function BazzProvider({ theme = {}, children} : BazzProviderProps): JSX.Element {
    const providerTheme = useMemo<BazzTheme>(()=> ({
        COLORS: { ...DEFAULT_THEME.COLORS, ...theme?.COLORS},
        SIZES: { ...DEFAULT_THEME.SIZES, ...theme?.SIZES},
        ...theme?.customTheme,
    }), [theme]);

    return (
        <BazzContext.Provider value={providerTheme}>
            {children}
        </BazzContext.Provider>
    )
}

export function useBazzStyles<T>(styles?: (theme: BazzTheme) => T): T | undefined {
    const theme = useBazzTheme();
    return styles ? styles(theme) : undefined;
}

type NamedStyles = ViewStyle | TextStyle | ImageStyle;

export function withBazz<T extends ComponentType<any>>(
    Component: T,
    styles: NamedStyles
): ComponentType<any> {
    return Component;
}

export default DEFAULT_THEME;