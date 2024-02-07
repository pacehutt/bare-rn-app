import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import SingleClip from './SingleClip';
import ClipDetails from './ClipDetails';
import clipsData from '../../../../test_data/clips_data';

const screenWidth = Dimensions.get('window').width;

const ClipsScreen = () => {
  const bottomTabHeight = 0;
  const mediaRefs = useRef({});
  const [currentPlayingId, setCurrentPlayingId] = useState(null);

  const onViewableItemsChanged = ({viewableItems, changed}) => {
    changed.forEach(({item}) => {
      if (currentPlayingId === item.id) return;
      const cell = mediaRefs.current[item.id];
      if (cell) {
        cell.stop();
      }
    });

    viewableItems.forEach(({item}) => {
      if (currentPlayingId === item.id) return;
      const cell = mediaRefs.current[item.id];
      if (cell) {
        cell.play();
        setCurrentPlayingId(item.id);
      }
    });
  };

  const renderItem = ({item}) => {
    return (
      <View
        style={[
          styles.itemContainer,
          {height: Dimensions.get('window').height - bottomTabHeight},
        ]}>
        <SingleClip
          ref={ref => (mediaRefs.current[item.id] = ref)}
          url={item.videoUrl}
          id={item.id}
          onPlaybackStart={() => setCurrentPlayingId(item.id)}
        />
        <ClipDetails clipData={item.clipData} />
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {height: Dimensions.get('window').height - bottomTabHeight},
      ]}>
      <View style={styles.header}>
        <Text style={styles.backButton}>{'<--'}</Text>
        <TouchableOpacity style={styles.customizeFeedButton}>
          <Text style={styles.customizeFeedText}>Customize Feed</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={clipsData}
        renderItem={renderItem}
        pagingEnabled
        snapToInterval={Dimensions.get('window').height}
        keyExtractor={item => item?.id?.toString()}
        onViewableItemsChanged={onViewableItemsChanged}
        windowSize={2}
        decelerationRate={'fast'}
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        viewabilityConfig={{
          waitForInteraction: false,
          viewAreaCoveragePercentThreshold: 90,
        }}
        style={styles.reelsList}
        contentContainerStyle={styles.reelsListContent}
      />
    </View>
  );
};

export default ClipsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  header: {
    position: 'absolute',
    top: 15,
    width: '100%',
    paddingHorizontal: 15,
    zIndex: 100,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    color: '#fff',
    fontSize: 18,
  },
  customizeFeedButton: {
    backgroundColor: 'grey',
    borderRadius: 1.5,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  customizeFeedText: {
    color: '#fff',
    fontSize: 13,
  },
  itemContainer: {
    flex: 1,
    width: screenWidth,
  },
  reelsList: {
    flex: 1,
  },
  reelsListContent: {
    paddingBottom: 10,
  },
});
