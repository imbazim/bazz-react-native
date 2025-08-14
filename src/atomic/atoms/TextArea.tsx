import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, KeyboardTypeOptions, ViewStyle, TextStyle, Platform } from 'react-native';
import Icon from '../ions/icon';
import { useBazzTheme } from '../../theme';

export interface TextAreaProps {
    style?: ViewStyle;
    textInputStyle?: TextStyle;
    type?: KeyboardTypeOptions;
    placeholderTextColor?: string;
    label?: string;
    labelStyles?: TextStyle;
    color?: string;
    help?: string;
    helpStyles?: TextStyle;
    bgColor?: string;
    borderless?: boolean;
    rounded?: boolean;
    icon?: string | boolean;
    family?: string;
    left?: boolean;
    right?: boolean;
    iconColor?: string;
    topHelp?: boolean;
    bottomHelp?: boolean;
    iconSize?: number;
    iconContent?: React.ReactNode;
    error?: boolean;
    onRef?: (ref: TextInput) => void;
    // TextInput props
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    onSubmitEditing?: () => void;
    returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send';
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    autoCorrect?: boolean;
    multiline?: boolean;
    numberOfLines?: number;
    maxLength?: number;
    editable?: boolean;
    selectTextOnFocus?: boolean;
    clearButtonMode?: 'never' | 'while-editing' | 'unless-editing' | 'always';
    keyboardType?: KeyboardTypeOptions;
    textContentType?: any;
    autoComplete?: any;
}

export interface TextAreaRef {
    focus: () => void;
    blur: () => void;
    clear: () => void;
    isFocused: () => boolean;
}

const TextArea = forwardRef<TextAreaRef, TextAreaProps>(({
    style,
    textInputStyle,
    type = 'default',
    placeholderTextColor,
    label,
    labelStyles,
    color = 'primary',
    help,
    helpStyles,
    bgColor,
    borderless = false,
    rounded = false,
    icon = false,
    family,
    left = true,
    right = false,
    iconColor = 'primary',
    topHelp = true,
    bottomHelp = false,
    iconSize = 16,
    iconContent,
    error,
    onRef,
    ...rest
}, ref) => {
    const theme = useBazzTheme();
    const inputRef = useRef<TextInput>(null)

    useImperativeHandle(ref, () => ({
        focus: () => inputRef.current?.focus(),
        blur: () => inputRef.current?.blur(),
        clear: () => inputRef.current?.clear(),
        isFocused: () => inputRef.current?.isFocused() || false,
    }));

    const inputViewStyles = [
        styles(theme).inputStyle,
        styles(theme).inputContainer,
        bgColor && { backgroundColor: bgColor },
        rounded && styles(theme).rounded,
        borderless && styles(theme).borderless,
        error && { borderColor: theme.COLORS.LIGHT_MODE.danger },
        rest.multiline && { minHeight: theme.SIZES.INPUT_HEIGHT, height: 'auto' as any },
        style,
    ].filter(Boolean) as ViewStyle[];

    const inputStyles = [
        styles(theme).inputView,
        borderless && icon && styles(theme).inputIcon,
        styles(theme).inputText,
        color && { color },
        rest.multiline && { textAlignVertical: 'top' as const },
        textInputStyle || {}
    ].filter(Boolean);

    const iconInstance = icon ? (
        <Icon
            name={icon as string}
            family={family as string}
            size={iconSize || theme.SIZES.BASE * 1.0625}
            style={{ marginRight: left && !right ? 4 : 0 }}
            color={(error && theme.COLORS.LIGHT_MODE.danger) || iconColor || placeholderTextColor || theme.COLORS.LIGHT_MODE.neutral(0.6)}
        />
    ) : (
        iconContent
    );

    const labelContent = label && label.length > 0 && (
        <Text style={[styles(theme).label, labelStyles || {}]}>{label}</Text>
    );

    const helpContent = help && help.length > 0 && (
        <Text style={[styles(theme).helpText, helpStyles || {}]}>{help}</Text>
    );

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
                    ref={(r) => {
                        if (r) {
                            (inputRef as any).current = r;
                            onRef?.(r);
                        }
                    }}
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
});

TextArea.displayName = 'TextArea';

const styles = (theme: ReturnType<typeof useBazzTheme>) =>
    StyleSheet.create({
        inputStyle: {
            backgroundColor: theme.COLORS.LIGHT_MODE.white,
            borderRadius: theme.SIZES.INPUT_BORDER_RADIUS,
            borderWidth: theme.SIZES.INPUT_BORDER_WIDTH,
            borderColor: theme.COLORS.LIGHT_MODE.input,
            height: theme.SIZES.INPUT_HEIGHT,
            paddingHorizontal: theme.SIZES.INPUT_HORIZONTAL,
            width: '100%',
            textAlignVertical: "top",
        },
        inputText: {
            color: theme.COLORS.LIGHT_MODE.input,
            fontSize: theme.SIZES.INPUT_TEXT,
            textDecorationColor: 'transparent',
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
            fontSize: theme.SIZES.INPUT_TEXT,
            marginVertical: theme.SIZES.INPUT_VERTICAL_LABEL,
            paddingHorizontal: theme.SIZES.INPUT_HORIZONTAL
        },
        helpText: {
            color: theme.COLORS.LIGHT_MODE.warningLight,
            fontSize: 14,
            marginVertical: 8,
            paddingHorizontal: 16,
        },
        rounded: {
            borderRadius: theme.SIZES.INPUT_ROUNDED,
        },
        borderless: {
            borderColor: 'transparent',
            borderWidth: 0,
        }
    })

export default TextArea;