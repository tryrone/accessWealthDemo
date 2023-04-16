/* eslint-disable react-native/no-inline-styles */

import React, {useState} from 'react';
import {
  KeyboardTypeOptions,
  Pressable,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import styled from 'styled-components/native';
import {ActivePassword, HidePassword} from '../../assets/svg';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import CustomText from '../CustomText';

const Wrapper = styled.View<{
  width?: number;
  active?: boolean;
  marginTop?: number;
}>`
  height: 56px;
  width: ${props => props?.width || 100}%;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${props => props?.marginTop || 0}px;
  padding-horizontal: 12px;
  z-index: 4;
  background-color: ${Colors.black_btn_bg};
  position: relative;
`;

const TextWrap: any = styled.TextInput`
  height: 100%;
  width: 100%;
  font-family: ${Fonts?.CircularStdBook};
  font-size: 16px;
  font-weight: 400;
  color: ${Colors?.white};
  align-items: center;
`;

const ViewWrap = styled.View<{
  width?: string;
  top?: number;
  bottom?: number;
  viewStyle?: {};
}>`
  position: relative;
  width: ${({width}) => width || '100%'};
  margin-top: ${({top}) => top}px;
  margin-bottom: ${({bottom}) => bottom || 0}px;
  ${({viewStyle}) => viewStyle};
`;

const InputWithIcon = styled.Pressable<{
  bgColor: string;
  borderColor: string;
  active: boolean;
}>`
  flex-direction: row;
  width: 100%;
  background-color: ${({bgColor}) => bgColor};
  padding-horizontal: 16px;
  height: 55px;
  border-radius: 8px;
  justify-content: space-between;
  align-items: center;
`;

const PasswordInput = styled.TextInput<{
  width?: string;
}>`
  width: ${({width}) => width || '100%'};
  color: ${Colors?.white};
  height: 52px;
  text-align: left;
  font-family: ${Fonts?.CircularStdBook};
  font-size: 16px;
  font-weight: 400;
  color: ${Colors?.white};
  justify-content: center;
`;

type TextInputProps = {
  marginTop?: number;
  placeholder?: string;
  placeholderTextColor?: string;
  title?: string;
  inputType?: KeyboardTypeOptions;
  returnValue?: boolean;
  handleChange?: ((e: string) => void) | undefined;
  name?: string;
  errors?: string;
  value: string;
  showNaira?: boolean;
  onWrapPress?: ((e: boolean) => void) | undefined;
  disabled?: boolean;
};

const TextInput = ({
  marginTop = 0,
  placeholder = '',
  placeholderTextColor = Colors.grey_3,
  inputType = 'default',
  returnValue = false,
  handleChange = () => {},
  name = '',
  errors = '',
  value,
  showNaira = false,
  title = '',
}: TextInputProps) => {
  const [focused, setFocused] = useState(false);

  return (
    <Pressable>
      <CustomText
        style={{
          zIndex: 3,
          alignSelf: 'flex-start',
          marginTop: marginTop,
        }}
        fontFamily={Fonts.CircularStdBook}
        bottom={4}
        fontSize={16}
        fontWeight="700"
        color={Colors?.white}>
        {title}
      </CustomText>

      <Wrapper active={focused}>
        {showNaira && (
          <CustomText
            color={Colors.grey_2}
            align="left"
            right={5}
            fontWeight="800"
            fontSize={14}
            fontFamily={Fonts.PoppinsBold}>
            ₦
          </CustomText>
        )}

        <TextWrap
          placeholder={placeholder}
          keyboardType={inputType}
          placeholderTextColor={placeholderTextColor}
          onChangeText={
            returnValue
              ? (e: string) => {
                  handleChange(e);
                }
              : handleChange(name)
          }
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
          }}
          value={value}
        />
      </Wrapper>
      {errors.length > 0 && (
        <View>
          <CustomText
            fontWeight="500"
            top={4}
            left={5}
            fontFamily={Fonts?.MazzardBold}
            fontSize={13}
            color={Colors.error}>
            {errors}
          </CustomText>
        </View>
      )}
    </Pressable>
  );
};

type PasswordProps = {
  placeholder: string;
  title?: string;
  placeholderTextColor?: string;
  handleChange: (e: string) => void;
  name?: string;
  value: string;
  disabled?: boolean;
  errors?: string;
  marginTop?: number;
  style?: ViewStyle;
  setFieldTouched?: ((e: any) => void) | undefined;
  returnValue?: boolean;
};

export const Password = ({
  placeholder,
  placeholderTextColor = Colors.grey_3,
  handleChange = () => {},
  name = '',
  value,
  disabled = false,
  errors = '',
  marginTop = 0,
  style,
  title,
  returnValue,
}: PasswordProps) => {
  const [hidden, setHidden] = useState(false);
  const [focused, setFocused] = useState(false);

  return (
    <ViewWrap
      bottom={errors.length > 0 ? 16 : 0}
      top={marginTop}
      style={style}
      width="100%">
      <CustomText
        style={{
          zIndex: 3,
          alignSelf: 'flex-start',
        }}
        fontFamily={Fonts.CircularStdBook}
        bottom={4}
        fontSize={16}
        fontWeight="700"
        color={Colors?.white}>
        {title}
      </CustomText>

      <InputWithIcon
        active={focused}
        borderColor={focused ? Colors.primary : Colors.inputGreyBg}
        bgColor={Colors.black_btn_bg}>
        <PasswordInput
          onChangeText={
            returnValue
              ? (e: string) => {
                  handleChange(e);
                }
              : handleChange(name)
          }
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          autoCapitalize={'none'}
          width="80%"
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
          }}
          secureTextEntry={!hidden}
          value={value}
          editable={!disabled}
        />
        <TouchableOpacity onPress={() => setHidden(!hidden)}>
          {hidden ? <ActivePassword /> : <HidePassword />}
        </TouchableOpacity>
      </InputWithIcon>
      {errors.length > 0 && (
        <View>
          <CustomText
            fontWeight="500"
            top={3}
            left={5}
            fontFamily={Fonts?.MazzardBold}
            fontSize={13}
            color={Colors.error}>
            {errors}
          </CustomText>
        </View>
      )}
    </ViewWrap>
  );
};

export default TextInput;
