import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState, useRef, useCallback } from "react";
import * as Icon from "react-native-feather";
import CartCard from "../components/CartCard";
import { getAllOrderByCutomerId } from "../Api";
import { useSelector } from "react-redux";

const OrderScreen = ({ navigation }) => {
  const [order, setOrder] = useState([]);
  // const [activeMenu, setActiveMenu] = useState("Order");

  const user = useSelector((state) => state.user.user);

  const fectOrderByCustomerId = () => {
    console.log("Fetching order data...");
    getAllOrderByCutomerId(user.userId).then((res) => {
      console.log("Ress order by cutoer", res);
      setOrder(res);
    });
    console.log("111111111111111:", user.userId);
  };

  useEffect(() => {
    fectOrderByCustomerId();
  }, []);


  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fectOrderByCustomerId();
      console.log("Data refreshed!");
    });
    return unsubscribe;
  }, [navigation,user]);
  
  const CartCard = ({item}) =>{
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
  }
  return (
    <View style={styles.container}>
      <View style={styles.headder}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 12,
          }}
        >
          <Text style={styles.Text}>User Order</Text>
        </View>
      </View>
      <View style={styles.secsion1}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            padding: 5,
            backgroundColor: " white",
          }}
        >
          <TouchableOpacity
            style={{
              borderRadius: 5,
            }}
            // onPress={() => setActiveMenu("Order")}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                textDecorationLine: "underline",
                // color: activeMenu == "Order" ? "green" : "#9ea3b0",
              }}
            >
              Order History
            </Text>
          </TouchableOpacity>
{/* 
          <TouchableOpacity
            style={{
              borderRadius: 5,
            }}
            // onPress={() => setActiveMenu("FeedBack")}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                textDecorationLine: "underline",
                // color: activeMenu == "FeedBack" ? "green" : "#9ea3b0",
              }}
            >
              Re-Charge History
            </Text>
          </TouchableOpacity> */}
        </View>
      </View>
      <View style={styles.body}>
        <ScrollView
        >
          {order?.slice()?.reverse()?.map((item) => (
            <CartCard key={item.orderId} item={item} />
          ))}
        </ScrollView>
      </View>
      <View style={styles.footer}></View>
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 4,
    marginTop: 10,
  },
  headder: {
    flex: 1,
  },
  secsion1: {
    flex: 0.4,
  },
  body: {
    flex: 6,
    display: "flex",
  },

  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  textItem: {
    fontWeight: "bold",
    fontSize: 17,
  },

  header: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    flex: 1,
  },
  walletText: {
    fontWeight: "600",
    justifyContent: "center",
    fontSize: 26,
    alignContent: "center",
    textAlign: "center",
    color: "#e65332",
    borderColor: "white",
    backgroundColor: "#fab3a2",
    fontWeight: "bold",
    marginTop: 40,
    width: "40%",
    borderRadius: 20,
    borderWidth: 2,
  },
  Text: {
    fontWeight: "600",
    fontSize: 24,
    textAlign: "center",
    color: "#e65332",
    borderColor: "white",
    backgroundColor: "#fab3a2",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    marginTop: 40,
    width: "40%",
    borderRadius: 20,
    borderWidth: 2,
  },
});
