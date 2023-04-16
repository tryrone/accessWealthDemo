/* eslint-disable react-native/no-inline-styles */
import {View, Modal, ActivityIndicator} from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';

const LoadingModal = ({visible}: any): JSX.Element => {
  return (
    <Modal transparent visible={visible}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    </Modal>
  );
};

export default LoadingModal;
