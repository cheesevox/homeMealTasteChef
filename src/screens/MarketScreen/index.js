import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, View, TouchableOpacity, Text } from "react-native";
import Session from "./components/session";
import { Dropdown } from "react-native-element-dropdown";
import HeaderComp from "../HeaderComp";
import Area from "./components/area";
import { getAllDistrict, getAreaByDistrictId } from "../../Api";
import * as Icon from "react-native-feather";


const MarketScreen = ({ navigation }) => {
  const [district, setDistrict] = useState([]);
  const [districtId, setDistrcitId] = useState();
  const [area, setArea] = useState([]);
  const fetchAllDistrict = () => {
    getAllDistrict().then((res) => {
      setDistrict(res);
    });
  };
  const fetchAllAreaBySessionId = (id) => {
    getAreaByDistrictId(id).then((res) => {
      console.log("all area", res);
      setArea(res);
    });
  };
  const [value, setValue] = useState(null);
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
  useEffect(() => {
    console.log("districtId là", districtId);
    fetchAllAreaBySessionId(districtId);
  }, [districtId]);
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
            {/* <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ justifyContent: "center", alignItems: "center", 
              width: 40, height: 40, backgroundColor: 'orange', 
              borderRadius: 28, marginVertical: 20 }}
            >
              <Icon.ArrowLeft style={{ color: 'white' }} strokeWidth={3} />
            </TouchableOpacity> */}
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
            {/* <TouchableOpacity
              style={{ justifyContent: "center", alignItems: "center", width: 40, height: 40, borderRadius: 28, marginTop: 42 }}
            >
              <Icon.CreditCard style={{}} strokeWidth={3} />
            </TouchableOpacity> */}
          </View>
        </View>
        {/* <View style={{ width: "100%" }}>
        <Image
          style={{ width: "100%" }}
          source={require("../../../assets/images/post-banner.png")}
          resizeMode="cover"
        />
      </View> */}
        <View style={{ flex: 8, justifyContent:"center", alignItems:"center" , elevation:2}}>
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
          placeholder={!isFocus ? "Select District" : "..."}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            console.log("item trong dopdown area",item)
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
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    paddingTop: 20,
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
    padding:15,
    borderColor:'grey',
    borderRadius: 10,
    borderWidth:2,
    alignItems:"center",
    width:'80%',
    justifyContent:"center",
    marginVertical:30,
  }
});

export default React.memo(MarketScreen);
