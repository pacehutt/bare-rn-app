import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import StoryList from './components/story';

const Feed = () => {
  return (
    <View
      style={{
        flex: 1,
      }}>
      <StoryList />
    </View>
  );
};

export default Feed;

const styles = StyleSheet.create({});
