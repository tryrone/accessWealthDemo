/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useLayoutEffect, useState} from 'react';
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
import Toast from 'react-native-toast-message';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {getData, storeData} from '../utils';

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
  const [loading, setLoading] = useState(false);
  const loginValidation = Yup.object().shape({
    username: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
  });

  useLayoutEffect(() => {
    checkIfUserIsLoggedIn();
  }, []);

  const checkIfUserIsLoggedIn = async () => {
    const userRes = await getData();
    if (userRes) {
      navigation.navigate(DASHBOARD);
    }
  };

  const loginUser = (values: {username: string; password: string}) => {
    setLoading(true);
    fetch('https://casestudy-api-1.accesswealth.io/api/authenticate', {
      method: 'POST',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then(res => res.json())
      .then(async (res: any) => {
        setLoading(false);
        await storeData(res);

        navigation.navigate(DASHBOARD);
      })
      .catch(err => {
        setLoading(false);
        Toast.show({
          type: 'error',
          text1: 'Error logging in',
          text2: err?.error || 'Unable to login right now',
        });
      });
  };

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

      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        validationSchema={loginValidation}
        enableReinitialize={false}
        validateOnChange={false}
        validateOnBlur={true}
        onSubmit={(values, actions: any) => {
          loginUser(values);
        }}>
        {({handleSubmit, values, errors, setFieldValue, touched}) => {
          return (
            <>
              <TextInput
                value={values.username}
                placeholder="Tin Man"
                name="username"
                title="Username"
                returnValue
                handleChange={val => setFieldValue('username', val.trim())}
                errors={touched?.username ? errors.username : ''}
                marginTop={28}
              />

              <Password
                value={values.password}
                placeholder="Enter your password"
                title="Password"
                marginTop={12}
                returnValue
                handleChange={val => setFieldValue('password', val)}
                errors={touched?.password ? errors.password : ''}
              />

              <Button
                bgColor={Colors?.primary}
                text="Log in"
                fontFamily={Fonts?.PoppinsBold}
                fontWeight="800"
                style={{marginTop: 62}}
                borderRadius="40px"
                textColor={Colors?.black}
                onPress={handleSubmit}
                loading={loading}
                disabled={loading}
              />
            </>
          );
        }}
      </Formik>
    </SafeAreaWrap>
  );
};

export default Login;
