import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, View, TouchableOpacity, Text, Pressable, ScrollView } from "react-native";
import Session from "./components/session";
import { Dropdown } from "react-native-element-dropdown";
import HeaderComp from "../HeaderComp";
import Area from "./components/area";
import { getAllDistrict, getAllSessionByAreaId, getAllSessionByAreaIdWithStatusOPEN, getAllSessionRegisterTrue, getAreaByDistrictId } from "../../Api";
import * as Icon from "react-native-feather";
import { useSelector } from "react-redux";
import session from "./components/session";
import dayjs from "dayjs";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import { item } from "../../Constant";
import SessionList from "./SessionList";

const MarketScreen = ({ navigation }) => {
  const formatter = new Intl.DateTimeFormat('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const area = useSelector((state) => state.user.user?.areaId);
  const user = useSelector(state => state.user.user)
  const id = user?.areaId
  const [newData, setNewData] = useState([])
  const [session, setSession] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs().toDate())
  // const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const fetchAllSessionByAreaId = (id) => {
    getAllSessionByAreaIdWithStatusOPEN(id).then((res) => {
      // console.log("all session", res);
      setSession(res);
    });
  };

  console.log("SESSSSSSSSSION", session)
  useEffect(() => {
    fetchAllSessionByAreaId(area);
  }, []);

  const [value, setValue] = useState();
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    if (session) {
      const filteredSessions = session.filter(item => {
        const sessionEndDate = moment(item.createDate, 'DD-MM-YYYY');
        return sessionEndDate.isSameOrAfter(currentDate, 'day');
      });
      setFutureSessions(filteredSessions);
    }
  }, [session]);

  useEffect(() => {
    if (selectedDate) {
      setNewData(
        futureSessions.filter((item) => {
          // const orderFind = formatter.format(item.time).includes(formatter.format(selectedDate))
          console.log("formated time", [item.endDate.includes(formatter.format(selectedDate))])
          return item.endDate.includes(formatter.format(selectedDate))
        }
        ))
    }
  }, [formatter.format(selectedDate), futureSessions])

  const [futureSessions, setFutureSessions] = useState([]);
  const currentDate = formatter.format(moment());
  console.log("NEWWDATE Moment", currentDate);

  console.log("LISTTTTTTTTTTTTTTTt futureeeeeeeee", futureSessions)

  const onChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      // Convert dayjs to Date
      const jsDate = selectedDate instanceof Date ? selectedDate : selectedDate.toDate();
      setSelectedDate(selectedDate);
      console.log("dateeeeeeeeeeeeeeselect ", formatter.format(selectedDate));
    }
    setDate(formatter.format(jsDate))
  };

  const showDatePicker = () => {
    setShow(true);
  };


  return (
    <View>
      <HeaderComp label={"Maket Session"} isHasBackIcon={false} />
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}> Choossing Session Date</Text>
      </View>
      <View style={{
        flexDirection: "row", alignItems: "center",
        marginHorizontal: 40, marginVertical: 10, justifyContent: "center",
        borderRadius: 30, elevation: 5, backgroundColor: '#00000000'
      }}>
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
              backgroundColor: 'black'
            }}
          />
        }
        {/* <Text style={{ marginTop: 20 }}>Selected Date and Time: {date.toString()}</Text> */}
        <View
          style={{
            alignItems: "center", justifyContent: "center",
            width: '50%', height: 60, borderRadius: 20
          }}>
          {formatter.format(selectedDate) && <Text style={{ fontSize: 22 }}>{formatter.format(selectedDate)}</Text>}
        </View>
      </View>
      <View style={{
        margin: 15,
        borderRadius: 20,
        elevation: 5,
        // height: '86%',
      }}>
        <View style={{ paddingTop: 10 }}>
          {/* <ScrollView>
          {futureSessions?.slice().reverse().map((item, index) => (
            <SessionItem key={index} item={item} />
          ))}
        </ScrollView> */}
          <SessionList navigation={navigation} sessions={newData ? futureSessions : futureSessions} />
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
