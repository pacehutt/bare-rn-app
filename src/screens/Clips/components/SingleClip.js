import {StyleSheet, View} from 'react-native';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import Video from 'react-native-video';

const SingleClip = forwardRef(
  ({id, url, currentIndex, visibleIndex}, parentRef) => {
    const videoRef = useRef();
    const [isPlaying, setIsPlaying] = useState(false);

    const paused = currentIndex !== visibleIndex;

    // useImperativeHandle(parentRef, () => {
    //   if (parentRef.current) {
    //     return {
    //       play: () => {
    //         console.log('play called');
    //         videoRef.current.seek(0);
    //         setIsPlaying(!isPlaying);
    //       },
    //       stop: () => {
    //         console.log('stop called');
    //         videoRef.current.pause();
    //         setIsPlaying(false);
    //       },
    //     };
    //   }
    // });

    return (
      <View style={styles.container}>
        <Video
          ref={videoRef}
          source={{uri: url}}
          resizeMode="cover"
          style={styles.video}
          paused={paused}
          repeat
          fullscreen
          onLoad={() => {
            console.log(id, 'loaded');
            // videoRef.current.seek(0);

            // setIsPlaying(true);
          }}
        />
      </View>
    );
  },
);

export default SingleClip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  video: {
    flex: 1,
  },
});
