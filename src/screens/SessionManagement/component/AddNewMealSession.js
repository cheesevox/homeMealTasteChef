import {
    View,
    Text,
    SafeAreaView,
    Image,
    TextInput,
    Button,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import HeaderComp from "../../HeaderComp";
  import { SelectList } from "react-native-dropdown-select-list";
  import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
  import { ChevronDown, Search } from "react-native-feather";
  import { createMealSession, getAllMealByKitchen } from "../../../Api";
  import { useSelector } from "react-redux";
  import { Input } from "react-native-elements";

  import Toast from "react-native-toast-message";
  export default function AddNewMealSession({ navigation, route }) {
    const { session } = route.params;
    const user = useSelector((state) => state.user.user);
    const [selected, setSelected] = useState();
    const [data, setData] = useState([]);
    const [meal, setMeal] = useState([]);
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [values, setValues] = useState({
      mealId: selected,
      sessionId: session.sessionId,
      price: 0,
      quantity: 1,
      kitchenId: user.kitchenId,
    });
    const fetchAllMealByKitchenId = () => {
      getAllMealByKitchen(user.kitchenId).then((res) => {
        console.log(res);
        let newArray = res.map((item) => {
          return { key: item.mealId, value: item.name };
        });
        setData(newArray);
        setMeal(res);
      });
    };
    const handleCreateMealSession = () => {
      createMealSession(values)
        .then(() => {
          Toast.show({
            type: "success",
            text1: "Home Meal Taste",
            text2: "Add new Successfully.",
          });
          navigation.goBack();
        })
        .catch((error) => {
          Toast.show({
            type: "error",
            text1: "Home Meal Taste",
            text2: "Add new failed.",
          });
        });
    };
    const MealSessionCard = ({ item }) => {
      console.log(item.image);
      return (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
            backgroundColor: "#ECC26D",
            borderRadius: 10,
            elevation: 5,
            marginVertical: 20,
          }}
        >
          <View>
            {/* <Text>Image</Text> */}
            <Image
              source={{ uri: item.image }}
              style={{ height: 200, width: 180, borderRadius: 10 }}
            />
          </View>
          <View
            style={{
              marginLeft: 10,
            }}
          >
            <Text>{item.name}</Text>
            {/* <Text>{item.description}</Text> */}
          </View>
        </View>
      );
    };
    useEffect(() => {
      fetchAllMealByKitchenId();
    }, [user?.userId]);
    useEffect(() => {
      // When the selected value changes, find the corresponding meal item
      const selectedMealItem = meal.find((item) => item.mealId === selected);
      setSelectedMeal(selectedMealItem ? selectedMealItem : null);
      console.log("selected là", selected);
    }, [selected, meal]);
    return (
      <SafeAreaView>
        <HeaderComp
          label={`${session.sessionType}`}
          onBack={() => {
            navigation.goBack();
          }}
        ></HeaderComp>
        <View style={{ padding: 10 }}>
          <SelectList
            setSelected={(value) => {
              setSelected(value);
              setValues({ ...values, mealId: value });
            }}
            data={data}
            search={false}
            boxStyles={{
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "black",
            }} //override default styles
            placeholder="Choose Meal"
          />
        </View>
        <View
          style={{
            padding: 10,
            marginVertical: 10,
          }}
        >
          {selectedMeal && (
            <View
              style={{
                position: "relative",
                height: "85%",
              }}
            >
              <MealSessionCard item={selectedMeal} />
              <TextInput
                placeholder="Price...VND"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-end",
                  padding: 10,
                  backgroundColor: "#ECC26D",
                  borderRadius: 10,
                  elevation: 5,
                  marginVertical: 20,
                  textDecorationLine: "none",
                  borderBottomWidth: 0,
                  borderColor: "transparent",
                }}
                underlineColorAndroid="transparent"
                onChangeText={(text) => setValues({ ...values, price: text })}
              />
              <TextInput
                placeholder="Quantity"
                keyboardType="numeric"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-end",
                  padding: 10,
                  backgroundColor: "#ECC26D",
                  borderRadius: 10,
                  elevation: 5,
                  marginVertical: 20,
                  textDecorationLine: "none",
                  borderBottomWidth: 0,
                  borderColor: "transparent",
                }}
                onChangeText={(text) => setValues({ ...values, quantity: text })}
              />
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: 100,
                  alignSelf: "center",
                }}
              >
                <Button
                  title="Save"
                  color="#ECC26D"
                  onPress={() => handleCreateMealSession()}
                ></Button>
              </View>
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }
  