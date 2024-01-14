import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { getAllMealSessionByKitchen } from '../../Api';
import HeaderComp from '../HeaderComp';
import dayjs from "dayjs";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';

const MealSessionScreen = ({ navigation }) => {
  // fetchAllMealSession
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [newData, setNewData] = useState([])
  const formatter = new Intl.DateTimeFormat('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' });
  console.log(formatter.format(dayjs()))
  const [selectedDate, setSelectedDate] = useState(dayjs().toDate())

  const user = useSelector(state => state.user.user)
  const [mealSession, setMealSession] = useState([])
  const fectAllMealSessionByKitchenId = () => {
    getAllMealSessionByKitchen(user.kitchenId).then((res) => {
      // console.log("Ress allmealsession by kitchen", res);
      setMealSession(res);
    });
    console.log("all meal session:", user.kitchenId);
  };

  const onChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      // Convert dayjs to Date
      // const jsDate = selectedDate instanceof Date ? selectedDate : selectedDate.toDate();
      setSelectedDate(selectedDate);
      // console.log(formatter.format(selectedDate));
    }
    setDate(formatter.format(selectedDate))
  };


  const showDatePicker = () => {
    setShow(true);
  };
  const fetchAllMealInSession = async () => {
    console.log(formatter.format(selectedDate))
    console.log("meal sesison", mealSession)
    mealSession.filter((item) => item.createDate.includes(formatter.format(selectedDate))
    )
  }
  useEffect(() => {
    fectAllMealSessionByKitchenId()
  }, [])
  
  useEffect(() => {
    console.log("hehehehe", formatter.format(selectedDate))
    console.log("mealsession", mealSession)
    // console.log("mealsessionnnnnnnnnnnnnn", mealSession?.mealSessionId)
    setNewData(mealSession.filter((item) => item.createDate.includes(formatter.format(selectedDate))));
  }, []);

  useEffect(() => {
    if (mealSession.length > 0 && selectedDate) {
      const filteredData = mealSession.filter((item) => item.createDate.includes(formatter.format(selectedDate)));
      setNewData(filteredData);
    }
  }, [selectedDate, mealSession])

  const filteredData = mealSession.filter((item) =>
    item.createDate.includes(formatter.format(selectedDate))
  );

  // console.log("Filtered mealsession", filteredData);
  // const mealSessionId = filteredData.length > 0 ? filteredData[0].mealSessionId : null;
  // console.log("mealsessionId", mealSessionId);

  const renderSessionItem = ({ item }) => {
    const mealSessionId = item.mealSessionId;
    return (
      <TouchableOpacity
        style={{
          padding: 10,
        }}
        onPress={() => {
          // if (item.status === 'PROCESS') {
          navigation.navigate("MealSessionDetail", {mealSessionId});
          // }
        }}
      // disabled={item.status !== 'APPROVED'}
      >
        <View
          style={{
            borderRadius: 20,
            backgroundColor: "#ECC26D",
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
              >{`Booking Slot: ${item.quantity}`}</Text>
              <Text
                style={{ ...styles.text, fontSize: 12 }}
              >{`Create At: ${item.createDate}`}</Text>
            </View>
            <View
              style={{
                borderRadius: 20,
              }}
            >
              <Text>Status :{item.status}</Text>
              {/* <Text>Status :{item.createDate}</Text> */}

              <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}>
                <Text>Session :{item.sessionDtoForMealSession.sessionType}</Text>
                {/* <Text>Area :{item.sessionDtoForMealSession.areaDtoForMealSession.areaName}</Text> */}
              </View>

            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const renderItem = ({ item }) => {
    return <renderSessionItem item={item} />;
  };
  return (
    <View style={{ flex: 1 }}>
      <HeaderComp label="Meal Session" onBack={() => navigation.goBack()} />
      <View style={{
        flexDirection: "row", alignItems: "center",
        marginHorizontal: 40, marginVertical: 15, justifyContent: "center",
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
      <View style={{ flex: 2 }}>
        <FlatList
          // data={mealSession}
          // data={newData} 
          data={newData.slice().reverse()}
          keyExtractor={(item) => item.mealSessionId.toString()}
          renderItem={(item) => renderSessionItem(item)}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  )
}

export default MealSessionScreen

const styles = StyleSheet.create({})