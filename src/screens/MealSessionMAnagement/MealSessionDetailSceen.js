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
import { Ionicons } from '@expo/vector-icons';

const MealSessionDetailSceen = ({ navigation, route }) => {
  const tabs = [
    {
      label: "Meal Session Detail",
      value: "MEALSESSION"
    },
    {
      label: "Order",
      value: "ORDER"
    }
  ];
  const item = route.params
  const [status, setStatus] = useState('');
  const [value, setValue] = useState({
    status: status
  })
  const [newStatus, setNewStatus] = useState([])

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
    } else {
      Toast.show({
        type: 'success',
        text1: 'Order Success',
        text2: 'Your order has been done.',
      });
    }
    postStatusOrderForCustomer(mealSessionId, newStatus);
    fectSingerMealSessionById()
  };
  const [order, setOrder] = useState([])
  const [mealsesion, setMealSession] = useState([])
  const fectAllOrderByMealSesssionId = () => {
    getAllOrderByMealSessionId(item?.mealSessionId).then((res) => {
      setOrder(res);
    });
  };
  const fectSingerMealSessionById = () => {
    getMealSessionById(item?.mealSessionId).then((res) => {
      setMealSession(res);
    });
  };
  useEffect(() => {
    fectSingerMealSessionById()
  }, [item?.mealSessionId])

  useEffect(() => {
    const fetchData = () => {
      fectSingerMealSessionById();
      fectAllOrderByMealSesssionId()
      // console.log("Data refreshed!");
    };
    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, [navigation]);

  // console.log("ITEMMMMMMMMMMMMMM", mealsesion)

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fectSingerMealSessionById();
      // console.log("Data refreshed!");
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    fectAllOrderByMealSesssionId()
  }, [item?.mealSessionId])

  // console.log("LOGGGGGGGGGGG ALL MEALSESS", mealsesion)
  // console.log("LOGGGGGGGGGGG ALL MEALSESS MEALLLLLLLLLLLLLL ", item)
  // console.log("LOGGGGGGGGGGG ALL ORder status", order)

  const renderItem = ({ item }) => (
    <View style={{ padding: 30, margin: 20, elevation: 5, borderRadius: 10, flexDirection: 'row', backgroundColor: 'white' }}>
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
  // console.log("LOGGGGGGG ORDER STATUS", order[0]?.status)
  return (
    <View style={{ flex: 1 }}>
      <HeaderComp label="Meal Order" onBack={() => navigation.goBack()} />
      <View style={{
        flexDirection: "row", alignItems: "center",
        marginHorizontal: 30, marginVertical: 15, justifyContent: "center",
        borderRadius: 30, backgroundColor: '#00000000'
      }}>
      </View>
      <View style={{
        flex: 1, backgroundColor: 'orange',
        borderTopRightRadius: 30, borderTopLeftRadius: 30,
        margin: 20
      }}>
        <Image
          source={{ uri: mealsesion?.mealDtoForMealSessions?.image }}
          style={{
            width: '100%', height: '30%', resizeMode: 'cover',
            borderTopRightRadius: 30, borderTopLeftRadius: 30,
          }}
        />
        <Text style={{ paddingHorizontal: 20, fontSize: 22, fontWeight: 'bold', color: 'white' }}>Name : {mealsesion?.kitchenDtoForMealSessions?.name}</Text>
        <Text style={{ paddingHorizontal: 20, fontSize: 16, fontWeight: 'bold', color: 'white' }}>Description : {mealsesion?.mealDtoForMealSessions?.description}</Text>
        <Text style={{ paddingHorizontal: 20, fontSize: 16, fontWeight: 'bold', color: 'white' }}>Address : {mealsesion?.kitchenDtoForMealSessions?.address}</Text>
        <Text style={{ paddingHorizontal: 20, fontSize: 16, fontWeight: 'bold', color: 'white' }}>Slot: {mealsesion?.quantity}</Text>
        <Text style={{ paddingHorizontal: 20, fontSize: 16, fontWeight: 'bold', color: 'white' }}>Remain Slot: {mealsesion?.remainQuantity}</Text>
        <View style={{ paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingVertical: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', display: order[0]?.status === 'ACCEPTED' ? 'none' : 'flex' }}>MealSession Order:</Text>
          {order[0]?.status === 'PAID' ? (
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={{
                  elevation: 5,
                  padding: 10,
                  borderRadius: 10,
                  marginHorizontal: 20,
                  backgroundColor: 'green',
                  flexDirection: "row",
                  justifyContent: 'space-between',
                  width: 100,
                }}
                onPress={() => onHandleCompletedOrder(item?.mealSessionId, 'ACCEPTED')}
              >
                <Text style={{ color: 'white' }}>Accept</Text>
                <Ionicons size={20} color='white' name='checkmark-circle-outline' />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  elevation: 5,
                  flexDirection: "row",
                  marginHorizontal: 20,
                  justifyContent: 'center',
                  width: 100,
                  padding: 5,
                  borderRadius: 10,
                  alignItems: 'center',
                  backgroundColor: '#f0491f'
                }}
                onPress={() => onHandleCompletedOrder(item?.mealSessionId, 'CANCELLED')}
              >
                <Text style={{ color: 'white' }}>Cancel </Text>
                <Ionicons color='white' size={20} name='close-circle-outline' />
              </TouchableOpacity>
            </View>
          ) : null}
          {/* <Text style={{ fontSize: 16, fontWeight: 'bold', display: order[0]?.status === 'ACCETED' ? 'none' : 'flex' }}>MealSession :</Text> */}
          <Text style={{ fontSize: 16, fontWeight: 'bold', display: order[0]?.status === 'ACCEPTED' ? 'flex' : 'none' }}>MealSession :</Text>
          {order[0]?.status === 'ACCEPTED' ? (
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={{
                  elevation: 5,
                  padding: 10,
                  borderRadius: 10,
                  marginHorizontal: 20,
                  backgroundColor: 'green',
                  flexDirection: "row",
                  justifyContent: 'space-between',
                  width: 110,
                }}
                onPress={() => onHandleCompletedOrder()}
              >
                <Text style={{ color: 'white' }}>Ready </Text>
                <Ionicons size={20} color='white' name='checkmark-circle-outline' />
              </TouchableOpacity>
            </View>
          ) : null}
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