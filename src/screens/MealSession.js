import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Icon from "react-native-feather";
import { getAllMealSessionInDayApprove, getAllMealSessionWithStatus, getAllSessionByAreaId } from "../Api";
import MealSessionCard from "../components/MealSessionCard";
// import { err } from 'react-native-svg/lib/typescript/xml';
import FoodCard from "../components/FoodCard";

const MealSession = ({ navigation, route }) => {
  const { areaId } = route.params;
  console.log("meall session page : ", areaId);
  const [session, setSession] = useState([]);
  const [mealSession, setMealSession] = useState([]);
  const fetchAllSessionByAreaId = () => {
    getAllMealSessionInDayApprove().then((res) => {
      console.log("RESSSSSSSSSSSSSSSs", res)
      setMealSession(res)
    })
  };
  const filteredMealSession = mealSession.filter(
    (item) => item?.sessionDtoForMealSession?.areaDtoForMealSession?.areaId === areaId
  );
  useEffect(() => {
    fetchAllSessionByAreaId();
  }, [areaId]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchAllSessionByAreaId();
      console.log("Data refreshed!");
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 40,
              height: 40,
              backgroundColor: "orange",
              borderRadius: 28,
              marginTop: 42,
            }}
          >
            <Icon.ArrowLeft style={{ color: "white" }} strokeWidth={3} />
          </TouchableOpacity>
          <Text style={styles.Text}>Meal In Session</Text>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 40,
              height: 40,
              borderRadius: 28,
              marginTop: 42,
            }}
          >
            <Icon.CreditCard style={{}} strokeWidth={3} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.body}>
        <ScrollView style={{}}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {
              filteredMealSession?.map((item, index) => (
                <FoodCard item={item} key={index} />
              ))
            }
          </ScrollView>
        </ScrollView>
      </ScrollView>
      <View style={styles.footer}></View>
    </View>
  );
};

export default MealSession;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
  },
  body: {
    // backgroundColor: 'green',
    height: "75%",
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
    width: "50%",
    borderRadius: 20,
    borderWidth: 2,
    paddingVertical: 5,
  },
  // footer: {
  //     flex: 1,
  //     // backgroundColor: 'blue'
  // }
});
