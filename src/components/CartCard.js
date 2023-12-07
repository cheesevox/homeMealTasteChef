import { FlatList, StyleSheet, Text, View, Icon, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { imageorder } from '../Constant';
import { useNavigation } from "@react-navigation/native";

const CartCard = ({ item }) => {
  const navigation = useNavigation();
  console.log("item review",item)
  return (
    <View style={styles.cartcard}>
      <View style={{
        // paddingVertical: 20,
        alignItems:'center',
        justifyContent:'center',
        flex: 1
      }}>
        <View style={{ flexDirection: 'row', alignItems:'center',
        justifyContent:'center',}}>
          <Image style={{ width: 100, height: 100, borderRadius: 10, resizeMode: 'cover' }} source={{uri : item?.mealSessionDto2?.mealDto2?.image}} />
          <View style={{ flexDirection: 'column' , padding:15, justifyContent:'space-between'}}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
              {/* name order  */}
              {item?.mealSessionDto2?.mealDto2?.name}
            </Text>
            <Text>Price {item?.totalPrice}</Text>
            <Text>Date {item?.time}</Text>
            <Text>Quantity : {item?.quantity}</Text>
            <Text style={{
              padding:1,
              fontWeight:700,
              borderRadius:5,
              borderColor:'gray',
            }}>{item?.status}</Text>
          </View>
        </View>
      </View>
      <View style={{ marginRight: 20, alignItems: 'center',  padding: 10, borderRadius: 25, backgroundColor: '#79c989' }}>
        <View>
          {/* <TouchableOpacity onPress={()=>navigation.navigate("Feedback", { orderId: item?.orderId })}> */}
          <TouchableOpacity onPress={()=>navigation.navigate("Feedback", {item})}>

          <Text style={{ fontWeight: 'bold', fontSize: 18 , color:'white'}}>Review</Text>
          </TouchableOpacity>
        </View>
      </View>
   </View>
  );
};

export default CartCard;

const styles = StyleSheet.create({
  cartcard: {
    height: 150,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    marginVertical: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center'

  },
  actionButton: {
    width: 80,
    height: 30,
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center'
  }
});
