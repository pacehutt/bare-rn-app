import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const screenWidth = Dimensions.get('window').width;
console.log(screenWidth, 'screenWidth');

const ProductCard = ({data}) => {
  return (
    <View style={styles.container} key={data.id}>
      <Image
        source={{
          uri: data.imageUrl,
        }}
        resizeMode="cover"
        style={styles.productImage}></Image>
      <View style={styles.productDetailsContainer}>
        <View style={styles.productDetails}>
          <Text style={styles.productTitle}>{data.title}</Text>
          <Text style={styles.productDescription}>
            {data.description.slice(0, 24) + '...'}
          </Text>
          <Text style={styles.productRatings}>
            {data.rating} ⭐⭐⭐⭐ ({data.reviewsCount})
          </Text>

          <Text style={styles.productPrice}>$ {data.price}</Text>
        </View>
        <TouchableOpacity
          style={styles.wishlistButton}
          onPress={() => console.log('Add to Cart')}>
          {/* place icon here */}
          <Text
            style={{
              color: 'black',
              fontSize: 20,
            }}>
            +
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 120,
    width: screenWidth - 50,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 0,
    gap: 12,

    borderRadius: 9,
  },
  productImage: {
    width: '27%',
    height: 100,
    borderRadius: 1,
  },
  productDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '71%',
  },
  productDetails: {
    gap: 3,

    width: '80%',
  },
  productTitle: {
    fontSize: 15,
    fontWeight: '400',
    color: 'black',
  },
  productDescription: {
    color: 'grey',
    fontSize: 13,
  },
  productRatings: {
    fontSize: 13,
    fontWeight: '400',
    color: 'black',
  },
  productPrice: {
    fontSize: 17,
    fontWeight: '500',
    marginTop: 13,
    color: 'black',
  },
  wishlistButton: {
    backgroundColor: '#2a2a2a27',

    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
