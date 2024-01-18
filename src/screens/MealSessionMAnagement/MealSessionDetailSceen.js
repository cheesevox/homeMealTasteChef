import { StyleSheet, Text, View, Image, ScrollView, FlatList } from 'react-native'
import React from 'react'
import HeaderComp from '../HeaderComp';
import { useState, useEffect } from 'react';
import { UpdateMealSessionStatus, getAllOrderByMealSessionId, getMealSessionById, login, postStatusOrder, postStatusOrderForCustomer } from '../../Api';
import { color } from 'react-native-elements/dist/helpers';
import { Touchable } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';
import { rows } from 'deprecated-react-native-prop-types/DeprecatedTextInputPropTypes';
import { Ionicons } from '@expo/vector-icons';
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Dropdown } from 'react-native-element-dropdown';

const MealSessionDetailSceen = ({ navigation, route }) => {
  const [tab, setTab] = useState('READY');
  const tabs = [
    { label: 'Ready', value: 'READY' },
    { label: 'Complete', value: 'COMPLETE' },
    { label: 'Not eat', value: 'NOTEAT' },
  ];
  const [isFocus, setIsFocus] = useState(false);

  const item = route.params
  const [status, setStatus] = useState('');
  const [statusOrder, setStatusOrder] = useState('');
  const [value, setValue] = useState({
    status: status
  })
  const [valueOrder, setValueOrder] = useState({
    status: status
  });
  const [mealValue, setMealValue] = useState({
    mealSessionIds: [], 
    status: "CANCELLED",
  });
  const [newStatus, setNewStatus] = useState([])

  const onHandleCompletedOrder = (mealSessionId, newStatus) => {
    setStatus(newStatus);  
    setValue({
      status: newStatus,
    });
    console.log("valueeeeeeeeeeeeeeee", newStatus);
    if (newStatus === 'CANCELLED') {
      Toast.show({
        type: 'error',
        text1: 'Order Cancelled',
        text2: 'Your order has been cancelled.',
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
  const onHandleCancelMealSession = (mealSessionId) => {
    setMealValue(mealSessionId => ({
      mealSessionIds: [mealSessionId],
      status: "CANCELLED"
    }));
    if (newStatus === 'CANCELLED') {
      Toast.show({
        type: 'error',
        text1: 'Order Cancelled',
        text2: 'Your order has been cancelled.',
      });
    }
    UpdateMealSessionStatus(mealValue);
    fectSingerMealSessionById()
  };
  const onHandleOrderStatus = (orderId, newStatus) => {
    setStatusOrder(newStatus);  // Assuming setValue is a state update function
    setValueOrder({
      status: newStatus,
    });
    console.log("valueeeeeeeeeeeeeeee", newStatus);
    if (newStatus === 'NOTEAT') {
      Toast.show({
        type: 'error',
        text1: 'Order Cancelled',
        text2: 'Your order has been cancelled.',
      });
    } else {
      Toast.show({
        type: 'success',
        text1: 'Order Success',
        text2: 'Your order has been done.',
      });
    }
    postStatusOrder(orderId, newStatus);
    fectAllOrderByMealSesssionId()
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
      // console.log("MNEALLLLLLLLLLLLLLLLLL", res)
      setMealSession(res);
    });
  };
  useEffect(() => {
    fectSingerMealSessionById()
  }, [item?.mealSessionId])

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fectSingerMealSessionById();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    fectAllOrderByMealSesssionId()
  }, [item?.mealSessionId])

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Meal Session" },
    { key: "second", title: "Order Meal" },
  ]);

  const FirstRoute = () => (
    <View
      style={{
        backgroundColor: "orange",
        height: "100%",
        padding: 10,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
      }}
    >
      <View
        style={{
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 26,
          }}
        >
          Meal Session Detail
        </Text>
        <Text style={{ paddingHorizontal: 20, fontSize: 22, fontWeight: 'bold' }}>Kitchen Name : {mealsesion?.kitchenDtoForMealSessions?.name}</Text>
        <Text style={{ paddingHorizontal: 20, fontSize: 18, fontWeight: 'bold' }}>Description : {mealsesion?.mealDtoForMealSessions?.description}</Text>
        <Text style={{ paddingHorizontal: 20, fontSize: 18, fontWeight: 'bold' }}>Slot: {mealsesion?.quantity}</Text>
        <Text style={{ paddingHorizontal: 20, fontSize: 18, fontWeight: 'bold' }}>Remain Slot: {mealsesion?.remainQuantity}</Text>
        <Text style={{ paddingHorizontal: 20, fontSize: 18, fontWeight: 'bold' }}>Price: {mealsesion?.price} vnd</Text>
        <Text style={{ paddingHorizontal: 20, fontSize: 18, fontWeight: 'bold' }}>Session: {mealsesion?.sessionDtoForMealSessions?.sessionName}</Text>
        <Text style={{ paddingHorizontal: 20, fontSize: 18, fontWeight: 'bold' }}>Meal: {mealsesion?.mealDtoForMealSessions?.name}</Text>
        <Text style={{ paddingHorizontal: 20, fontSize: 18, fontWeight: 'bold' }}>Status: {mealsesion?.status}</Text>
        <Text style={{ paddingHorizontal: 20, fontSize: 18, fontWeight: 'bold' }}>Create Date: {mealsesion?.createDate}</Text>
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: 'row',
          justifyContent: 'space-around'
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#30be25",
            borderRadius: 18,
            justifyContent: "center",
            paddingVertical: 18,
            width: "40%",
            top: 100,
            alignItems: "center",
            display: mealsesion?.status === 'PROCESSING' ? 'flex' : 'none'
          }}
        >
          <Text style={{ fontSize: 18, color: "#fff", fontWeight: "700" }}>
            Update Meal
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#f96163",
            borderRadius: 18,
            justifyContent: "center",
            paddingVertical: 18,
            width: "40%",
            top: 100,
            alignItems: "center",
            display: mealsesion?.status !== 'CANCELLED' ? 'flex' : 'none',
          }}
          onPress={() => onHandleCancelMealSession(item?.mealSessionId)}
        >
          <Text style={{ fontSize: 18, color: "#fff", fontWeight: "700" }}>
            Cancel Meal
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  const SecondRoute = () => (
    <View
      style={{
        backgroundColor: "orange",
        height: "100%",
        padding: 10,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 26,
          }}
        >
          Order Of Meal Session
        </Text>
      </View>
      <View style={{ paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingVertical: 10, backgroundColor: 'white', borderRadius: 20, display: order[0]?.status === 'PAID' ? 'flex' : 'none' }}>
        {order[0]?.status === 'PAID' ? (
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', alignItems: 'center', top: 10 }}>Order:</Text>
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
      </View>
      <View style={{
        paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around',
        paddingVertical: 10, backgroundColor: 'white', borderRadius: 20,
        display: mealsesion?.status === 'MAKING' ? 'flex' : 'none'
      }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Confirm :</Text>
        {order[0]?.status === 'ACCEPTED' ? (
          <View style={{ flexDirection: 'row', right: 50 }}>
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
              onPress={() => onHandleCompletedOrder(item?.mealSessionId, 'READY')}
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
  );
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const renderItem = ({ item }) => (
    <View style={{ padding: 40, margin: 20, elevation: 5, borderRadius: 10, flexDirection: 'row', backgroundColor: 'white' }}>
      <Image style={{ width: 100, height: 100, resizeMode: 'cover', borderRadius: 20, padding: 40 }}
        source={require("../../../assets/images/avatar.jpg")}></Image>
      <View style={{ marginHorizontal: 5, }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text>Order ID: {item.orderId}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Cusotmer: {item?.cutomerDtoGetAllOrderByMealSessionId?.name}</Text>
            <Text>Slot: {item.quantity}</Text>
            <Text>Total Price: {item.totalPrice}</Text>
          </View>
          <View>
            {item.status === 'READY' && (
              <>
                <TouchableOpacity
                  style={{
                    elevation: 5,
                    padding: 10,
                    borderRadius: 10,
                    marginHorizontal: 20,
                    backgroundColor: 'green',
                    flexDirection: "row",
                    justifyContent: 'space-between',
                    width: 115,
                    margin: 10
                  }}
                  onPress={() => onHandleOrderStatus(item?.orderId, 'COMPLETED')}
                >
                  <Text style={{ color: 'white' }}>COMPLETE </Text>
                  <Ionicons size={20} color='white' name='checkmark-circle-outline' />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    elevation: 5,
                    padding: 10,
                    borderRadius: 10,
                    marginHorizontal: 20,
                    backgroundColor: 'red',
                    flexDirection: "row",
                    justifyContent: 'space-between',
                    width: 90,
                  }}
                  onPress={() => onHandleOrderStatus(item?.orderId, 'NOTEAT')}
                >
                  <Text style={{ color: 'white' }}>NOT EAT </Text>
                  <Ionicons size={20} color='white' name='checkmark-circle-outline' />
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </View>
      <View style={{ width: "100%" }}>
        {/* <Dropdown
          containerStyle={{
            borderRadius: 20,
            width: '100%',
            overflow: 'hidden',
            borderRadius:20,
          }}
          data={tabs}
          labelField="label"
          valueField="value"
          searchPlaceholder="Search..."
          value={tab}
          onChange={(value) =>{
            setTab(value?.value)

          } }
        /> */}

      </View>

    </View>
  );
  return (
    <View style={{ flex: 1 }}>
      <HeaderComp label="Meal Order" onBack={() => navigation.goBack()} />
      <View style={{
        flex: 1,
        borderTopRightRadius: 30, borderTopLeftRadius: 30,
        marginHorizontal: 20
      }}>
        <Image
          source={{ uri: mealsesion?.mealDtoForMealSessions?.image }}
          style={{
            width: '100', height: '100%', resizeMode: 'cover',
            borderTopRightRadius: 30, borderTopLeftRadius: 30,
          }}
        />
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: "100%" }}
        tabBarOptions={{
          activeTintColor: "white", // Change this to your desired color
          tabBarStyle: { backgroundColor: "black" }, // Change this to your desired background color
        }}
        sceneContainerStyle={{ backgroundColor: "white" }} // Change this to your desired color
        style={{
          flex: 3,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          marginHorizontal: 10,
          marginBottom: 10
        }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            style={{ backgroundColor: "white" }}
            labelStyle={{ color: "black" }}
          />
        )}
      />
    </View>
  )
}

export default MealSessionDetailSceen

const styles = StyleSheet.create({})