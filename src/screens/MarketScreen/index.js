import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, View, TouchableOpacity, Text } from "react-native";
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
  const [show, setShow] = useState(false);

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
  const renderItem = ({ item }) => {
    return <Session data={item} navigation={navigation} />;
  };

  // useEffect(() => {
  //   if (selectedDate) {
  //     setNewData(
  //       session.filter((item) => {
  //         const formattedTime = dayjs(item.endDate).format("DD-MM-YYYY")
  //         console.log("formated time", [item.endDate.includes(formatter.format(selectedDate))])
  //         return item.createDate.includes(formatter.format(selectedDate))
  //       }
  //       ))
  //   }
  // }, [formatter.format(selectedDate), session])
  return (
    <View>
      <HeaderComp label={"Area"} isHasBackIcon={false} />
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
        backgroundColor: "blue", flex: 9,
        margin: 15,
        borderRadius: 20,
        backgroundColor: "#FFD580",
        elevation: 5,
      }}>
      <FlatList
      data={session}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    paddingTop: 25,
    backgroundColor: "#FFF",
    height: '100%',
    flex: 3
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
