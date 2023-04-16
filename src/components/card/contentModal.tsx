/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {ActivityIndicator, Dimensions, ScrollView, View} from 'react-native';
import React, {memo, useEffect, useRef, useState} from 'react';
import Modal from 'react-native-modal';
import Colors from '../../constants/Colors';
import styled from 'styled-components/native';
import CustomText from '../CustomText';
import Fonts from '../../constants/Fonts';
import {VictoryAxis, VictoryChart, VictoryLine} from 'victory-native';
import {formatCurrency, getData} from '../../utils';
export const {width} = Dimensions.get('window');

type CardContentModalProps = {
  visible: boolean;
  dismiss: () => void;
  data: any;
  portfolioId: string | number;
};

type DataObject = {
  instrument?: null | any;
  key: string;
  units: number;
  value: number;
};

type DataArray = {
  key: Record<any, any>;
  values: Array<DataObject>;
};

type ChartContainerProps = {
  data: Array<DataArray>;
};

type TransactionItemProp = {
  item: {
    tradeDate: string;
    trxType: string;
    security: {
      name: string;
    };
    trxCurrencyCode: string;
    qty: number;
    netAmount: number;
  };
};

const BarHandle = styled.View`
  height: 4px;
  width: 40px;
  border-radius: 20px;
  background-color: ${Colors?.grey_2};
  align-self: center;
`;

const SpacedRow = styled.View<{mt?: number}>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${({mt}) => mt || 0}px;
`;
const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ImageIcon = styled.Image`
  height: 50px;
  width: 50px;
  border-radius: ${50 / 2}px;
`;

const Line = styled.View`
  height: 2px;
  width: 100%;
  background-color: ${Colors.inputGreyBg};
  margin-top: 10px;
`;

const ChartWrapper = styled.View`
  height: 350px;
  width: 100%
  border-radius: 20px;
  background-color: ${Colors.grey_bg};
  position: relative;
`;

const DaysContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  padding-horizontal: 16px;
  bottom: 20px;
  width: 100%;
`;

const DayWrap = styled.View<{active?: boolean}>`
  background-color: ${({active}) => (active ? Colors.grey_5 : Colors.grey_bg)};
  padding-horizontal: 10px;
  padding-vertical: 5px;
  border-radius: 8px;
`;

const HeaderContent = ({data}: any) => {
  const placeholder =
    'https://png.pngtree.com/png-vector/20190917/ourmid/pngtree-not-found-outline-icon-vectors-png-image_1737857.jpg';
  return (
    <SpacedRow mt={18}>
      <Row>
        <ImageIcon
          source={{uri: data?.security?.logoUrl || placeholder}}
          resizeMode="cover"
        />
        <View style={{marginLeft: 10}}>
          <CustomText
            fontFamily={Fonts.MazzardBold}
            fontSize={16}
            style={{fontWeight: '400'}}
            color={Colors.black}>
            {data?.security?.name}
          </CustomText>
          <CustomText
            fontFamily={Fonts.CircularStdBook}
            fontSize={13}
            top={2}
            fontWeight="400"
            color={Colors.grey_text}>
            {data?.security?.symbol}
          </CustomText>
        </View>
      </Row>

      <View style={{marginLeft: 10}}>
        <CustomText
          fontFamily={Fonts.CircularStdBook}
          fontSize={16}
          style={{fontWeight: '400'}}
          align="right"
          color={Colors.black}>
          {data?.security?.exchange}
        </CustomText>
        <CustomText
          fontFamily={Fonts.CircularStdBook}
          fontSize={13}
          fontWeight="400"
          top={2}
          align="right"
          color={Colors.grey_3}>
          Net Qty: {data?.units || 0}
        </CustomText>
      </View>
    </SpacedRow>
  );
};

const ChartContainer = memo(
  ({data: newData}: ChartContainerProps): JSX.Element => {
    const days = ['D', 'W', 'M', '3M', '6M', 'Y', 'All'];

    const formattedArray = newData?.[0]?.values?.map((obj: any) => {
      return {
        x: obj?.key,
        y: obj?.value,
      };
    });

    return (
      <ChartWrapper>
        <VictoryChart
          padding={{top: 10, bottom: 0, left: 0, right: 0}}
          width={width * 0.94}
          height={300}>
          <VictoryLine
            data={formattedArray}
            style={{
              data: {
                stroke: Colors.green,
                strokeWidth: 2,
                strokeLinecap: 'round',
              },
            }}
            interpolation="natural"
          />
          <VictoryAxis style={{axis: {stroke: 'none'}}} />
          <VictoryAxis dependentAxis style={{axis: {stroke: 'none'}}} />
        </VictoryChart>

        <DaysContainer>
          {days.map((day, index) => {
            return (
              <DayWrap active={index === 4} key={`${index}-${day}`}>
                <CustomText
                  fontFamily={
                    index === 4 ? Fonts.MazzardBold : Fonts.CircularStdBook
                  }
                  fontSize={14}
                  style={{
                    fontWeight: '400',
                  }}
                  align="left"
                  color={Colors.grey_4}>
                  {day}
                </CustomText>
              </DayWrap>
            );
          })}
        </DaysContainer>
      </ChartWrapper>
    );
  },
);

