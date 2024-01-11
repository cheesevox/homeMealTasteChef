import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderComp from "../../HeaderComp";
import { SelectList } from "react-native-dropdown-select-list";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { ChevronDown, Search } from "react-native-feather";
import { createMealSession, getAllMealByKitchen, getAllSessionRegisterTrue } from "../../../Api";
import { useSelector } from "react-redux";
import { CheckBox, Input } from "react-native-elements";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

export default function AddNewMealSession({ navigation, route }) {
  const { session } = route.params;
  const { group } = route.params;
  const user = useSelector((state) => state.user.user);
  const [selected, setSelected] = useState();
  const [data, setData] = useState([]);
  const [meal, setMeal] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [values, setValues] = useState({
    mealId: selected,
    sessionIds: [],
    price: 0,
    quantity: 1,
    areaId: user?.areaId,
    kitchenId: user.kitchenId,
  });

  const fetchAllMealByKitchenId = () => {
    getAllMealByKitchen(user.kitchenId).then((res) => {
      console.log("all meal", res);
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
  const sendToApi = () => {
    // Here, you can implement the logic to send selectedSessionTypes to your API
    console.log('Selected Session Types:', selectedSessionTypes);
    // Add your API call logic here
  };
  const [isSelected, setSelection] = useState(false);
  const [isSelected1, setSelection1] = useState(false);

  const [selectedSessions, setSelectedSessions] = useState([]);

  // const handlePress = (sessionId) => {
  //   setValues((prevValues) => ({
  //     ...prevValues,
  //     currentSessionId: sessionId,
  //     sessionId: [...prevValues.sessionId, sessionId],
  //   }));
  //   setSelection(!isSelected);
  //   setSelection1(!isSelected1);
  // };

  const handlePress = (sessionId) => {
    setSelectedSessions((prevSelected) => {
      if (prevSelected.includes(sessionId)) {
        setValues((prevValues) => ({
          ...prevValues,
          // currentSessionId: sessionId,
          sessionIds: [...prevValues.sessionId, sessionId],
        }));
        return prevSelected.filter((id) => id !== sessionId);
      } else {
        setValues((prevValues) => ({
          ...prevValues,
          // currentSessionId: sessionId,
          sessionIds: [...prevValues.sessionId, sessionId],
        }));
        return [...prevSelected, sessionId];
      }
    });
  };

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
            <View style={{ justifyContent: 'center' }}>
              {group.sessions.map((session, index) => {
                if (session.sessionType === "Lunch") {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                      onPress={() => handlePress(session.sessionId)}
                    >
                      <CheckBox
                        checked={selectedSessions.includes(session.sessionId)}
                        onPress={() => handlePress(session.sessionId)}
                      />
                      <Text>{`Session Type: ${session.sessionType}`}</Text>
                    </TouchableOpacity>
                  );
                } else {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                      onPress={() => handlePress(session.sessionId)}
                    >
                      <CheckBox
                        checked={selectedSessions.includes(session.sessionId)}
                        onPress={() => handlePress(session.sessionId)}
                      />
                      <Text>{`Session Type: ${session.sessionType}`}</Text>
                    </TouchableOpacity>
                  );
                }
              })}
              <FlatList
                data={group.sessions}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={{ margin: 5 }}>
                  </View>
                )}
                horizontal={true}
              />
            </View>
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
