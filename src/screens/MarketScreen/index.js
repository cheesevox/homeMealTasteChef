import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, View, TouchableOpacity, Text } from "react-native";
import Session from "./components/session";
import { Dropdown } from "react-native-element-dropdown";
import HeaderComp from "../HeaderComp";
import Area from "./components/area";
import { getAllDistrict, getAreaByDistrictId } from "../../Api";
import * as Icon from "react-native-feather";
import { useSelector } from "react-redux";

const MarketScreen = ({ navigation }) => {
  const area = useSelector((state) => state.user.user?.areaId);
  const user = useSelector(state => state.user.user)
  console.log("ARErrrrrrrrrrrrrrrrr", area)
  console.log("ARErrrrrrrrrrrrrrrrr", user)
  const [district, setDistrict] = useState([]);
  const [districtId, setDistrcitId] = useState();
  // const [area, setArea] = useState([]);
  const fetchAllDistrict = () => {
    getAllDistrict().then((res) => {
      setDistrict(res);
    });
  };
  // const fetchAllAreaBySessionId = (id) => {
  //   getAreaByDistrictId(id).then((res) => {
  //     console.log("all area", res);
  //     setArea(res);
  //   });
  // };
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
    return <Area data={item} navigation={navigation} />;
  };
  useEffect(() => {
    fetchAllDistrict();
  }, []);
  // useEffect(() => {
  //   console.log("districtId là", districtId ? districtId : districtDefault);
  //   fetchAllAreaBySessionId(value ? value : districtDefault);
  // }, [districtId ? districtId : districtDefault]);
  return (
    <View>
      {/* <HeaderComp label={"Area"} isHasBackIcon={false} /> */}
      <View style={styles.container}>
        <View style={{
          gap: 20,
          backgroundColor: "#FFF",
          flex: 1
        }}>

          <View style={{
            flexDirection: 'row', justifyContent: 'space-around',
          }}>
            <Text style={{
              fontWeight: '600',
              fontSize: 24,
              textAlign: 'center',
              color: '#e65332',
              borderColor: 'white',
              backgroundColor: '#fab3a2',
              justifyContent: 'center',
              alignItems: 'center',
              fontWeight: 'bold',
              marginVertical: 20,
              width: '40%',
              borderRadius: 20,
              borderWidth: 2
            }}>
              Maket
            </Text>
          </View>
        </View>
        {/* <View style={{ flex: 8, justifyContent: "center", alignItems: "center", elevation: 2 }}>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={district}
            maxHeight={300}
            labelField="districtName"
            valueField="districtId"
            value={value || (district.length > 0 ? districtDefault: null)}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              console.log("item trong dopdown area", item)
              setValue(item.districtId);
              setDistrcitId(item.districtId);
              setIsFocus(false);
            }}
          ></Dropdown>
          <FlatList
            data={area}
            keyExtractor={(item) => item.areaId}
            renderItem={(item) => renderItem(item)}
            showsHorizontalScrollIndicator={false}
          />
        </View> */}
        <View
            renderItem={(area) => renderItem(area)}
        >
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
    height: '100%',
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
