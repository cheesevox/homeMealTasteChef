import React from "react";
import { Image, Pressable, StyleSheet, Text, View,Alert } from "react-native";
import { RouteName } from "../../../Constant";
import { deleteDishByDishId } from "../../../Api";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { onHandleRefresh } from "../../../../slices/mealSlice";

const Dish = (props) => {
  const { data, navigation } = props;
  console.log("dataaaaaaaaa", data?.dishId)
  const dispatch = useDispatch();
  console.log("itemmmmmmmmm", data)
  const refresh = useSelector((state)=>state.meal.refresh)
  console.log("refresh index.js la",refresh?.refresh)

  const handleDelete = (id) => {
  console.log("IDDDDDDDDDDDD",id)
    deleteDishByDishId(data?.dishId)
      .then((res) => {
        navigation.navigate(RouteName.DISH_MANAGEMENT)
        dispatch(onHandleRefresh());
        console.log("Delete dish successfully.")
      Toast.show({
        type: 'error',
        text1: 'Meal Remove',
        text2: 'Your order has been canceled.',
      });
      navigation.navigate("DishManagement")
    })
      .catch((error) => {
        console.log("ERRROR", error)
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Error',
          text2: 'Failed to delete dish. Please try again.',
          visibilityTime: 3000,
          autoHide: true,
        });
      }
      );
  };
  const createTwoButtonAlert = () =>
  Alert.alert('Confirm Delete', 'Are you sure to delete this dish', [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'OK', onPress: () => handleDelete()},
  ]);
  return (
    <View style={styles.container}>
      <View
        style={{
          borderRadius: 12,
        }}
      >
        <Image
          source={{ uri: data?.image }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
          }}
          resizeMode="cover"
        />
      </View>
      <View
        style={{ flex: 1, paddingLeft: 10, gap: 4, justifyContent: "center" }}
      >
        <Text style={styles.nameText}>{data?.name}</Text>
        <Text
          style={{ ...styles.nameText, fontSize: 12 }}
        >{`Type: ${data?.dishTypeResponse.name}`}</Text>
      </View>
      <View
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          flexDirection: "row",
          gap: 4,
        }}
      >
        <Pressable
          onPress={() => {
            navigation.navigate(RouteName.FORM_DISH, {
              id: data,
            });
          }}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.5 : 1,
              backgroundColor: "#FFF",
            },
            styles.buttonStyle,
          ]}
        >
          <Text
            style={
              ({
                color: "#FFF",
              },
                styles.buttonText)
            }
          >
            {"Edit"}
          </Text>
        </Pressable>
        <Pressable
          onPress={() =>  createTwoButtonAlert()}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.5 : 1,
              backgroundColor: "#E64B17",
            },
            styles.buttonStyle,
          ]}
        >
          <Text
            style={{
              color: "white",
              ...styles.buttonText,
            }}
          >
            {"Remove"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffd580",
    flexDirection: "row",
    marginVertical: 10,
    borderRadius: 20,
    padding: 12,
  },
  nameText: {
    color: "#000",
    // fontFamily: "Poppins",
    fontSize: 14,
    fontWeight: "800",
  },
  buttonStyle: {
    borderRadius: 12,
  },
  buttonText: {
    textAlign: "center",
    // fontFamily: "Poppins",
    fontSize: 11,
    fontWeight: "400",
    padding: 10,
  },
});

export default React.memo(Dish);
