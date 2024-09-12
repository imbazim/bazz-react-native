import React from 'react';
import PropTypes from 'prop-types';

// import COLORS & SIZES
import GALIO_COLORS from './colors';
import GALIO_SIZES from './sizes';

// default theme with COLORS & SIZES
const BazzTheme = {
  COLORS: GALIO_COLORS,
  SIZES: GALIO_SIZES,
};

export default BazzTheme;

// creating the BazzTheme context
const BazzContext = React.createContext();

export function useBazzTheme() {
  const theme = React.useContext(BazzContext);

  if (theme === undefined) {
    throw new Error(
      'useBazzTheme must be used within a component wrapped with BazzProvider'
    );
  }

  return theme;
}

export function withBazz(Component, styles) {
  // eslint-disable-next-line react/no-multi-comp
  class EnhancedComponent extends React.Component {
    render() {
      const { forwardedRef, ...rest } = this.props;
      return (
        <BazzContext.Consumer>
          {theme => (
            <Component
              ref={forwardedRef}
              {...rest}
              theme={{ ...BazzTheme, ...theme }}
              styles={styles && styles({ ...BazzTheme, ...theme })}
            />
          )}
        </BazzContext.Consumer>
      );
    }
  }

  return React.forwardRef((props, ref) => {
    return <EnhancedComponent forwardedRef={ref} {...props} />;
  });
}

// eslint-disable-next-line react/no-multi-comp
export class BazzProvider extends React.Component {
  static defaultProps = {
    children: null,
    theme: {},
  };

  render() {
    const { theme, children } = this.props;
    const { COLORS: CUSTOM_COLORS, SIZES: CUSTOM_SIZES, customTheme } = theme;

    const providerTheme = {
      COLORS: { ...BazzTheme.COLORS, ...CUSTOM_COLORS },
      SIZES: { ...BazzTheme.SIZES, ...CUSTOM_SIZES },
      ...customTheme,
    };

    return <BazzContext.Provider value={providerTheme}>{children}</BazzContext.Provider>;
  }
}

BazzProvider.propTypes = {
  children: PropTypes.any,
  theme: PropTypes.any,
};