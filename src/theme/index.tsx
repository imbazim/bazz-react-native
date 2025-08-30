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

const BazzContext = createContext<BazzTheme | null>(null);

export function useBazzTheme(): BazzTheme {
    const theme = useContext(BazzContext);
    if (!theme) {
        console.warn('useBazzTheme: No BazzProvider found, using default theme');
        return DEFAULT_THEME;
    }
    return theme;
}

export function BazzProvider({ theme = {}, children }: BazzProviderProps): JSX.Element {
    const providerTheme = useMemo<BazzTheme>(() => {
        try {
            return {
                COLORS: { ...DEFAULT_THEME.COLORS, ...theme?.COLORS },
                SIZES: { ...DEFAULT_THEME.SIZES, ...theme?.SIZES },
                ...theme?.customTheme,
            };
        } catch (error) {
            console.warn('BazzProvider: Error merging themes, falling back to default', error);
            return DEFAULT_THEME;
        }
    }, [theme]);

    return (
        <BazzContext.Provider value={providerTheme}>
            {children}
        </BazzContext.Provider>
    );
}

export function useBazzStyles<T>(styleFactory?: (theme: BazzTheme) => T): T | undefined {
    const theme = useBazzTheme();
    return useMemo(() => {
        return styleFactory ? styleFactory(theme) : undefined;
    }, [styleFactory, theme]);
}

type NamedStyles = ViewStyle | TextStyle | ImageStyle;

export function withBazz<T extends ComponentType<any>>(
    Component: T,
    styleFactory?: (theme: BazzTheme) => Record<string, NamedStyles>
): T {
    if (!styleFactory) {
        return Component;
    }
    
    const WrappedComponent = (props: any) => {
        const theme = useBazzTheme();
        const styles = useMemo(
            () => styleFactory(theme),
            [theme]
        );
        
        return <Component {...props} styles={styles} />;
    };
    
    WrappedComponent.displayName = `withBazz(${Component.displayName || Component.name})`;
    return WrappedComponent as T;
}

export default DEFAULT_THEME;