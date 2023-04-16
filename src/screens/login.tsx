/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import SafeAreaWrap from '../components/SafeAreaWrap';
import Colors from '../constants/Colors';
import styled from 'styled-components/native';
import {AppleIcon, BackArrow, GoogleIcon} from '../assets/svg';
import CustomText from '../components/CustomText';
import Fonts from '../constants/Fonts';
import TextInput, {Password} from '../components/TextInput';
import Button from '../components/Button';
import {ScreenDefaultProps} from '../constants/types';
import {DASHBOARD} from '../constants/navigationConstants';

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;
const SpacedRow = styled.View<{mt?: number}>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${({mt}) => mt || 0}px;
`;

const ArrowContainer = styled.TouchableOpacity`
  height: 40px;
  width: 40px;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: ${Colors.black_btn_bg};
  background-color: ${Colors.black_btn_bg};
`;

const OAuthBtn = styled.TouchableOpacity`
  height: 60px;
  width: 47%;
  justify-content: center;
  align-items: center;
  border-width: 2px;
  border-radius: 12px;
  border-color: ${Colors.grey_3};
  background-color: ${Colors.black_btn_bg};
`;

const Login = ({navigation}: ScreenDefaultProps) => {
  const wrapperStyle = {paddingHorizontal: 16, paddingTop: 20};
  return (
    <SafeAreaWrap
      bg={Colors.bg_color}
      safeAreaBg={Colors.bg_color}
      style={wrapperStyle}>
      <Row>
        <ArrowContainer>
          <BackArrow style={{color: Colors.white}} />
        </ArrowContainer>

        <CustomText
          fontFamily={Fonts.MazzardBold}
          fontSize={32}
          left={10}
          color={Colors.white}>
          Log in
        </CustomText>
      </Row>

      <CustomText
        fontFamily={Fonts.CircularStdBook}
        fontSize={16}
        fontWeight="400"
        top={20}
        color={Colors.grey_3}>
        Log in with one of the following options.
      </CustomText>

      <SpacedRow mt={50}>
        <OAuthBtn>
          <GoogleIcon />
        </OAuthBtn>
        <OAuthBtn>
          <AppleIcon />
        </OAuthBtn>
      </SpacedRow>

      <TextInput
        value=""
        placeholder="tim@apple.com"
        inputType="email-address"
        title="Email"
        marginTop={28}
      />

      <Password
        value=""
        placeholder="Enter your password"
        title="Password"
        marginTop={12}
      />

      <Button
        bgColor={Colors?.primary}
        text="Log in"
        fontFamily={Fonts?.PoppinsBold}
        fontWeight="800"
        style={{marginTop: 62}}
        borderRadius="40px"
        textColor={Colors?.black}
        onPress={() => {
          navigation.navigate(DASHBOARD);
        }}
      />
    </SafeAreaWrap>
  );
};

export default Login;
