import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Pressable,
  Image,
  useWindowDimensions,
} from "react-native";
import Header from "../components/Header";
import SearchFilter from "../components/SearchFilter";
import React, { useState, useEffect } from "react";
// import CategoriesFilter from "../components/CategoriesFilter";
import { colors, item, user } from "../Constant";
import {
  getAllAreaByDistrictId,
  getAllDistrict,
  getAllMealInSessionID,
  getAllSessionByAreaId,
} from "../Api";
import { getAllArea } from "../Api";
import MealSessionCard from "../components/MealSessionCard";
import { Dropdown } from "react-native-element-dropdown";
import { useSelector } from "react-redux";
import { TabView, SceneMap } from "react-native-tab-view";
import TabViewSession from "../components/TabViewSession";
import { Card } from "react-native-paper";
import { Bold } from "react-native-feather";
import { Ionicons } from "@expo/vector-icons";

const FoodListScreen = ({ navigation }) => {
  const [touch, setTouch] = useState(0);
  const [area, setArea] = useState([]);
  const [areaId, setAreaId] = useState();
  const [mealInSession, setMealInSession] = useState([]);
  const [mealInSessionId, setMealInSessionId] = useState([]);
  const districtDefault = useSelector((state) => state.user.user?.districtId);
  console.log("district defaulttttttttttttttttt", districtDefault);
  const [district, setDistrict] = useState([]);
  // const [districtId, setDistrictId] = useState([])
  const [districtId, setDistrictId] = useState(districtDefault);

  const [isFocus, setIsFocus] = useState(false);

  const fetchAllSessionByAreaId = (id) => {
    getAllSessionByAreaId(areaId ? areaId : area[0])
      .then((res) => {
        console.log("tra ve session tao tesrtttttttttttttttttttt", res);
        setSession(res);
      })
      .catch((error) => console.log(error));
  };

  const fectchAllAreaByDistrictId = () => {
    getAllAreaByDistrictId(districtId ? districtId : districtDefault)
      .then((res) => {
        console.log("chay area id tra ve cho koa", res[0]);
        setArea(res);
        setAreaId(res[0].areaId);
      })
      .catch((error) => console.log(error));
  };

  // const fetchAllMealSessionBySessionId = () => {
  // 	getAllMealInSessionID().then((res) => {
  // 	})
  // }

  // useEffect(() => {
  // 	fetchAllSessionByAreaId()
  // }, [areaId])

  useEffect(() => {
    fectchAllAreaByDistrictId();
    console.log("co vao dc day de doi area hay khong", districtId);
  }, [districtId]);

  useEffect(() => {
    getAllDistrict().then((ref) => {
      console.log(ref);
      setDistrict(ref);
    });
  }, []);

  useEffect(() => {
    // Fetch when the component mounts
    const unsubscribe = navigation.addListener("focus", () => {
      // fetchAllSessionByAreaId(area[0].areaId);
      // fetchAllMealSessionBySessionId()
      fectchAllAreaByDistrictId(districtId);
      fetchAllSessionByAreaId(districtId);
      fectchAllAreaByDistrictId(districtId);
      setDistrictId(districtId);
      // fectchAllAreaByDistrictId();
    });

    return unsubscribe; // Cleanup
  }, [navigation]);
  // console.log("TRA ve session typr", item.sessionType)
  // const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 16 }}>
      {/* render header */}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 50,
        }}
      >
        <View style={{}}>
          <View style={{}}>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => navigation.navigate("UserProfile")}
            >
              <Header headerIcon={"user"} style={{}} />
              <Header headerText={"Hello user"} />
            </TouchableOpacity>
          </View>
        </View>
        <Header headerIcon={"bell-o"} />
      </View>

      {/* Search Filter */}
      <View style={{ flexDirection: "row" }}>
        <SearchFilter
          placeholder="Fuck Did You WA'NN Food"
          // item={item}
        />
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 10,
            width: "35%",
            elevation: 5,
            shadowColor: "black",
            height: 60,
            top: 15,
            left: 15,
            justifyContent: "center",
            padding: 5,
          }}
        >
          <View style={styles.container}>
            <Dropdown
              style={[styles.dropdown]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              data={district}
              labelField="districtName"
              valueField="districtId"
              placeholder={!isFocus ? "District" : ""}
              searchPlaceholder="Search..."
              value={districtId}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(value) => {
                setDistrictId(value.districtId);
                // router.refesh
              }}
            />
          </View>
        </View>
      </View>

      {/* sessiion filter */}

      <View>
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>Area</Text>
        {/* district list */}
        <View style={{}}>
          <ScrollView
          // horizontal showsHorizontalScrollIndicator={false} style={{ margin: 5}}
          >
            {area.map((area, index) => {
              return (
                <View
                  key={index}
                  style={{
                    elevation: 5,
                    width: "100%",
                    borderRadius: 8,
                    marginVertical: 10,
                  }}
                >
                  <TouchableOpacity
                    onPress={
                      () =>
                        navigation.navigate("MealSession", {
                          areaId: area.areaId,
                        }) &&
                        // {
                        // 	console.log(area.areaId)
                        setAreaId(area.areaId)
                      // }
                    }
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Ionicons name="business-outline" size={40} />
                      <View style={{ padding: 40 }}>
                        <Text
                          style={{
                            fontSize: 23,
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          {area.areaName}
                        </Text>
                        <Text style={{ textAlign: "center", fontSize: 15 }}>
                          Address :{area.address}{" "}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
            {/* <TabViewSession /> */}
          </ScrollView>
          {/* <View style={{height:"50%"}}>
					<TabViewSession session={session}/>
					</View> */}
          {/* {session?.map((item, index) => (
						<ScrollView key={index}>
							{
							item.status  == true &&
							 (
								<View>
								<Text
								style={{
									fontSize: 25,
									fontWeight: "bold",
									elevation: 2
								}}>Session {item.sessionType}</Text>
							 <MealSessionCard key={index} sessionId={item.sessionId} />
							 </View>
							 )
							}
						</ScrollView>
					))
					} */}
        </View>
      </View>
      {/* </View> */}
    </SafeAreaView>
  );
};

export default FoodListScreen;

const styles = StyleSheet.create({
  touchactive: { backgroundColor: "#f96163" },
  textAreaActive: {
    backgroundColor: "#f96163",
    container: {
      backgroundColor: "white",
      padding: 16,
    },
    dropdown: {
      height: 50,
      borderColor: "gray",
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      backgroundColor: "white",
      paddingHorizontal: 8,
      justifyContent: "center",
    },
    placeholderStyle: {
      fontSize: 12,
    },
    selectedTextStyle: {
      fontSize: 10,
      AlignItem: "center",
    },
    inputSearchStyle: {
      fontSize: 12,
    },
  },
});
