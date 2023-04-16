/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {TouchableOpacity, View} from 'react-native';
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
import {clearData, formatCurrency, getData} from '../utils';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import LoadingModal from '../components/LoadingModal';
import {LOGIN} from '../constants/navigationConstants';
import {ScreenDefaultProps} from '../constants/types';

interface NavHeaderProps extends ScreenDefaultProps {
  name: string;
  changeCurrencyCode: (val: string) => void;
}

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

const CurrencySwitch = ({changeCurrencyCode}: any) => {
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
        onPress={() => {
          setActiveTab('USD');
          changeCurrencyCode('USD');
        }}
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
        onPress={() => {
          setActiveTab('AED');
          changeCurrencyCode('AED');
        }}
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

const NavHeader = ({name, changeCurrencyCode, navigation}: NavHeaderProps) => {
  const logoutUser = async () => {
    await clearData();
    navigation.navigate(LOGIN);
  };
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
          {name}
        </CustomText>
      </View>

      <CurrencySwitch changeCurrencyCode={changeCurrencyCode} />

      <TouchableOpacity
        onPress={logoutUser}
        style={{flex: 1, alignItems: 'flex-end'}}>
        <BellIcon />
      </TouchableOpacity>
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

const Dashboard = ({navigation}: ScreenDefaultProps) => {
  const [portfolioData, setPortfolioData] = useState<any>({});
  const [portfolioInView, setPortfolioInView] = useState<any>({});
  const [detailmodalVisible, setDetailModalVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {
    setLoading(true);
    const userRes = await getData();
    fetch('https://casestudy-api-1.accesswealth.io/api/portfolio/valuation?', {
      method: 'GET',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userRes?.token}`,
      },
    })
      .then(res => res.json())
      .then(async (res: any) => {
        setLoading(false);
        setPortfolioData(res);
      })
      .catch(err => {
        setLoading(false);
        Toast.show({
          type: 'error',
          text1: 'Error getting portfolio Data',
          text2: err?.error || 'Something went wrong please try again later',
        });
      });
  };

  const changeCurrencyCode = async (currencyCode: string) => {
    setLoading(true);
    const userRes = await getData();
    fetch(
      `https://casestudy-api-1.accesswealth.io/api/portfolio/valuation?currencyCode=${currencyCode}&`,
      {
        method: 'GET',
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userRes?.token}`,
        },
      },
    )
      .then(res => res.json())
      .then(async (res: any) => {
        setLoading(false);
        setPortfolioData(res);
      })
      .catch(err => {
        setLoading(false);
        Toast.show({
          type: 'error',
          text1: 'Error getting portfolio Data',
          text2: err?.error || 'Something went wrong please try again later',
        });
      });
  };

  return (
    <View>
      <TopContainer>
        <NavHeader
          name={portfolioData?.portfolio?.investor?.name}
          changeCurrencyCode={changeCurrencyCode}
          navigation={navigation}
        />

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
          {formatCurrency(
            portfolioData?.marketValue || 0,
            portfolioData?.currencyCode || 'USD',
          )}
        </CustomText>

        <BtnRow />

        <SpacedCards mt={40}>
          {portfolioData?.securityValuations?.map(
            (item: any, index: number) => {
              const chartData =
                portfolioData?.securityTimeSeries?.filter?.(
                  (series: any) =>
                    series?.key?.symbol === item?.security?.symbol,
                ) || [];

              const hexCode =
                Colors[`${[item?.security?.symbol?.toLowerCase?.()]}_hex`];

              const rgbaCode =
                Colors[`${[item?.security?.symbol?.toLowerCase?.()]}_rgba`];

              return (
                <Card
                  key={`${index}-card-chart`}
                  short={item?.security?.symbol}
                  name={item?.security?.name}
                  quantity={item?.units}
                  amount={`${formatCurrency(
                    item?.marketPrice,
                    portfolioData?.currencyCode || 'USD',
                  )}`}
                  strokeColor={hexCode || Colors.black}
                  startRgba={rgbaCode || Colors.black}
                  image={item?.security?.logoUrl}
                  onPress={async () => {
                    await setPortfolioInView({
                      item,
                      chartData,
                      currencyCode: portfolioData?.currencyCode,
                    });
                    setDetailModalVisible(true);
                  }}
                  data={chartData}
                />
              );
            },
          )}
        </SpacedCards>
      </TopContainer>

      <CardContentModal
        data={portfolioInView}
        visible={detailmodalVisible}
        dismiss={() => {
          setDetailModalVisible(false);
        }}
        portfolioId={portfolioData?.portfolio?.id}
      />
      <LoadingModal visible={loading} />
    </View>
  );
};

export default Dashboard;
