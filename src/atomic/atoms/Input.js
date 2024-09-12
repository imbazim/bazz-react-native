import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Icon from '../ions/Icon';
import GalioTheme, { withGalio } from '../../theme';

function Input({
  style = null,
  textInputStyle = null,
  type = 'default',
  placeholderTextColor = null,
  label = null,
  labelStyles = null,
  color = null,
  help = null,
  helpStyles = null,
  bgColor = null,
  borderless = false,
  viewPass = false,
  rounded = false,
  icon = null,
  family = null,
  left = true,
  right = false,
  iconColor = null,
  topHelp = true,
  bottomHelp = false,
  theme = GalioTheme,
  styles = {},
  iconSize = null,
  iconContent = null,
  password = false,
  onRef = null,
  error = false,
  ...rest
}) {
  const [isPassword, setIsPassword] = React.useState(false);
  React.useEffect(() => {
    setIsPassword(password);
  }, []);

  const inputViewStyles = [
    styles.inputStyle,
    styles.inputContainer,
    bgColor && { backgroundColor: bgColor },
    rounded && styles.rounded,
    borderless && styles.borderless,
    error && { borderColor: theme.COLORS.DANGER },
    style,
  ];

  const inputStyles = [
    styles.inputView,
    borderless && icon && styles.inputIcon,
    styles.inputText,
    color && { color },
    textInputStyle || {},
  ];

  const iconInstance = icon ? (
    <Icon
      name={icon}
      family={family}
      size={iconSize || theme.SIZES.BASE * 1.0625}
      style={{ marginRight: left && !right ? 4 : 0 }}
      color={(error && theme.COLORS.DANGER) || iconColor || placeholderTextColor || theme.COLORS.PLACEHOLDER}
    />
  ) : (
    iconContent
  );

  const viewPassElement = password && viewPass && (
    <TouchableOpacity style={{ marginLeft: 2, paddingVertical: theme.SIZES.INPUT_HORIZONTAL-2, paddingLeft: 10 }} onPress={() => setIsPassword(!isPassword)}>
      <Icon
        size={iconSize || theme.SIZES.BASE * 1.0625}
        color={'#1e7ad9'}
        name="eye"
        family="AntDesign"
      />
    </TouchableOpacity>
  );
  
  const labelContent = label?.length > 0 && <Text style={[styles.label, labelStyles || {}]}>{label}</Text>;
  const helpContent = help?.length > 0 && <Text style={[styles.helpText, helpStyles || {}]}>{help}</Text>;

  return (
    <View
      style={{
        marginVertical: theme.SIZES.BASE / 2,
        alignContent: 'center',
      }}
    >
      {labelContent}
      {topHelp && !bottomHelp && helpContent}
      <View style={inputViewStyles}>
        {left && !right && iconInstance}
        <TextInput
          ref={onRef}
          style={inputStyles}
          keyboardType={type}
          secureTextEntry={isPassword}
          placeholderTextColor={placeholderTextColor}
          underlineColorAndroid="transparent"
          {...rest}
        />
        {right && iconInstance}
        {viewPassElement}
      </View>
      {bottomHelp && helpContent}
    </View>
  );
}

Input.propTypes = {
  style: PropTypes.any,
  textInputStyle: PropTypes.any,
  type: PropTypes.string,
  password: PropTypes.bool,
  placeholderTextColor: PropTypes.string,
  label: PropTypes.string,
  bgColor: PropTypes.string,
  rounded: PropTypes.bool,
  borderless: PropTypes.bool,
  viewPass: PropTypes.bool,
  iconColor: PropTypes.string,
  icon: PropTypes.string,
  family: PropTypes.string,
  color: PropTypes.string,
  help: PropTypes.string,
  left: PropTypes.bool,
  right: PropTypes.bool,
  topHelp: PropTypes.bool,
  bottomHelp: PropTypes.bool,
  styles: PropTypes.any,
  iconSize: PropTypes.number,
  iconContent: PropTypes.any,
  theme: PropTypes.any,
  onRef: PropTypes.func,
};

const styles = theme =>
  StyleSheet.create({
    inputStyle: {
      backgroundColor: theme.COLORS.WHITE,
      borderRadius: theme.SIZES.INPUT_BORDER_RADIUS,
      borderWidth: theme.SIZES.INPUT_BORDER_WIDTH,
      borderColor: theme.COLORS.INPUT,
      height: theme.SIZES.INPUT_HEIGHT,
      paddingHorizontal: theme.SIZES.INPUT_HORIZONTAL,
      width: '100%',
    },
    inputText: {
      color: theme.COLORS.INPUT,
      fontSize: theme.SIZES.INPUT_TEXT,
      textDecorationColor: 'transparent',
      textShadowColor: 'transparent',
      paddingVertical: theme.SIZES.INPUT_HORIZONTAL,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputView: {
      flex: 1,
    },
    inputIcon: {
      marginHorizontal: theme.SIZES.BASE,
    },
    label: {
      fontWeight: '500',
      fontSize: theme.SIZES.INPUT_LABEL_TEXT,
      marginVertical: theme.SIZES.INPUT_VERTICAL_LABEL,
      paddingHorizontal: theme.SIZES.INPUT_HORIZONTAL
    },
    helpText: {
      color: theme.COLORS.SECONDARY,
      fontSize: theme.SIZES.INPUT_HELP_TEXT,
      marginVertical: 8,
      paddingHorizontal: 16,
      fontSize: 14
    },
    rounded: {
      borderRadius: theme.SIZES.INPUT_ROUNDED,
    },
    borderless: {
      borderColor: 'transparent',
      borderWidth: 0,
    },
  });
export default withGalio(Input, styles);