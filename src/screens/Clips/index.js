import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ClipsScreen from './components/ClipsScreen';

const Clips = () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <View style={{flex: 1}}>
      <ClipsScreen />
    </View>
  );
};

export default Clips;

const styles = StyleSheet.create({});