const TransactionItem = ({item}: TransactionItemProp) => {
  const {tradeDate, qty, security, netAmount, trxType, trxCurrencyCode} = item;

  return (
    <SpacedRow style={{marginBottom: 20}}>
      <View>
        <CustomText
          fontFamily={Fonts.CircularStdBook}
          fontSize={16}
          style={{fontWeight: '400'}}
          align="left"
          color={Colors.black}>
          {security?.name}
        </CustomText>
        <CustomText
          fontFamily={Fonts.CircularStdBook}
          fontSize={12}
          style={{fontWeight: '400'}}
          align="left"
          top={2}
          color={Colors.grey_3}>
          {tradeDate}
        </CustomText>
      </View>
      <View>
        <CustomText
          fontFamily={Fonts.CircularStdBook}
          fontSize={16}
          style={{fontWeight: '400'}}
          align="right"
          color={Colors.black}>
          {formatCurrency(netAmount || 0, trxCurrencyCode || 'USD')}
        </CustomText>
        <CustomText
          fontFamily={Fonts.MazzardBold}
          fontSize={13}
          style={{fontWeight: '400'}}
          top={2}
          align="right"
          color={trxType === 'BUY' ? Colors.green : Colors.error}>
          {trxType === 'BUY' ? '+' : '-'} {qty} (QTY)
        </CustomText>
      </View>
    </SpacedRow>
  );
};

const TransactionList = ({transactions}: any) => {
  return (
    <View>
      <CustomText
        fontFamily={Fonts.PoppinsBold}
        fontSize={16}
        top={16}
        bottom={25}
        style={{fontWeight: '400'}}
        align="left"
        color={Colors.black_btn_bg}>
        Transactions
      </CustomText>
      {transactions?.map?.((transaction: any) => {
        return (
          <TransactionItem
            key={`${transaction?.id}_transaction`}
            item={transaction}
          />
        );
      })}
    </View>
  );
};

const CardContentModal = memo(
  ({visible, dismiss, data, portfolioId}: CardContentModalProps) => {
    const [scrollOffset, setScrollOffset] = useState<any | null>(null);
    const [transactions, setTransactions] = useState<Array<unknown>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const handleOnScroll = (event: any) => {
      setScrollOffset(event.nativeEvent.contentOffset.y);
    };
    const scrollViewRef = useRef<any>();

    const handleScrollTo = (p: any) => {
      if (scrollViewRef?.current) {
        scrollViewRef?.current?.scrollTo(p);
      }
    };

    useEffect(() => {
      fetchTransactions();
    }, [visible]);

    const fetchTransactions = async () => {
      if (visible) {
        setLoading(true);
        const userRes = await getData();
        fetch(
          `https://casestudy-api-1.accesswealth.io/api/transactions/search?securityIds=${
            data?.item?.security?.id
          }&portfolioIds=${portfolioId}&currencyCode=${
            data?.currencyCode || 'USD'
          }&`,
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
            setTransactions(res?.content);
          })
          .catch(err => {
            setLoading(false);
            console.log('Err fetching transactions:', err);
          });
      }
    };

    return (
      <Modal
        hasBackdrop
        backdropColor="rgba(45, 44, 46,0.7)"
        onBackdropPress={() => {
          dismiss();
          setLoading(!loading);
        }}
        swipeDirection="down"
        coverScreen={false}
        style={{
          padding: 0,
          justifyContent: 'flex-end',
          margin: 0,
        }}
        scrollTo={handleScrollTo}
        scrollOffset={scrollOffset}
        scrollOffsetMax={400 - 300}
        propagateSwipe={true}
        onSwipeComplete={() => {
          dismiss();
          setLoading(!loading);
        }}
        isVisible={visible}>
        <View
          style={{
            backgroundColor: Colors.white,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: '90%',
            padding: 12,
          }}>
          <BarHandle />
          <HeaderContent data={data?.item} />
          <Line />

          <SpacedRow style={{marginBottom: 20}} mt={20}>
            <View>
              <CustomText
                fontFamily={Fonts.CircularStdBook}
                fontSize={12}
                style={{fontWeight: '400'}}
                align="center"
                color={Colors.grey_text}>
                Avg Cost
              </CustomText>
              <CustomText
                fontFamily={Fonts.CircularStdBook}
                fontSize={16}
                fontWeight="400"
                top={2}
                align="left"
                color={Colors.black}>
                {formatCurrency(
                  data?.item?.avgCost || 0,
                  data?.currencyCode || 'USD',
                )}
              </CustomText>
            </View>

            <View>
              <CustomText
                fontFamily={Fonts.CircularStdBook}
                fontSize={12}
                style={{fontWeight: '400'}}
                align="center"
                color={Colors.grey_text}>
                Mrk Price
              </CustomText>
              <CustomText
                fontFamily={Fonts.CircularStdBook}
                fontSize={16}
                fontWeight="400"
                top={2}
                align="left"
                color={Colors.black}>
                {formatCurrency(
                  data?.item?.marketPrice || 0,
                  data?.currencyCode || 'USD',
                )}
              </CustomText>
            </View>

            <View>
              <CustomText
                fontFamily={Fonts.CircularStdBook}
                fontSize={12}
                style={{fontWeight: '400'}}
                align="center"
                color={Colors.grey_text}>
                Mrk Value
              </CustomText>
              <CustomText
                fontFamily={Fonts.CircularStdBook}
                fontSize={16}
                fontWeight="400"
                top={2}
                align="left"
                color={Colors.black}>
                {formatCurrency(
                  data?.item?.marketValue || 0,
                  data?.currencyCode || 'USD',
                )}
              </CustomText>
            </View>
          </SpacedRow>
          <ScrollView
            ref={scrollViewRef}
            onScroll={handleOnScroll}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}>
            {!loading && <ChartContainer data={data?.chartData} />}

            {loading ? (
              <ActivityIndicator size="small" color={Colors.primary} />
            ) : (
              <TransactionList transactions={transactions} />
            )}
          </ScrollView>
        </View>
      </Modal>
    );
  },
);

export default CardContentModal;
