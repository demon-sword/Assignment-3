import React, {Component, useEffect, useState} from 'react';
import {
  Button,
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Image,
  ToastAndroid,
  Platform,
  AlertIOS,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {FlatList, State} from 'react-native-gesture-handler';
import useStore from './zustandStore';

function Loader() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator size="small" color="#0000ff" />
    </View>
  );
}
type itemType = {
  title: string;
  imageUrl: string;
  description: string;
  price: string;
  id: string;
};
const screen_width = Math.min(
  Dimensions.get('window').height,
  Dimensions.get('window').width,
);
const width_factor = screen_width / 390;
const styles = StyleSheet.create({
  square: {
    flex: 2,
    aspectRatio: 0.6,
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 10,
    width: Math.round(width_factor * 150),
    paddingTop: 10,
    margin: '2%',
    alignItems: 'center',
  },
  Text: {
    marginLeft: 10,
    marginRight: 10,
  },
});
const ItemForList = ({
  title,
  imageUrl,
  description,
  price,
  id,
}: itemType): JSX.Element => {
  const addInCart = useStore(state => state.addItems);
  return (
    <View style={styles.square}>
      <Image
        source={
          imageUrl ? {uri: imageUrl} : {uri: 'https://reactjs.org/logo-og.png'}
        }
        style={{width: '80%', height: '60%', borderRadius: 5}}
      />
      <Text numberOfLines={2} style={styles.Text}>
        {title}
      </Text>
      <Text numberOfLines={2} style={styles.Text}>
        {description}
      </Text>
      <Button
        title="Add to Cart"
        onPress={() => {
          const msg = 'Added to Cart';
          if (Platform.OS === 'android') {
            ToastAndroid.show(msg, ToastAndroid.SHORT);
          } else {
            AlertIOS.alert(msg);
          }
          addInCart({
            title: title,
            imageUrl: imageUrl,
            description: description,
            price: price,
            id: id,
          });
        }}
      />
    </View>
  );
};
interface forItems {
  title: string;
  imageUrl: string;
  description: string;
  price: string;
  id: string;
}
function HomeScreen(func: object): JSX.Element {
  const renderItem = ({item}) => (
    <ItemForList
      title={item.title}
      imageUrl={item.imageUrl}
      description={item.description}
      price={item.price}
      id={item.id}
    />
  );
  const [data1, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [offset, setOffset] = useState(0);
  const carLength = useStore(state => state.CartItems.length);
  const getDataFromServer = async (url: string) => {
    const response = await axios.get(url);
    let data: itemType[] = data1;
    for (let i = 0; i <= 9; i++) {
      if (!data.some(el => el.id === response.data.collections[i + ''].name)) {
        data.push({
          title: response.data.collections[i + ''].name,
          imageUrl: response.data.collections[i + ''].image_url,
          description: response.data.collections[i + ''].description,
          price: response.data.collections[i + ''].stats.average_price,
          id: response.data.collections[i + ''].name,
        });
      }
    }
    console.log(data);
    setData(data);
    setLoader(false);
    setOffset(offset + 10);
  };
  useEffect(() => {
    getDataFromServer(
      'https://api.opensea.io/api/v1/collections?offset=' +
        offset +
        '&limit=10',
    );
  }, []);
  let dataforHomeScreen;
  dataforHomeScreen = data1;
  if (loader) {
    return <Loader />;
  } else {
    return (
      <>
        <View
          style={{
            flex: 0.12,
            shadowColor: '#000000',
            shadowOpacity: 0.9,
            shadowOffset: {width: -2, height: 4},
            shadowRadius: 3,
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 10,
            backgroundColor: '#0ea5e9',
            elevation: 3,
            flexDirection: 'row',
          }}>
          <Image
            source={require('../Images/user.png')}
            style={{height: 40, width: 40, tintColor:'white'}}
          />
          <Text style={{fontSize:20, color: 'white'}}> Shop Name </Text>
          <TouchableOpacity
            onPress={() => func.reference.props.navigation.navigate('CartScr')}>
            <Image
              source={require('../Images/icons8-shopping-cart-ios-glyph/icons8-shopping-cart-90.png')}
              style={{
                width: 40,
                height: 40,
                aspectRatio: 1,
                tintColor: 'white',
                borderRadius: 10,
              }}
            />
            <Text>{carLength}</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 2, padding: 10}}>
          <FlatList
            data={dataforHomeScreen}
            renderItem={renderItem}
            numColumns={2}
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onEndReached={(info: {distanceFromEnd: number}) => {
              getDataFromServer(
                'https://api.opensea.io/api/v1/collections?offset=' +
                  offset +
                  '&limit=10',
              );
            }}
          />
        </View>
      </>
    );
  }
}
export default class Shop extends Component {
  render() {
    console.log(typeof this);
    return <HomeScreen reference={this} />;
  }
}
