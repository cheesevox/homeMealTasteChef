import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View, TouchableOpacity, Image, FlatList, ScrollView } from "react-native";
import DishIcon from "../../components/Icons/DishIcon";
import MealIcon from "../../components/Icons/MealIcon";
import { RouteName } from "../../Constant";
import HeaderComp from "../../screens/HeaderComp";
import * as Icon from "react-native-feather";
import { rows } from "deprecated-react-native-prop-types/DeprecatedTextInputPropTypes";
import { getAllDishByKitchenId, getAllMealByKitchen, getAllMealSessionByKitchen } from "../../Api";
import { useSelector } from "react-redux";

const KitchenScreen = ({ navigation }) => {
  // const user = useSelector(state => state.user.user)

  // const [mealSession, setMealSession] = useState([])
  // const fectAllMealSessionByKitchenId = () => {
  //   getAllMealSessionByKitchen(user.kitchenId).then((res) => {
  //     // console.log("Ress allmealsession by kitchen", res);
  //     setMealSession(res);
  //   });
    // console.log("all meal session:", user.kitchenId);
  // };


  // const [dish, setDish] = useState([])
  // const fectAllDishByKitchenId = () => {
  //   getAllDishByKitchenId(user.kitchenId).then((res) => {
  //     // console.log("Ress allmealsession by kitchen", res);
  //     setDish(res);
  //   });
  //   // console.log("all meal  dish:", user.kitchenId);
  // };
  

  // const [meal, setMeal] = useState([])
  // const fectAllMealByKitchenId= () => {
  //   getAllMealByKitchen(user.kitchenId).then((res) => {
  //     console.log("Ress meal by kitchen", res);
  //     setMeal(res);
  //   });
  //   // console.log("all meal  meal:", user.kitchenId);
  // };
  // useEffect(() => {
  //   fectAllDishByKitchenId()
  //   fectAllMealByKitchenId()
  //   fectAllMealSessionByKitchenId()
  // }, [])

  return (
    <ScrollView style={styles.container}>
      {/* <HeaderComp
        label={"Kitchen"}
        isHasBackIcon={false}
        isHasBellIcon={true}
        isHasMessageIcon={true}
      /> */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        {/* <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ justifyContent: "center", alignItems: "center", width: 40, height: 40, backgroundColor: 'orange', borderRadius: 28, marginTop: 42 }}
        >
          <Icon.ArrowLeft style={{ color: 'white' }} strokeWidth={3} />
        </TouchableOpacity> */}
        <Text style={{
          fontWeight: '600',
          fontSize: 24,
          textAlign: 'center',
          color: '#e65332',
          borderColor: 'white',
          backgroundColor: '#fab3a2',
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: 'bold',
          marginTop: 40,
          width: '40%',
          borderRadius: 20,
          borderWidth: 2
        }}>
          Kitchen
        </Text>
        {/* <TouchableOpacity
          style={{ justifyContent: "center", alignItems: "center", width: 40, height: 40, borderRadius: 28, marginTop: 42 }}
        >
          <Icon.CreditCard style={{}} strokeWidth={3} />
        </TouchableOpacity> */}
      </View>
      <View
        style={{
          paddingVertical: 36,
          paddingHorizontal: 18,
          gap: 36,
        }}
      >
        <Pressable
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.5 : 1,
            },
            styles.button,
          ]}
          onPress={() => {
            navigation.navigate(RouteName.DISH_MANAGEMENT);
          }}
        >
          <DishIcon />
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.buttonText}>{"Dish"}</Text>
            <Text style={styles.buttonText}>{"Let’s see your dish now"}</Text>
          </View>
        </Pressable>
        {/* <FlatList
          data={dish}
          horizontal={true} // Set this to render the list horizontally
          renderItem={({ item }) => (
            <View style={{ marginRight: 10 , borderWidth:1, padding:5, borderRadius:20}}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item?.name}</Text>
            </View>
          )}
        /> */}

        <Pressable
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.5 : 1,
            },
            styles.button,
          ]}
          onPress={() => {
            navigation.navigate(RouteName.MEAL_MANAGEMENT);
          }}
        >
          <MealIcon />
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.buttonText}>{"Meal "}</Text>
            <Text style={styles.buttonText}>{"Your meal ready now "}</Text>
          </View>
        </Pressable>

        {/* <FlatList
          data={meal}
          horizontal={true} // Set this to render the list horizontally
          renderItem={({ item }) => (
            <View style={{ marginRight: 10 , borderWidth:1, padding:5, borderRadius:20}}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item?.name}</Text>
            </View>
          )}
        /> */}

        <Pressable
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.5 : 1,
            },
            styles.button,
          ]}
          onPress={() => (navigation.navigate("MealSessionScreen"))
          }
        >
          <Image source={require("../../../assets/images/dining-table.png")}
            style={{ width: 80, height: 80, resizeMode: 'cover' }}
            resizeMethod="scale"
          />
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.buttonText}>{"Meal Session"}</Text>
            <Text style={styles.buttonText}>{"Your meal session now"}</Text>
          </View>
        </Pressable>
        
      </View>
      
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 20,
    backgroundColor: "#FFF",
    height: "100%",
    flex: 1,
    paddingTop: 5
  },
  titleHeaderContainer: {
    backgroundColor: "#EFE6DA",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    marginBottom: 30,
  },
  titleText: {
    color: "#E88C80",
    textAlign: "center",
    // fontFamily: "Poppins-Regular",
    fontSize: 20,
    fontWeight: "700",
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
    // fontFamily: "Poppins-Regular",
    fontSize: 20,
    fontWeight: "700",
  },
  button: {
    backgroundColor: "#FFAB01",
    borderRadius: 40,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    gap: 12,
    paddingVertical: 20,
    elevation: 5
  },
});

export default React.memo(KitchenScreen);
