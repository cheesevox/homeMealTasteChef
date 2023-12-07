import React from "react";
import { Pressable, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import DishIcon from "../../components/Icons/DishIcon";
import MealIcon from "../../components/Icons/MealIcon";
import { RouteName } from "../../Constant";
import HeaderComp from "../../screens/HeaderComp";
import * as Icon from "react-native-feather";
import { rows } from "deprecated-react-native-prop-types/DeprecatedTextInputPropTypes";

const KitchenScreen = ({ navigation }) => {

  return (
    <View style={styles.container}>
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
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 20,
    backgroundColor: "#FFF",
    height: "100%",
    flex: 1,
    paddingTop:5
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
