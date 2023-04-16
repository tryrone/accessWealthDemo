/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import Colors from '../constants/Colors';
import CustomText from '../components/CustomText';
import Fonts from '../constants/Fonts';
import {BellIcon, SideLeftIcon, SideRightIcon} from '../assets/svg';
import Button from '../components/Button';
import Card from '../components/card';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import CardContentModal from '../components/card/contentModal';

const TopContainer = styled.View`
  width: 100%;
  height: 100%;
  padding-horizontal: 14px;
  background-color: ${Colors.bg_color};
`;

const NavWrap = styled.SafeAreaView`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;

const CurrencyWrap = styled.View`
  height: 35px;
  width: 118px;
  padding-horizontal: 14px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  flex-direction: row;
  align-items: center;
  position: relative;
  left: 5%;
`;

const CurrBtn = styled.TouchableOpacity<{left?: number}>`
  height: 30px;
  border-radius: 25px;
  width: 45px;
  justify-content: center;
  align-items: center;
  z-index: 5;
  position: relative;
  left: ${({left}) => left || 0}px;
`;

const FLoatingBtn = styled(Animated.View)`
  height: 30px;
  border-radius: 25px;
  width: 50px;
  background-color: ${Colors.white};
  z-index: 3;
  position: absolute;
`;

const SpacedRow = styled.View<{mt?: number}>`
  flex-direction: row;
  align-items: center;
  margin-top: ${({mt}) => mt || 0}px;
`;

const SpacedCards = styled.View<{mt?: number}>`
  flex-direction: row;
  align-items: center;
  margin-top: ${({mt}) => mt || 0}px;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ArrowLeftWrap = styled.View`
  height: 40px;
  width: 40px;
  border-radius: ${40 / 2}px;
  background-color: ${Colors?.grey_2};
  position: relative;
  left: -28px;
  justify-content: center;
  align-items: center;
`;

const Circle = styled.View`
  height: 25px;
  width: 25px;
  border-radius: ${25 / 2}px;
  background-color: ${Colors.white};
  margin-horizontal: -14px;
`;

const CurrencySwitch = () => {
  const [activeTab, setActiveTab] = useState('USD');
  const activePosition = useSharedValue(0);

  useEffect(() => {
    if (activeTab === 'USD') {
      activePosition.value = withTiming(2);
    } else {
      activePosition.value = withTiming(65);
    }
  }, [activeTab]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: activePosition.value,
        },
      ],
    };
  });
  return (
    <CurrencyWrap>
      <FLoatingBtn style={animatedStyles} />
      <CurrBtn
        onPress={() => setActiveTab('USD')}
        left={-10}
        style={{paddingTop: 2}}>
        <CustomText
          fontFamily={Fonts.CircularStdBook}
          fontSize={13}
          fontWeight="400"
          color={Colors.black}>
          USD
        </CustomText>
      </CurrBtn>
      <CurrBtn
        onPress={() => setActiveTab('AED')}
        left={10}
        style={{paddingTop: 2}}>
        <CustomText
          fontFamily={Fonts.CircularStdBook}
          fontSize={13}
          align="center"
          fontWeight="400"
          color={Colors.black}>
          AED
        </CustomText>
      </CurrBtn>
    </CurrencyWrap>
  );
};

const NavHeader = () => {
  return (
    <NavWrap>
      <View style={{flex: 1}}>
        <CustomText
          fontFamily={Fonts.CircularStdBook}
          fontSize={15}
          fontWeight="400"
          color={Colors.white}>
          Welcome
        </CustomText>
        <CustomText
          fontFamily={Fonts.MazzardBold}
          fontSize={18}
          top={2}
          fontWeight="400"
          numberOfLines={1}
          color={Colors.white}>
          Steve Smith
        </CustomText>
      </View>

      <CurrencySwitch />

      <View style={{flex: 1, alignItems: 'flex-end'}}>
        <BellIcon />
      </View>
    </NavWrap>
  );
};

const BtnRow = () => {
  return (
    <SpacedRow mt={35}>
      <Button
        bgColor={Colors?.white}
        text="Withdraw"
        fontFamily={Fonts?.CircularStdBook}
        fontWeight="800"
        width="50%"
        height="48px"
        borderRadius="40px"
        textColor={Colors?.black}
        onPress={() => {}}
        icon={
          <ArrowLeftWrap>
            <SideLeftIcon />
          </ArrowLeftWrap>
        }
      />
      <Circle />
      <Button
        bgColor={Colors?.white}
        text="Deposit"
        fontFamily={Fonts?.CircularStdBook}
        fontWeight="800"
        width="50%"
        height="48px"
        borderRadius="40px"
        textColor={Colors?.black}
        onPress={() => {}}
        icon={
          <ArrowLeftWrap style={{left: -35}}>
            <SideRightIcon />
          </ArrowLeftWrap>
        }
      />
    </SpacedRow>
  );
};

const Dashboard = () => {
  return (
    <View>
      <TopContainer>
        <NavHeader />

        <CustomText
          fontFamily={Fonts.CircularStdBook}
          fontSize={18}
          top={25}
          fontWeight="400"
          color={Colors.white}>
          Your Balance
        </CustomText>
        <CustomText
          fontFamily={Fonts.CircularStdBook}
          fontSize={38}
          top={15}
          fontWeight="400"
          color={Colors.white}>
          $13,742.
          <CustomText
            fontFamily={Fonts.CircularStdBook}
            fontSize={38}
            top={15}
            fontWeight="400"
            color={'rgba(255,255,255,0.2)'}>
            02
          </CustomText>
        </CustomText>

        <BtnRow />

        <SpacedCards mt={40}>
          <Card
            short="NFLX"
            name="Netflix Inc"
            quantity={50}
            amount="$338.6"
            strokeColor="#b9090b"
            startRgba="rgba(185, 9, 11, 0.5)"
            image="https://eodhistoricaldata.com/img/logos/US/nflx.png"
            onPress={() => {}}
          />
          <Card
            short="XOM"
            name="Exxon Mobil Corp"
            quantity={150}
            amount="$116.1"
            strokeColor="#2c6bc8"
            startRgba="rgba(44, 106, 200, 0.5)"
            image="https://eodhistoricaldata.com/img/logos/US/XOM.png"
            onPress={() => {}}
          />
          <Card
            short="GOOG"
            name="Alphabet Inc Class C"
            quantity={150}
            amount="$109.5"
            strokeColor="#8279ff"
            startRgba="rgba(130, 121, 255, 0.5)"
            image="https://eodhistoricaldata.com/img/logos/US/goog.png"
            onPress={() => {}}
          />
          <Card
            short="TSLA"
            name="Tesla Inc"
            quantity={25}
            amount="$185.0"
            strokeColor="#65ffff"
            startRgba="rgba(101, 255, 255, 0.5)"
            image="https://eodhistoricaldata.com/img/logos/US/TSLA.png"
            onPress={() => {}}
          />
        </SpacedCards>
      </TopContainer>

      <CardContentModal visible={false} dismiss={() => {}} />
    </View>
  );
};

export default Dashboard;
