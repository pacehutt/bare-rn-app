import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import Video from 'react-native-video';
import ProductCard from '../../../../Clips/components/ProductCard';

interface Story {
  id: string;
  sourceUrl: string;
  type: string;
  productsList: {
    id: number;
    title: string;
    description: string;
    price: number;
    rating: number;
    reviewsCount: number;
    imageUrl: string;
  }[];
}

const StoryScreen = ({route, navigation}: {route: any; navigation: any}) => {
  const userDetails = route.params.userDetails;

  const [current, setCurrent] = useState(0);
  const [holdAnimation, setHoldAnimation] = useState(false); // State to control animation hold
  const [load, setLoad] = useState(false);

  const [seenStories, setSeenStories] = useState(new Set());
  const [stories, setStories] = useState<Story[]>(route.params.storyItem);

  const progress = useRef(new Animated.Value(0)).current;

  const {width, height} = useWindowDimensions();

  const start = () => {
    if (stories[current].type === 'video') {
      if (load) {
        Animated.timing(progress, {
          toValue: 1,
          duration: 5000, // 5 seconds per story
          useNativeDriver: false,
        }).start(result => {
          console.log('result', result);
          if (result.finished) {
            next();
          }
        });
      }
    } else {
      Animated.timing(progress, {
        toValue: 1,
        duration: 5000, // 5 seconds per story
        useNativeDriver: false,
      }).start(result => {
        console.log('result', result);
        if (result.finished) {
          next();
        }
      });
    }
  };

  const next = () => {
    console.log('next pressed');
    if (current < stories.length - 1) {
      setSeenStories(new Set([...seenStories, stories[current].id])); // Update seen stories
      console.log('current before next', current);
      setCurrent(current + 1);
      progress.setValue(0);
    } else {
      close();
    }
  };

  const prev = () => {
    if (current > 0) {
      const newSeenStories = new Set(seenStories);
      newSeenStories.delete(stories[current].id); // Update seen stories
      setSeenStories(newSeenStories);
      console.log('current before prev', current);
      setCurrent(current - 1);
      progress.setValue(0);
    } else {
      close();
    }
  };

  const close = () => {
    progress.setValue(0);
    // navigation.goBack();
  };

  const play = () => {
    start();
  };

  useEffect(() => {
    if (holdAnimation) {
      progress.stopAnimation();
    } else {
      start();
    }
    return () => {
      console.log(seenStories, 'in cleanup');
    };
  }, [holdAnimation, load]);

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          {/* replace with cross icon */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => console.log('Add to Cart')}>
            <Text style={styles.closeButtonText}>x</Text>
          </TouchableOpacity>
          <Image source={{uri: userDetails.imgUrl}} style={styles.userImage} />
          <Text style={styles.username}>{userDetails.username}</Text>
        </View>

        {/* replace speaker icon */}
        <TouchableOpacity
          style={styles.speakerButton}
          onPress={() => console.log('Add to Cart')}>
          <Text style={styles.speakerButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* { progress bar container} */}
      <View style={styles.progressBarContainer}>
        {stories &&
          stories.map((story, index) => {
            return (
              <View style={styles.progressBar} key={index}>
                <Animated.View
                  style={[
                    styles.progressBarFill,
                    {
                      width:
                        current == index
                          ? progress.interpolate({
                              inputRange: [0, 1],
                              outputRange: ['0%', '100%'],
                            })
                          : seenStories.has(story.id)
                          ? '100%'
                          : '0%',
                    },
                  ]}
                />
              </View>
            );
          })}
      </View>

      {stories[current].type === 'video' ? (
        <Video
          source={{uri: stories[current].sourceUrl}}
          onReadyForDisplay={() => {
            setLoad(true);
            start();
          }}
          resizeMode="cover"
          paused={false}
          style={styles.video}
        />
      ) : (
        <Image
          source={{uri: stories[current].sourceUrl}}
          style={styles.image}
          onLoadEnd={() => {
            progress.setValue(0);
            start();
          }}
        />
      )}

      <View style={styles.navigationButtons}>
        <TouchableOpacity
          style={styles.navigationButton}
          onPress={() => prev()}
          onLongPress={() => setHoldAnimation(true)}
          onPressOut={() => setHoldAnimation(false)}
        />

        <TouchableOpacity
          style={styles.navigationButton}
          onPress={() => next()}
          onLongPress={() => setHoldAnimation(true)}
          onPressOut={() => setHoldAnimation(false)}
        />
      </View>

      <View style={styles.productsListContainer}>
        <Text style={styles.productsListHeader}>Shop the Product</Text>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.productsList}>
          {stories[current].productsList.map((item, index) => (
            <ProductCard key={item.id.toString()} data={item} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default StoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: 'grey',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    zIndex: 3,
    position: 'absolute',
    top: 0,
    paddingTop: 20,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 2,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 20,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    resizeMode: 'cover',
  },
  username: {
    fontSize: 16,
    marginLeft: 8,
    color: 'white',
    fontWeight: 'bold',
  },
  speakerButton: {
    backgroundColor: '#00000080',
    borderWidth: 2,
    borderColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 5,
  },
  speakerButtonText: {
    color: 'white',
    fontSize: 20,
  },
  progressBarContainer: {
    position: 'absolute',
    top: 4,
    height: '100%',
    width: '100%',
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    zIndex: 1,
    gap: 5,
  },
  progressBar: {
    flex: 1,
    backgroundColor: '#00000040',
    height: 3,
    borderRadius: 5,
  },
  progressBarFill: {
    height: 3,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  navigationButtons: {
    position: 'absolute',
    top: 0,
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 2,
  },
  navigationButton: {
    width: '40%',
    height: '100%',
  },
  productsListContainer: {
    width: '100%',
    zIndex: 3,
    position: 'absolute',
    bottom: 0,
    padding: 10,
  },
  productsListHeader: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productsList: {
    flexDirection: 'row',
    gap: 10,
    borderRadius: 10,
  },
});
