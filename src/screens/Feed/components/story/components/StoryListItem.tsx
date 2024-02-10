import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {TouchableOpacity, Text, Image, View, StyleSheet} from 'react-native';

type ParamList = {
  StoryScreen: {
    storyItem: any;
    userDetails: {
      username: string;
      imgUrl: any;
    };
  };
};

const StoryListItem = ({
  username,
  imgUrl,
  id,
  storyItem,
}: {
  username: string;
  imgUrl: any;
  id: string;
  storyItem: any;
}) => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'StoryScreen'>>();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('StoryScreen', {
          storyItem,
          userDetails: {username, imgUrl},
        });
      }}
      style={styles.container}>
      <>
        <View style={styles.imageContainer}>
          <View style={styles.imageBorder}>
            <Image
              style={styles.image}
              source={{
                uri: imgUrl,
              }}
            />
          </View>
        </View>
        <Text style={styles.username}>{username}</Text>
      </>
    </TouchableOpacity>
  );
};

export default StoryListItem;

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
    alignItems: 'center',
    zIndex: 100,
  },
  imageContainer: {
    marginRight: 5,
  },
  imageBorder: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
    height: 75,
    borderRadius: 39,
    borderWidth: 2,
    borderColor: '#0be09480',
  },
  image: {
    width: 68,
    height: 68,
    borderRadius: 34,
    position: 'absolute',
    resizeMode: 'cover',
  },
  username: {
    color: 'black',
    fontSize: 11,
    marginTop: 5,
  },
});
