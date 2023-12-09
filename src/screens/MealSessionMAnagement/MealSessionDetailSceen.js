import { StyleSheet, Text, View, Image, ScrollView, FlatList } from 'react-native'
import React from 'react'
import HeaderComp from '../HeaderComp';
import { useState, useEffect } from 'react';
import { getAllOrderByMealSessionId, getMealSessionById, login, postStatusOrderForCustomer } from '../../Api';
import { color } from 'react-native-elements/dist/helpers';
import { Touchable } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';
import { rows } from 'deprecated-react-native-prop-types/DeprecatedTextInputPropTypes';

const MealSessionDetailSceen = ({ navigation, route }) => {
  const item = route.params
  const [status, setStatus] = useState('');
  const [value, setValue] = useState({
    status: status
  })
  const [newStatus, setNewStatus] = useState([])
  console.log("mealsession : ", item?.mealSessionId)

  const onHandleCompletedOrder = (mealSessionId, newStatus) => {
    setStatus(newStatus);  // Assuming setValue is a state update function
    setValue({
      status: newStatus,
    });
    console.log("valueeeeeeeeeeeeeeee", newStatus);
    if (newStatus === 'CANCELLED') {
      Toast.show({
        type: 'error',
        text1: 'Order Canceled',
        text2: 'Your order has been canceled.',
      });
    }
    postStatusOrderForCustomer(mealSessionId, newStatus);  // Assuming status is defined elsewhere
  };
  const [order, setOrder] = useState([])
  const [mealsesion, setMealSession] = useState([])
  const fectAllOrderByMealSesssionId = () => {
    getAllOrderByMealSessionId(item?.mealSessionId).then((res) => {
      console.log("all order by mealsesison:", res);
      setOrder(res);
    });
  };
  const fectSingerMealSessionById = () => {
    getMealSessionById(item?.mealSessionId).then((res) => {
      // console.log("all infomation by mealsesison:", res);
      setMealSession(res);
    });
  };
  useEffect(() => {
    fectSingerMealSessionById()
  }, [item?.mealSessionId])

  useEffect(() => {
    fectAllOrderByMealSesssionId()
  }, [item?.mealSessionId])
  console.log("LOGGGGGGGGGGG ALL MEALSESS", mealsesion)
  console.log("LOGGGGGGGGGGG ALL ORder status", order)
  const renderItem = ({ item }) => (
    <View style={{ padding: 20, margin: 10, elevation: 5, borderRadius: 10, flexDirection: 'row' }}>
      <Image style={{ width: 100, height: 100, resizeMode: 'cover', borderRadius: 20 }} source={require("../../../assets/images/avatar.jpg")}></Image>
      <View style={{ marginHorizontal: 20 }}>
        <Text>Order ID: {item.orderId}</Text>
        <Text>Status: {item.status}</Text>
        <Text>Name Cusotmer: {item?.cutomerDtoGetAllOrderByMealSessionId?.name}</Text>
        <Text>Slot: {item.quantity}</Text>
        <Text>Total Price: {item.totalPrice}</Text>
      </View>
      {/* Add more details as needed */}
    </View>
  );

  console.log("LOGGGGGGG ORDER STATUS", order[0]?.status)
  return (
    <View style={{ flex: 1 }}>
      <HeaderComp label="Meal Detail" onBack={() => navigation.goBack()} />
      <View style={{
        flexDirection: "row", alignItems: "center",
        marginHorizontal: 40, marginVertical: 15, justifyContent: "center",
        borderRadius: 30, elevation: 5, backgroundColor: '#00000000'
      }}>
      </View>
      <View style={{
        flex: 1, backgroundColor: 'orange',
        borderTopRightRadius: 30, borderTopLeftRadius: 30,
        margin: 20
      }}>
        <Image
          source={{ uri: mealsesion?.mealDtoForMealSession?.image }}
          style={{
            width: '100%', height: '30%', resizeMode: 'cover',
            borderTopRightRadius: 30, borderTopLeftRadius: 30,
          }}
        />
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'white' }}>Name : {mealsesion?.mealDtoForMealSession?.name}</Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>Description : {mealsesion?.mealDtoForMealSession?.description}</Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>Address : {mealsesion?.sessionDtoForMealSession?.areaDtoForMealSession?.areaName}</Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>Slot: {mealsesion?.quantity}</Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>Remain Slot: {mealsesion?.remainQuantity}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingVertical: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Order MealSession :</Text>
          {order[0]?.status !== 'CANCELLED' && (
            <View style={{flexDirection:'row'}}>
              <TouchableOpacity
                style={{ borderWidth: 1, padding: 5, borderRadius: 10, marginHorizontal:20 }}
                onPress={() => onHandleCompletedOrder(item?.mealSessionId, 'DONE')}
              >
                <Text>DONE</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ borderWidth: 1, padding: 5, borderRadius: 10 }}
                onPress={() => onHandleCompletedOrder(item?.mealSessionId, 'CANCELLED')}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <FlatList
          data={order}
          keyExtractor={(item) => item.orderId.toString()}
          renderItem={renderItem}
        />
      </View>
    </View>
  )
}

export default MealSessionDetailSceen

const styles = StyleSheet.create({})