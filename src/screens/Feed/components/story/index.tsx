import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import storiesData from '../../../../../test_data/stroies_data.json';
import StoryListItem from './components/StoryListItem';

const StoryList = () => {
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.flatListContent}
        horizontal
        data={storiesData}
        renderItem={({item}) => {
          return (
            <StoryListItem
              username={item.name}
              imgUrl={item.imgUrl}
              storyItem={item.stories}
              id={item.id}
            />
          );
        }}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default StoryList;

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 0,
  },
  flatListContent: {
    paddingLeft: 10,
    paddingTop: 10,
    paddingVertical: 10,
  },
});
