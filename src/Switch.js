import React from 'react';
import { Switch as Switcher } from 'react-native';
import PropTypes from 'prop-types';
import BazzTheme, { withBazz } from './theme';

function Switch({
  initialValue,
  onChange,
  color,
  disabled,
  trackColor,
  ios_backgroundColor,
  ...rest
}) {
  const [switchValue, setSwitchValue] = React.useState(initialValue);
  function onPressSwitch() {
    setSwitchValue(!switchValue);
    return null;
  }

  // trackColor.true = color === 'primary' ? BazzTheme.COLORS.PRIMARY : color;

  return (
    <Switcher
      disabled={disabled}
      trackColor={{ ...trackColor }}
      ios_backgroundColor={trackColor.false || ios_backgroundColor}
      value={switchValue}
      onValueChange={() => {
        onPressSwitch();
      }}
      onChange={() => onChange()}
      {...rest}
    />
  );
}

Switch.defaultProps = {
  color: BazzTheme.COLORS.PRIMARY,
  ios_backgroundColor: BazzTheme.COLORS.GREY,
  trackColor: {
    false: BazzTheme.COLORS.GREY,
    true: BazzTheme.COLORS.PRIMARY,
  },
  disabled: false,
  initialValue: false,
};

Switch.propTypes = {
  ...Switcher.propTypes,
  color: PropTypes.oneOfType([
    PropTypes.oneOf(['primary', 'theme', 'error', 'warning', 'success', 'info']),
    PropTypes.string,
  ]),
  disabled: PropTypes.bool,
  initialValue: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

export default withBazz(Switch);
