import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Feed from '../screens/Feed';
import StoryScreen from '../screens/Feed/components/story/components/StoryScreen';

const Stack = createStackNavigator();

const FeedNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Feed"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Feed" component={Feed} />
      <Stack.Screen name="StoryScreen" component={StoryScreen} />
    </Stack.Navigator>
  );
};

export default FeedNavigator;
