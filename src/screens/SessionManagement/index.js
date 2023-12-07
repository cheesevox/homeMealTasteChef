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
import { getAllMealInSessionID } from "../../Api";
import dayjs from "dayjs";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import MealSession from "../../MealSession";

const SessionManagement = (props) => {
  const { navigation, route } = props;
  const { session } = route.params;
  const [tab, setTab] = useState('PROCESSING');
  const [sessionFilter, setsessionFilter] = useState();
  const [mealInSession, setMealInSession] = useState([]);
  const [activeMenu, setActiveMenu] = useState("PROCESSING");
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
      console.log(session.sessionId);
      console.log("in ra meall in sesssison", res);
      setMealInSession(res);
    });
  };

  useEffect(() => {
    const sessions = data.filter((session) => session.status.includes(tab));
    console.log("TABBBBBBBBBBBB", tab)
    setsessionFilter(sessions);
  }, [tab]);

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

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const formatter = new Intl.DateTimeFormat('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const [selectedDate, setSelectedDate] = useState(dayjs().toDate())
  const [newData, setNewData] = useState([])
  const onChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      // Convert dayjs to Date
      const jsDate = selectedDate instanceof Date ? selectedDate : selectedDate.toDate();
      setSelectedDate(selectedDate);
      console.log(formatter.format(selectedDate));
    }
    setDate(formatter.format(jsDate))
  };


  const showDatePicker = () => {
    setShow(true);
  };
  // useEffect(() => {
  // 
  // if (selectedDate) {
  //   setNewData(
  //     newData.filter((item) => {
  //       // const orderFind = formatter.format(item.time).includes(formatter.format(selectedDate))
  //       // const formattedTime = dayjs(item.createDate).format("DD-MM-YYYY")
  //       console.log("formated time", [item.createDate.includes(formatter.format(selectedDate))])
  //       return item.createDate.includes(formatter.format(selectedDate))
  //     }
  //     ))
  //   setNewData(
  //     newData.filter((item)=>{
  //       crossOriginIsolated
  //     })
  //   )
  // }

  // }, [formatter.format(selectedDate), tab.value])

  useEffect(() => {
    console.log("selected date", formatter.format(selectedDate))
    if (selectedDate !== undefined && tab !== undefined) {
      console.log("default tab la",tab)
      setNewData(
        mealInSession.filter((item) => {
          // Assuming item.createDate is a string
          console.log("item", item)
          const formattedDate = formatter.format(selectedDate);
          return item.createDate.includes(formattedDate) && item.status.toUpperCase().includes(tab.toUpperCase());
        }))
      // if (tab) {
      //   setNewData(
      //     newData.filter((item) => {
      //       return item.status.toUpperCase().includes(tab.toUpperCase());
      //     })
      //   )
      // }
    }

  }, [selectedDate, tab, mealInSession]);

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
                flexDirection: 'row',
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

      <View style={{ alignItems: "center", 
      marginVertical:10,
      elevation:5, borderRadius: 30, 
      flexDirection: "row", justifyContent: "center" }}>
        <TouchableOpacity onPress={showDatePicker}>
          <Ionicons name="calendar-outline" size={22} />
        </TouchableOpacity>
        {show &&
          <DateTimePicker
            value={selectedDate}
            // Change to "time" for time picker
            display="default"
            onChange={onChange}
            style={{
              minWidth: 50,
              backgroundColor: 'black',
            }}
          />
        }<View
          style={{
            alignItems: "center", justifyContent: "center",
            width: '50%', height: 60, borderRadius: 20,
          }}>
          {formatter.format(selectedDate) && <Text style={{ fontSize: 22 }}>{formatter.format(selectedDate)}</Text>}
        </View>
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
          <VirtualizedList
            data={tabs}
            renderItem={renderItem}
            getItemCount={(data) => data.length}
            getItem={(data, index) => data[index]}
            keyExtractor={(item) => item.id}
            horizontal
          />
        </View>
        <View>
          <FlatList
            style={{ height: "83%" }}
            data={newData}
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
