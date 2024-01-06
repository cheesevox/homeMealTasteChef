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

const MarketScreen = ({ navigation }) => {
  const formatter = new Intl.DateTimeFormat('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const area = useSelector((state) => state.user.user?.areaId);
  const user = useSelector(state => state.user.user)
  const id = user?.areaId
  const [newData, setNewData] = useState([])
  const [session, setSession] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs().toDate())

  const fetchAllSessionByAreaId = (area) => {
    getAllSessionRegisterTrue().then((res) => {
      console.log("all session", res);
      setSession(res);
    });
  };
  useEffect(() => {
    fetchAllSessionByAreaId(area);
  }, []);

  const [value, setValue] = useState();
  const [isFocus, setIsFocus] = useState(false);
  const posts = [
    {
      id: 1,
      name: "Binh Tan Area",
      startTime: " Address 258 TOn Duc Thnag",
      endTime: "",
    },
  ];
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
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
              <Text
                style={{ ...styles.text, fontSize: 20, }}
              >
                {item?.sessionName}
              </Text>
              <Text style={{ color: 'white', fontWeight: "bold" }}>   -   </Text>

            </View>
            <View style={{ alignItems: "center", justifyContent: "center", padding: 5 }}>
              <Text
                style={{ ...styles.text, fontSize: 20, }}
              >
                {item?.sessionType}
              </Text>
            </View>
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
              >{`Start time: ${item?.startTime}`}</Text>
              <Text style={{ color: 'white', fontWeight: "bold" }}> - </Text>
              <Text
                style={{ ...styles.text, fontSize: 15 }}
              >{`End time: ${item?.endTime}`}</Text>
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
      <HeaderComp label={"Session"} isHasBackIcon={false} />
      <View style={styles.container}>
        <View style={{
          backgroundColor: "#FFF",
        }}>
        </View>
      </View>
      <View style={{
        flexDirection: "row", alignItems: "center",
        marginHorizontal: 40, justifyContent: "center",
        borderRadius: 30, elevation: 5, backgroundColor: '#00000000'
      }}>
      </View>
      <View style={{
        margin: 15,
        borderRadius: 20,
        elevation: 5,
        height: '100%'
      }}>
        <ScrollView>
          {session?.slice().reverse().map((item, index) => (
            <SessionItem key={index} item={item} />
          ))}
        </ScrollView>
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
