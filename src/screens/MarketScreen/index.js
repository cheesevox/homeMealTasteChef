import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, View, TouchableOpacity, Text, Pressable, ScrollView } from "react-native";
import Session from "./components/session";
import { Dropdown } from "react-native-element-dropdown";
import HeaderComp from "../HeaderComp";
import Area from "./components/area";
import { getAllDistrict, getAllSessionByAreaId, getAllSessionRegisterTrue, getAreaByDistrictId } from "../../Api";
import * as Icon from "react-native-feather";
import { useSelector } from "react-redux";
import session from "./components/session";
import dayjs from "dayjs";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import { item } from "../../Constant";

const MarketScreen = ({ navigation }) => {
  const formatter = new Intl.DateTimeFormat('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const area = useSelector((state) => state.user.user?.areaId);
  const user = useSelector(state => state.user.user)
  const id = user?.areaId
  const [newData, setNewData] = useState([])
  const [session, setSession] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs().toDate())
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const fetchAllSessionByAreaId = (area) => {
    getAllSessionRegisterTrue().then((res) => {
      // console.log("all session", res);
      setSession(res);
    });
  };

  useEffect(() => {
    fetchAllSessionByAreaId(area);
  }, []);

  const [value, setValue] = useState();
  const [isFocus, setIsFocus] = useState(false);
  // const posts = [
  //   {
  //     id: 1,
  //     name: "Binh Tan Area",
  //     startTime: " Address 258 TOn Duc Thnag",
  //     endTime: "",
  //   },
  // ];

  const futureSessions = session.filter(item => {
    const sessionEndDate = moment(item.endDate, 'DD-MM-YYYY');
    return sessionEndDate.isSameOrAfter(currentDate, 'day');
  });

  futureSessions.forEach(item => {
    console.log(`Create Date: ${item.createDate}, End Date: ${item.endDate}`);
  });
  const currentDate = moment();

  const SessionItem = ({ item }) => {
    console.log("itemmmmmmmmneeeeeeeeeeeeee", item)
    return (
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <Pressable
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.5 : 1,
              },
              styles.buttonStyle,
            ]}
            onPress={() => {
              navigation.navigate("SessionManagement", { session: item });
            }}
          >
            <View
              style={{
                justifyContent: "center",
                flexDirection: "column",
                paddingTop: 20,
                padding: 20,
                display: 'flex',
                flexDirection: 'row'
              }}
            >
              <Text
                style={{ ...styles.text, fontSize: 15 }}
              >{`Create Date: ${item?.createDate}`}</Text>
              <Text style={{ color: 'white', fontWeight: "bold" }}> - </Text>
              <Text
                style={{ ...styles.text, fontSize: 15 }}
              >{`End Date: ${item?.endDate}`}</Text>
            </View>
            <Text style={{ alignItems: "center", textAlign: "center", color: 'white', padding: 5, fontWeight: "bold" }} >{`Date Create: ${item?.createDate}`}</Text>
          </Pressable>
        </View>
      </View>
    );
  };
  const renderItem = ({ item }) => {
    return <SessionItem item={item} />;
  };
  
  return (
    <View>
      <HeaderComp label={"Maket Session"} isHasBackIcon={false} />
      <View style={{alignItems:"center"}}>
        <Text style={{fontSize:20, fontWeight:"bold"}}> Choosing Session Date</Text>
      </View>
      <View style={{
        margin: 15,
        borderRadius: 20,
        elevation: 5,
        height: '86%',
      }}>
        <View style={{paddingTop:10}}>
        <ScrollView>
          {futureSessions?.slice().reverse().map((item, index) => (
            <SessionItem key={index} item={item} />
          ))}
        </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    paddingTop: 25,
    backgroundColor: "#FFF",
    height: '80%',
    borderWidth: 1,
    borderRadius: 10,
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 10
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dropdown: {
    // elevation: 2,
    padding: 15,
    borderColor: 'grey',
    borderRadius: 10,
    borderWidth: 2,
    alignItems: "center",
    width: '80%',
    justifyContent: "center",
    marginVertical: 30,
  }
});

export default React.memo(MarketScreen);
