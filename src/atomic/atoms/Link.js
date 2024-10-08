import React from 'react';
import PropTypes from 'prop-types';
import Text from '../ions/Text';
import BazzTheme, { withBazz } from '../../theme';

function Link({
    children,
    onPress,
    theme,
    ...rest
  }) {
    return (
    <Text
        color={theme.COLORS.PRIMARY}
        onPress={() => onPress()}
        {...rest}>
        {children}
    </Text>
    );
  }

  Link.defaultProps = {
    children: null,
    theme: BazzTheme,
  };

  Link.propTypes = {
    children: PropTypes.any,
    theme: PropTypes.any,
    onPress: PropTypes.func.isRequired,
  };

export default withBazz(Link);