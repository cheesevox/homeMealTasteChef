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
    fectAllOrderByMealSesssionId()
    console.log("valueeeeeeeeeeeeeeee", newStatus);
    if (newStatus === 'CANCELLED') {
      Toast.show({
        type: 'error',
        text1: 'Order Canceled',
        text2: 'Your order has been canceled.',
      });
    }else{
      Toast.show({
        type: 'success',
        text1: 'Order Success',
        text2: 'Your order has been done.',
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
    <View style={{ padding: 30, margin: 20, elevation: 5, borderRadius: 10, flexDirection: 'row', backgroundColor:'white' }}>
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
          source={{ uri: mealsesion?.mealDtoForMealSession?.image }}
          style={{
            width: '100%', height: '30%', resizeMode: 'cover',
            borderTopRightRadius: 30, borderTopLeftRadius: 30,
          }}
        />
        <Text style={{paddingHorizontal:20, fontSize: 22, fontWeight: 'bold', color: 'white' }}>Name : {mealsesion?.mealDtoForMealSession?.name}</Text>
        <Text style={{paddingHorizontal:20, fontSize: 16, fontWeight: 'bold', color: 'white' }}>Description : {mealsesion?.mealDtoForMealSession?.description}</Text>
        <Text style={{paddingHorizontal:20, fontSize: 16, fontWeight: 'bold', color: 'white' }}>Address : {mealsesion?.sessionDtoForMealSession?.areaDtoForMealSession?.areaName}</Text>
        <Text style={{paddingHorizontal:20, fontSize: 16, fontWeight: 'bold', color: 'white' }}>Slot: {mealsesion?.quantity}</Text>
        <Text style={{paddingHorizontal:20, fontSize: 16, fontWeight: 'bold', color: 'white' }}>Remain Slot: {mealsesion?.remainQuantity}</Text>
        <View style={{paddingHorizontal:20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingVertical: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Order MealSession :</Text>
          {order[0]?.status == 'PAID' && (
            <View style={{flexDirection:'row'}}>
              <TouchableOpacity
                style={{ elevation:5,
                  padding: 5, borderRadius: 10, 
                  marginHorizontal:20, 
                  backgroundColor:'#0fd196', 
                  flexDirection:"row",
                  justifyContent:'space-between',
                  width:70
                 }}
                onPress={() => onHandleCompletedOrder(item?.mealSessionId, 'DONE')}
              >
                <Text>DONE</Text> 
                <Ionicons  size={18} name='checkmark-circle-outline'/>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ elevation:5,
                  flexDirection:"row",
                  marginHorizontal:20, 
                  justifyContent:'space-between',
                  width:75,
                  padding: 5, borderRadius: 10,
                  backgroundColor:'#f0491f' }}
                onPress={() => onHandleCompletedOrder(item?.mealSessionId, 'CANCELLED')}
              >
                <Text>Cancel</Text>
                <Ionicons size={18} name='close-circle-outline' />
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