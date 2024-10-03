import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Icon from '../ions/Icon';
import BazzTheme, { withBazz } from '../../theme';

function TextArea({
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
  rounded = false,
  icon = null,
  family = null,
  left = true,
  right = false,
  iconColor = null,
  topHelp = true,
  bottomHelp = false,
  theme = BazzTheme,
  styles = {},
  iconSize = null,
  iconContent = null,
  onRef = null,
  error = false,
  ...rest
}) {
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
      style={{ marginRight: left && !right ? 4 : 0, marginTop: 10 }}
      color={(error && theme.COLORS.DANGER) || iconColor || placeholderTextColor || theme.COLORS.PLACEHOLDER}
    />
  ) : (
    iconContent
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
          placeholderTextColor={placeholderTextColor}
          underlineColorAndroid="transparent"
          multiline
          {...rest}
        />
        {right && iconInstance}
      </View>
      {bottomHelp && helpContent}
    </View>
  );
}

TextArea.propTypes = {
  style: PropTypes.any,
  textInputStyle: PropTypes.any,
  type: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  label: PropTypes.string,
  bgColor: PropTypes.string,
  rounded: PropTypes.bool,
  borderless: PropTypes.bool,
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
      textAlignVertical: "top",
    },
    inputText: {
      color: theme.COLORS.INPUT,
      fontSize: theme.SIZES.INPUT_TEXT,
      textDecorationColor: 'transparent',
      textShadowColor: 'transparent',
      paddingVertical: 10,
      height: 78,
      textAlignVertical: "top",
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'center',
      textAlignVertical: "top",
      height: 80,
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
export default withBazz(TextArea, styles);