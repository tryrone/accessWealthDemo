/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import styled from 'styled-components/native';
import Colors from '../../constants/Colors';
import CustomText from '../CustomText';
import Fonts from '../../constants/Fonts';
import {Dimensions, View} from 'react-native';
import {VictoryArea, VictoryChart} from 'victory-native';
import {Defs, LinearGradient, Stop} from 'react-native-svg';

const {width} = Dimensions.get('screen');

const Wrap = styled.TouchableOpacity`
  width: 47%;
  height: 200px;
  background-color: ${Colors.black_btn_bg};
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 20px;
`;

const SpacedRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Image = styled.Image`
  height: 40px;
  width: 40px;
  border-radius: ${40 / 2}px;
  background-color: ${Colors.white};
`;

type CardProps = {
  image: string;
  short: string;
  name: string;
  amount: string;
  quantity: number | string;
  startRgba: string;
  strokeColor: string;
  onPress: () => void;
};

const Card = ({
  image,
  short,
  name,
  amount,
  quantity,
  startRgba,
  strokeColor,
  onPress,
}: CardProps) => {
  const data = [
    {x: 1, y: 2},
    {x: 2, y: 3},
    {x: 3, y: 5},
    {x: 4, y: 4},
    {x: 5, y: 7},
  ];
  return (
    <Wrap onPress={onPress}>
      <SpacedRow style={{paddingHorizontal: 12, paddingTop: 12}}>
        <View style={{flex: 1}}>
          <CustomText
            fontFamily={Fonts.MazzardBold}
            fontSize={16}
            fontWeight="400"
            color={strokeColor}>
            {short}
          </CustomText>
          <CustomText
            fontFamily={Fonts.CircularStdBook}
            fontSize={13}
            top={2}
            fontWeight="400"
            numberOfLines={2}
            color={Colors.inputGreyBg}>
            {name}
          </CustomText>
        </View>
        <Image source={{uri: image}} resizeMode="cover" />
      </SpacedRow>

      <View style={{paddingHorizontal: 12, marginTop: 20}}>
        <CustomText
          fontFamily={Fonts.MazzardBold}
          fontSize={16}
          fontWeight="400"
          color={Colors.white}>
          {amount}
        </CustomText>
        <CustomText
          fontFamily={Fonts.CircularStdBook}
          fontSize={12}
          top={2}
          fontWeight="400"
          color={Colors.white}>
          NET QTY: {quantity}
        </CustomText>
      </View>

      <VictoryChart
        padding={{top: 0, bottom: 0, left: 0, right: 0}}
        width={width * 0.45}
        height={100}>
        <Defs>
          <LinearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor={startRgba} stopOpacity="0.5" />
            <Stop
              offset="100%"
              stopColor={Colors.black_btn_bg}
              stopOpacity="0"
            />
          </LinearGradient>
        </Defs>
        <VictoryArea
          data={data}
          style={{
            data: {
              fill: 'url(#gradient)',
              stroke: strokeColor,
              strokeWidth: 2,
              strokeLinecap: 'round',
            },
          }}
          interpolation="natural"
        />
      </VictoryChart>
    </Wrap>
  );
};

export default Card;
