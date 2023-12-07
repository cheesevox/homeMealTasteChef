import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Ionicons } from "@expo/vector-icons";
import * as Icon from "react-native-feather";
import { useDispatch, useSelector } from "react-redux";
import { createOrderUser } from "../Api";
import Toast from "react-native-toast-message";

const OrderCartScreen = ({ navigation, route }) => {
  const { item } = route.params || {};
  const user = useSelector((state) => state.user.user);
  const [quantity, setQuantity] = useState(1);
  const [values, setValues] = useState({
    customerId: user.customerId,
    mealSessionId: item?.mealSessionId,
    quantity: quantity,
  });
  const createOrder = () => {
    createOrderUser({ ...values, quantity: quantity });
  };
  const increase = () => {
    if (quantity < item.remainQuantity) {
      setQuantity(quantity + 1);
    }
  };
  const decrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(0);
    }
  };
  const CartCard = ({ item }) => {
    return (
      <View style={styles.cartcard}>
        <View
          style={{
            height: 100,
            marginLeft: 10,
            paddingVertical: 20,
            flex: 1,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              source={{ uri: item?.mealDtoForMealSession?.image }}
              style={{ width: 50, height: 50, resizeMode: "cover" }}
            />
            <View
              style={{
                justifyContent: "center",
                flexDirection: "column",
                marginLeft: 20,
              }}
            >
              <Text style={styles.textItem}>
                {item?.mealDtoForMealSession?.name}
              </Text>
              <Text style={styles.textItem}>
                Description: {item?.mealDtoForMealSession.description}
              </Text>
              <Text>Remain quantiy : {item.remainQuantity}</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {/* <Text style={styles.textItem}>Price: {item.price}</Text> */}
              </View>
            </View>
          </View>
        </View>
        <View style={{ alignItems: "center" }}>
          <View style={styles.actionButton}>
            <TouchableOpacity onPress={() => increase()}>
              <Ionicons
                name="add-circle-outline"
                size={25}
                color={Colors.black}
              ></Ionicons>
            </TouchableOpacity>
            <Text
              style={{ fontWeight: "bold", fontSize: 18, textAlign: "center" }}
            >
              {quantity}
            </Text>
            <TouchableOpacity onPress={() => decrease()}>
              <Ionicons
                name="remove-circle-outline"
                size={25}
                color={Colors.black}
              ></Ionicons>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  // const handleCreateOrder = async () => {
  //   try {
  //     await createOrder();
  //     Toast.show({
  //       type: "success",
  //       text1: "Home Meal Taste",
  //       text2: "Create Order Successfully.",
  //     });
  //     navigation.navigate('CustomerHome', {user: user});
  //   } catch (error) {
  //     Toast.show({
  //       type: "error",
  //       text1: "Home Meal Taste",
  //       text2: "Add new failed.",
  //     });
  //   }
  // };

  return (
    <SafeAreaView style={{ backgroundColor: Colors.white, flex: 1 }}>
      <View
        style={{
          marginBottom: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.titleText}>Cart</Text>
      </View>
      <View style={{ padding: 30, backgroundColor: "#f7e4ad" }}>
        <TouchableOpacity
          style={{
            flexDirection: "row-reverse",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 18, color: "#de8407" }}>
            Change
          </Text>
          <Text style={{ fontSize: 16, marginLeft: 40 }}>
            Chef is prepare food for 30minus
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {item === undefined ? null : quantity === 0 ? (
          ""
        ) : (
          <CartCard item={item} />
        )}
      </ScrollView>
      <View>
        <View
          style={{
            width: "100%",
            backgroundColor: "#f7e4ad",
            borderTopLeftRadius: 36,
            borderTopRightRadius: 36,
            padding: 20,
            paddingTop: 30,
            display:
              item === undefined ? "none" : quantity === 0 ? "none" : "block",
          }}
        >
          {/* <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
              <Text>
                Subtotal
              </Text>
              <Text>
                {item.price}
              </Text>
            </View> */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              Order Total
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              {item?.price * quantity} vnd
            </Text>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => {
                // handleCreateOrder();
                createOrder()
                navigation.navigate("Order", {user: user});
              }}
              style={{
                backgroundColor: "#f96163",
                borderRadius: 29,
                paddingVertical: 18,
                marginTop: 30,
                width: "80%",
                alignItems: "center",
              }}
              disabled={quantity === 0}
            >
              <Text style={{ fontSize: 18, color: "#fff", fontWeight: "700" }}>
                Order This Meal
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textItem: {
    fontWeight: "bold",
    fontSize: 17,
  },

  header: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  cartcard: {
    height: 100,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
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
  actionButton: {
    width: 80,
    height: 30,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
  },
});
export default OrderCartScreen;
