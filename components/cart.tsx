import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet, Image, Button, TouchableOpacity} from 'react-native';
import useStore from './zustandStore';
import {StackActions} from 'react-navigation';

const styles = StyleSheet.create({
  square: {
    flex: 2,
    flexDirection: 'row',
    aspectRatio: 2.4,
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 10,
    width: '96%',
    paddingTop: 10,
    margin: '2%',
  },
  Text: {
    marginLeft: 10,
    marginRight: 10,
  },
  des: {
    flex: 2,
  },
});
const Item = ({title, imageUrl,description,price,quantity}) => (
  <>
    <View style={styles.square}>
      <Image
        source={
          imageUrl ? {uri: imageUrl} : {uri: 'https://reactjs.org/logo-og.png'}
        }
        style={{aspectRatio: 1, height: '90%', marginLeft: 10, borderRadius: 5}}
      />
      <View style={styles.des}>
        <Text style={styles.Text}>{title}</Text>
        <Text style={styles.Text} numberOfLines={2}>
          {description}
        </Text>
        <Text style={styles.Text}>{'Price:  ' + price}</Text>
        <Text style={styles.Text}>{'Quantity:  ' + quantity}</Text>
      </View>
    </View>
  </>
);
const renderItem = ({item}) => {
  console.log(item);
  return (
    <Item
      title={item.objectItem.title}
      imageUrl={item.objectItem.imageUrl}
      description={item.objectItem.description}
      price={item.objectItem.price}
      quantity={item.quantity}
    />
  );
};
const CartView = func => {
  const cartItems = useStore(state => state.CartItems);
  const popAction = StackActions.pop(1);
  console.log(cartItems);
  return (
    <>
      <View
        style={{
          flex: 0.05,
          alignItems: 'flex-start',
          padding: 10,
          backgroundColor: '#0ea5e9',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          onPress={() => func.reference.props.navigation.dispatch(popAction)}
          style={{marginTop: '1.5%'}}>
          <Image
            source={require('../Images/icons8-back-ios/icons8-back-100.png')}
            style={{
              width: 20,
              height: 20,
              aspectRatio: 1,
              tintColor: 'white',
            }}
          />
        </TouchableOpacity>
        <Text style={{fontSize: 20, marginLeft: '32%', color: 'white'}}> Cart Items</Text>
      </View>
      {cartItems.length != 0 ? (
        <View style={{flex: 1}}>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      ) : (
        <View
          style={{
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <Text>Nothing in the Cart</Text>
        </View>
      )}
    </>
  );
};
export default class Cart extends Component {
  render() {
    return <CartView reference={this} />;
  }
}
