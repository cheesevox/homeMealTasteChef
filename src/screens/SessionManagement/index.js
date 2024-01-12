import React, { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  VirtualizedList,
} from "react-native";
import { EnumSessionStatus, RouteName, item, mealinsession } from "../../Constant";
import HeaderComp from "../HeaderComp";
import { Image } from "react-native";
import AddIcon from "../../components/Icons/AddIcon";
import { getAllMealInSessionID, getAllMealSessionByKitchen } from "../../Api";
import dayjs from "dayjs";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import MealSession from "../../MealSession";
import { useSelector } from "react-redux";
import DropDownPicker from "react-native-dropdown-picker";
import { Dropdown } from "react-native-element-dropdown";

const SessionManagement = (props) => {
  const { navigation, route } = props;
  const { session } = route.params;
  const {group} = route.params;
  // console.log("GROUPPPPPPPPPP", group)
  // console.log("SESSSIONNNNNNNNitemmmmmmmmm", session)
  const user = useSelector((state) => state.user.user);
  const kitchenId = user?.kitchenId
  const [tab, setTab] = useState('PROCESSING');
  const [sessionFilter, setsessionFilter] = useState();
  const [mealInSession, setMealInSession] = useState([]);
  const [activeMenu, setActiveMenu] = useState("PROCESSING");
  const [isFocus, setIsFocus] = useState(false);
  const [mealSession, setMealSession] = useState();
  const tabs = [
    {
      label: "Processing",
      value: "PROCESSING",
    },
    {
      label: "Approved",
      value: "APPROVED",
    },
    {
      label: "Rejected",
      value: "REJECTED",
    },
    {
      label: "Complete",
      value: "COMPLETE"
    },
    {
      label: "Cancel",
      value: "CANCEL"
    }
  ];

  const data = [
    {
      id: 0,
      nameMeal: "Meal 1",
      description: "description",
      price: 50000,
      quantity: 1,
      thubnail: undefined,
      status: "PROCESSING",
    },
    {
      id: 2,
      nameMeal: "Meal 2",
      description: "description",
      price: 50000,
      quantity: 1,
      thubnail: undefined,
      status: "PROCESSING",
    },
    {
      id: 3,
      nameMeal: "Meal 3",
      description: "description",
      price: 50000,
      quantity: 1,
      thubnail: undefined,
      status: "APPROVED",
    },
    {
      id: 4,
      nameMeal: "Meal 4",
      description: "description",
      price: 50000,
      quantity: 1,
      thubnail: undefined,
      status: "APPROVED",
    },
  ];

  const fetchAllMealSession = () => {
    getAllMealInSessionID(session.sessionId).then((res) => {
      console.log("sessionid",session.sessionId);
      console.log("in ra meall in sesssison", res);
      setMealInSession(res);
    });
  };
  useEffect(() => {
    fectAllMealSessionByKitchenId()
  }, [])
  
  const fectAllMealSessionByKitchenId = () => {
    getAllMealSessionByKitchen(user.kitchenId).then((res) => {
      setMealSession(res);
    });
    console.log("all meal session:", user.kitchenId);
  };

  // useEffect(() => {
  //   const sessions = data.filter((session) => session.status.includes(tab));
  //   console.log("TABBBBBBBBBBBB", tab)
  //   setsessionFilter(sessions);
  // }, [tab]);

  useEffect(() => {
    fetchAllMealSession();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchAllMealSession();
      console.log("Data refreshed!");
    });

    // Clean up the listener when the component is unmounted
    return unsubscribe;
  }, [navigation]);

  // const newData = mealInSession.filter((item)=>{
  //   console.log("new data",item)
  //   console.log("NEWWWWWWWWWWWWWWWWWwwww", item?.status?.toUpperCase().includes(tabs.value?.toUpperCase()))
  //   return  item?.status?.toUpperCase().includes(tabs.value?.toUpperCase())
  // })
  const [newData, setNewData] = useState([])
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const formatter = new Intl.DateTimeFormat('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const [selectedDate, setSelectedDate] = useState(dayjs().toDate())
  // const [newData, setNewData] = useState([])

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchAllMealSession();
      console.log("Data refreshed!");
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (tab !== undefined) {
      console.log("default tab la", tab);
      setNewData(
        mealInSession.filter((item) => {
          // Check for both date and status
          const isMatchingStatus = item.status.toUpperCase().includes(tab);

          // Check for kitchenId
          const isMatchingKitchenId = !kitchenId || item?.kitchenDtoForMealSession?.kitchenId === kitchenId;

          // Return true only if all conditions are met
          return isMatchingStatus && isMatchingKitchenId;
        })
      );
    }
  }, [tab, mealInSession, kitchenId]);

  const [selectedTab, setSelectedTab] = useState(tabs[0].id);

  const handleChangeTab = (itemValue) => {
    setSelectedTab(itemValue);
    // Additional logic to handle tab change
  };


  const renderItem = ({ item }) => {
    // console.log("itemmmmmmmmmmmmmmm", item?.value)
    console.log("TABbbbbbbbbbbbb", tab)
    return (
      <View
        style={{
          borderRadius: 12,
          backgroundColor: item.value === tab ? "#95e8bd" : "#FFE6A9",
          padding: 8,
          paddingHorizontal: 20,
          marginHorizontal: 15
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setTab(item.value);
            fetchAllMealSession()
          }}
        >
          <Text
            style={{
              // color: "#C1682D",
              color: item.status == tabs?.value ? "#C1682D" : "black",
              fontWeight: item.status == tabs?.value ? "bold" : "normal"
            }}
          >
            {item.label.toUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
// console.log("NEWWWWWWWWWWWWWWWWWDATTTTTTTT", newData)
  const renderSessionItem = ({ item }) => {
    return (
      <TouchableOpacity
        // onPress={() => navigation.navigate(RouteName.FORM_MEAL, {id : item.mealId })}
        onPress={() => {
          if (item.status === 'PROCESSING') {
            navigation.navigate(RouteName.FORM_MEAL, { id: item.mealId });
          }
        }}
        disabled={item.status !== 'PROCESSING'}
      >
        <View
          style={{
            borderRadius: 20,
            backgroundColor: "#ECC26D",
            marginBottom: 12,
            elevation: 5,
            paddingHorizontal: 12,
            paddingVertical: 6,
            gap: 12,
            flexDirection: "row",
          }}
        >
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 10,
            }}
            source={{ uri: item?.mealDtoForMealSession?.image }}
          />
          <View style={{ gap: 18, flex: 1, width: "100%" }}>
            <Text style={{ ...styles.text, fontSize: 16, textAlign: "center" }}>
              {item.mealDtoForMealSession?.name}
            </Text>
            <Text
              style={{ ...styles.text, fontSize: 12 }}
            >{`Description: ${item.mealDtoForMealSession?.description}`}</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Text
                style={{ ...styles.text, fontSize: 12 }}
              >{`Price: ${item.price}`}</Text>
              <Text
                style={{ ...styles.text, fontSize: 12 }}
              >{`Quantity: ${item.quantity}`}</Text>
            </View>
            <View
              style={{
                borderRadius: 20,
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <Text style={{ color: 'white' }}>Status :{item.status}</Text>
              <Text style={{ color: 'white' }}>Create Date :{item.createDate}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ height: "100%" }}>
      <HeaderComp
        isHasBackIcon={true}
        isHasBellIcon={false}
        isHasMessageIcon={false}
        label={session.sessionType}
        onBack={() => navigation.goBack()}
      />
      <View style={{
        alignItems: "center",
        marginVertical: 10,
        elevation: 5, borderRadius: 30,
        flexDirection: "row", justifyContent: "center"
      }}>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <View
          style={{
            padding: 2,
            borderRadius: 12,
            backgroundColor: "#EAC8C5",
            marginTop: 20,
            marginBottom: 20,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              display: "flex",
              backgroundColor: "white",
              borderRadius: 20,
              width: "100%",
              height: 70,
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
            }}
          >
            <View
              style={{
                width: "100%",
                borderRadius: 20,
              }}
            >
              <Dropdown
                containerStyle={{
                  borderRadius: 20,
                  width: "100%",
                  overflow: "hidden",
                  top: 15,
                }}
                data={tabs}
                labelField="label"
                valueField="value"
                searchPlaceholder="Search..."
                value={tab}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(value) => {
                  setTab(value?.value);
                  // router.refesh
                }}
              />
            </View>
          </View>
        </View>
        <View>
          <FlatList
            style={{ height: "83%" }}
            data={newData}
            key={item => item?.mealSessionId.toString()}
            renderItem={renderSessionItem}
          />
        </View>
      </View>
      <View
        style={{
          alignItems: "center",
          position: "absolute",
          bottom: 20,
          left: 0,
          right: 0,
        }}
      >
        <Pressable
          onPress={() => {
            navigation.navigate("AddMealSession", {
              session: session,
              group: group
            });
          }}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.5 : 1,
              backgroundColor: "#FFAB01",
              flexDirection: "row",
              paddingHorizontal: 24,
              paddingVertical: 8,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              gap: 4,
            },
          ]}
        >
          <Text
            style={{
              color: "#FFF",
              textAlign: "center",
            }}
          >
            {"Add more"}
          </Text>
          <AddIcon />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#FFF",
    fontWeight: "700",
  },
});

export default React.memo(SessionManagement);
