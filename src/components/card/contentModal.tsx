/* eslint-disable react-native/no-inline-styles */
import {Dimensions, ScrollView, View} from 'react-native';
import React, {useRef, useState} from 'react';
import Modal from 'react-native-modal';
import Colors from '../../constants/Colors';
import styled from 'styled-components/native';
import CustomText from '../CustomText';
import Fonts from '../../constants/Fonts';
import {VictoryAxis, VictoryChart, VictoryLine} from 'victory-native';

export const {width} = Dimensions.get('window');

type CardContentModalProps = {
  visible: boolean;
  dismiss: () => void;
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

const HeaderContent = () => {
  const placeholder =
    'https://static.vecteezy.com/system/resources/previews/008/505/801/original/bitcoin-logo-color-illustration-png.png';
  return (
    <SpacedRow mt={18}>
      <Row>
        <ImageIcon source={{uri: placeholder}} resizeMode="cover" />
        <View style={{marginLeft: 10}}>
          <CustomText
            fontFamily={Fonts.MazzardBold}
            fontSize={16}
            style={{fontWeight: '400'}}
            color={Colors.black}>
            Binance Coin
          </CustomText>
          <CustomText
            fontFamily={Fonts.CircularStdBook}
            fontSize={13}
            top={2}
            fontWeight="400"
            color={Colors.grey_text}>
            BNB
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
          $309.41
        </CustomText>
        <CustomText
          fontFamily={Fonts.CircularStdBook}
          fontSize={13}
          fontWeight="400"
          top={2}
          align="right"
          color={Colors.grey_3}>
          Net Qty: 25
        </CustomText>
      </View>
    </SpacedRow>
  );
};

const ChartContainer = () => {
  const days = ['D', 'W', 'M', '3M', '6M', 'Y', 'All'];

  const data = [
    {x: 1453075200, y: 1.47},
    {x: 1453161600, y: 1.37},
    {x: 1453248000, y: 1.53},
    {x: 1453334400, y: 1.54},
    {x: 1453420800, y: 1.52},
    {x: 1453507200, y: 2.03},
    {x: 1453593600, y: 2.1},
    {x: 1453680000, y: 2.5},
    {x: 1453766400, y: 2.3},
    {x: 1453852800, y: 2.42},
    {x: 1453939200, y: 2.55},
    {x: 1454025600, y: 2.41},
    {x: 1454112000, y: 2.43},
    {x: 1454198400, y: 2.2},
  ];

  return (
    <ChartWrapper>
      <VictoryChart
        padding={{top: 20, bottom: 0, left: 0, right: 0}}
        domain={{y: [0, 3.7]}}
        width={width * 0.94}
        height={300}>
        <VictoryLine
          data={data}
          style={{
            data: {
              fill: 'url(#gradient)',
              stroke: Colors.exxon_hex,
              strokeWidth: 3,
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
};

const TransactionItem = () => {
  return (
    <SpacedRow style={{marginBottom: 20}}>
      <View>
        <CustomText
          fontFamily={Fonts.CircularStdBook}
          fontSize={16}
          style={{fontWeight: '400'}}
          align="left"
          color={Colors.black}>
          Alphabet Inc Class C
        </CustomText>
        <CustomText
          fontFamily={Fonts.CircularStdBook}
          fontSize={12}
          style={{fontWeight: '400'}}
          align="left"
          top={2}
          color={Colors.grey_3}>
          01-01-2022
        </CustomText>
      </View>
      <View>
        <CustomText
          fontFamily={Fonts.CircularStdBook}
          fontSize={16}
          style={{fontWeight: '400'}}
          align="right"
          color={Colors.black}>
          $578718.6
        </CustomText>
        <CustomText
          fontFamily={Fonts.MazzardBold}
          fontSize={13}
          style={{fontWeight: '400'}}
          top={2}
          align="right"
          color={Colors.green}>
          + 200 (QTY)
        </CustomText>
      </View>
    </SpacedRow>
  );
};

const TransactionList = () => {
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
      <TransactionItem />
      <TransactionItem />
      <TransactionItem />
      <TransactionItem />
      <TransactionItem />
      <TransactionItem />
      <TransactionItem />
      <TransactionItem />
      <TransactionItem />
    </View>
  );
};

const CardContentModal = ({visible, dismiss}: CardContentModalProps) => {
  const [scrollOffset, setScrollOffset] = useState<any | null>(null);
  const handleOnScroll = (event: any) => {
    setScrollOffset(event.nativeEvent.contentOffset.y);
  };
  const scrollViewRef = useRef<any>();

  const handleScrollTo = (p: any) => {
    if (scrollViewRef?.current) {
      scrollViewRef?.current?.scrollTo(p);
    }
  };
  return (
    <Modal
      hasBackdrop
      backdropColor="rgba(45, 44, 46,0.7)"
      onBackdropPress={() => dismiss()}
      swipeDirection="down"
      coverScreen={false}
      style={{
        padding: 0,
        justifyContent: 'flex-end',
        margin: 0,
      }}
      scrollTo={handleScrollTo}
      scrollOffset={scrollOffset}
      scrollOffsetMax={400 - 300} // content height - ScrollView height
      propagateSwipe={true}
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
        <HeaderContent />
        <Line />

        <SpacedRow style={{marginBottom: 20}} mt={20}>
          <View>
            <CustomText
              fontFamily={Fonts.CircularStdBook}
              fontSize={12}
              style={{fontWeight: '400'}}
              align="left"
              color={Colors.grey_text}>
              Avg Cost
            </CustomText>
            <CustomText
              fontFamily={Fonts.CircularStdBook}
              fontSize={20}
              fontWeight="400"
              top={2}
              align="left"
              color={Colors.black}>
              $301.52
            </CustomText>
          </View>

          <View>
            <CustomText
              fontFamily={Fonts.CircularStdBook}
              fontSize={12}
              style={{fontWeight: '400'}}
              align="left"
              color={Colors.grey_text}>
              Mrk Price
            </CustomText>
            <CustomText
              fontFamily={Fonts.CircularStdBook}
              fontSize={20}
              fontWeight="400"
              top={2}
              align="left"
              color={Colors.black}>
              $331.73
            </CustomText>
          </View>

          <View>
            <CustomText
              fontFamily={Fonts.CircularStdBook}
              fontSize={12}
              style={{fontWeight: '400'}}
              align="left"
              color={Colors.grey_text}>
              Mrk Value
            </CustomText>
            <CustomText
              fontFamily={Fonts.CircularStdBook}
              fontSize={20}
              fontWeight="400"
              top={2}
              align="left"
              color={Colors.black}>
              $16931.5
            </CustomText>
          </View>
        </SpacedRow>
        <ScrollView
          ref={scrollViewRef}
          onScroll={handleOnScroll}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}>
          <ChartContainer />
          <TransactionList />
        </ScrollView>
      </View>
    </Modal>
  );
};

export default CardContentModal;
