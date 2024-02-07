import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import ProductCard from './ProductCard';

const ClipDetails = ({clipData}) => {
  const {data, productsList} = clipData;

  return (
    <View style={styles.container}>
      <View style={styles.accountContainer}>
        <Image
          source={{
            uri: data.imageUrl,
          }}
          resizeMode="cover"
          style={styles.accountImage}
        />
        <Text style={styles.accountName}>{data.username}</Text>
      </View>

      <Text style={styles.description}>{data.description}</Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.buttons]}
          onPress={() => console.log('Follow')}>
          <Text style={{...styles.buttonText, color: 'whitesmoke'}}>
            Follow
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttons]}
          onPress={() => console.log('15K')}>
          <Text style={styles.buttonText}>15K</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttons]}
          onPress={() => console.log('199+')}>
          <Text style={styles.buttonText}>199+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttons]}
          onPress={() => console.log('191M')}>
          <Text style={styles.buttonText}>191M</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.productsListContainer}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.productsList}>
          {productsList.map((item, index) => (
            <ProductCard key={item.id.toString()} data={item} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default ClipDetails;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    position: 'absolute',
    bottom: 15,
    gap: 20,
    paddingHorizontal: 15,
  },
  accountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 10,
  },
  accountImage: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },
  accountName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'whitesmoke',
  },
  description: {
    color: 'whitesmoke',
    fontSize: 16,
    lineHeight: 21.5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '98%',
    gap: 9,
  },
  buttons: {
    backgroundColor: '#2a2a2a27',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'whitesmoke',
    borderWidth: 1,
    padding: 7,
    borderRadius: 5,
    paddingHorizontal: 10,
    gap: 5,
  },
  buttonText: {
    fontSize: 14,
    color: 'whitesmoke', // Adjust as needed for spacing between icon and text
  },
  productsListContainer: {
    width: '100%',
  },
  productsList: {
    gap: 10,
    borderRadius: 10,
  },
});
