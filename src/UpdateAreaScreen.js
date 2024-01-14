import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    FlatList,
} from "react-native";
import * as Icon from "react-native-feather";
import React, { useEffect, useState } from 'react'
import { TextInput } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import { getAllArea, getAllAreaByDistrictId, getAllDistrict, getAllMealSEssionWithStatusBeforeUpdateArea } from './Api'
import { useSelector, useDispatch } from 'react-redux';
import Toast from "react-native-toast-message";
import { ScrollView } from "react-native";

const UpdateAreaScreen = ({ navigation, route }) => {
    const user = useSelector(state => state.user.user)
    const [isFocus, setIsFocus] = useState(false);
    const profile = route.params;
    const [district, setDistrict] = useState([]);
    const [allArea, setAllArea] = useState([])
    const [areaByDistrict, setAreaByDistrict] = useState();
    const [districtId, setDistrcitId] = useState();
    const [values, setValues] = useState({
        userId: profile?.profile?.userId,
        name: profile?.profile?.name || "",
        username: profile?.profile?.username || "",
        email: profile?.profile?.email || "",
        address: profile?.profile?.address || "",
        districtId: profile?.profile?.districtId || null,
        areaId: profile?.profile?.areaId || null
    });
    const id = user?.kitchenId
    const [mealInSession, setMealInSession] = useState();
    const fecthAllMealInSessionBeforeUpdateArea = (id) => {
        getAllMealSEssionWithStatusBeforeUpdateArea(id).then((res) => {
            console.log("RESSSSSSSSS", res)
            setMealInSession(res)
        })
    }
    useEffect(() => {
        fecthAllMealInSessionBeforeUpdateArea(id)
    }, [id])
    const fetchAllDistrict = () => {
        getAllDistrict().then((res) => {
            setDistrict(res);
        });
    };
    const fecthAllAreaByDistrictId = (districtId) => {
        getAllAreaByDistrictId(districtId).then((res) => {
            setAreaByDistrict(res);
        });
    };

    const fecthAllArea = () => {
        getAllArea().then((res) => {
            setAllArea(res);
        });
    };

    useEffect(() => {
        fetchAllDistrict();
        fecthAllArea();
        fecthAllAreaByDistrictId(districtId)
    }, [districtId]);
    const area = allArea.find(item => item?.areaId === profile?.profile?.areaId);
    // console.log("offffffffffffffffffff", mealInSession[0]?.status)

    const onHandleUpdateProfile = () => {
        updateProfile(values);
        Toast.show({
            type: "success",
            text1: "Update",
            text2: "Update Successfully.",
        });
    };

    const renderSessionItem = ({ item }) => {
        const mealSessionId = item.mealSessionId;
        return (
            <TouchableOpacity
                style={{
                    padding: 10,
                }}
                onPress={() => {
                    navigation.navigate("MealSessionDetail", { mealSessionId });
                    // }
                }}
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
                            width: 120,
                            height: 120,
                            borderRadius: 10,
                        }}
                        source={{ uri: item?.mealDtoForMealSession?.image }}
                    />
                    <View style={{ gap: 18, flex: 1, width: "100%" }}>
                        <Text style={{ ...styles.text, fontSize: 16, textAlign: "center" }}>
                            {item.mealDtoForMealSession?.name}
                        </Text>
                        <View
                            style={{
                                justifyContent: "space-between",
                            }}
                        >
                            <Text
                                style={{ ...styles.text }}
                            >{`Booking Slot: ${item.quantity}`}</Text>
                            <Text
                                style={{ ...styles.text }}

                            >{`Create At: ${item.createDate}`}</Text>
                            <Text style={{ ...styles.text }}>Status :{item.status}</Text>
                            <Text style={{ ...styles.text }}>Session :{item.sessionDtoForMealSession.sessionType}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };
    const renderItem = ({ item }) => {
        return
        <renderSessionItem item={item} />;
    };
    return (
        <View>
            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: 40,
                        height: 40,
                        backgroundColor: "orange",
                        borderRadius: 28,
                        marginTop: 42,
                    }}
                >
                    <Icon.ArrowLeft style={{ color: "white" }} strokeWidth={3} />
                </TouchableOpacity>
                <Text style={styles.Text}>Update Area </Text>
                <TouchableOpacity
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: 40,
                        height: 40,
                        borderRadius: 28,
                        marginTop: 42,
                    }}
                >
                    <Icon.CreditCard style={{}} strokeWidth={3} />
                </TouchableOpacity>
            </View>
            <View style={{ alignItems: "center", margin: 20 }}>
                <Image
                    source={require("../assets/images/avatar.jpg")}
                    style={{
                        borderRadius: 60,
                        width: 100,
                        height: 100,
                        resizeMode: "cover",
                        alignItems: "center",
                    }}
                />
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                    {profile?.profile?.name} # {profile?.profile?.userId}
                </Text>
            </View>
            <View>
                <View style={{ marginHorizontal: 40, marginVertical: 20, borderWidth: 1, padding: 5 }}>
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
                        // value={values.districtId}
                        placeholder={profile?.profile?.districtDto?.districtName}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                    ></Dropdown>
                </View>
                <View style={{ marginHorizontal: 40, marginVertical: 20, borderWidth: 1, padding: 5 }}>
                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        placeholder={area?.areaName}
                        data={allArea}
                        dropdownPosition="top"
                        maxHeight={400}
                        labelField="areaName"
                        valueField="areaId"
                        // value={values.areaId}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                    ></Dropdown>
                </View>
            </View>
            <View style={{ height: '40%' }}>
                <FlatList
                    data={mealInSession}
                    keyExtractor={(item) => item.mealSessionId.toString()}
                    renderItem={(item) => renderSessionItem(item)}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            <View
                style={{ justifyContent: "center", alignItems: "center", margin: 20 }}
            >
                <TouchableOpacity
                    style={{
                        backgroundColor: "#f96163",
                        borderRadius: 18,
                        justifyContent: "center",
                        paddingVertical: 18,
                        width: "60%",
                        alignItems: "center",
                    }}
                    onPress={() => onHandleUpdateArea()}
                >
                    <Text style={{ fontSize: 18, color: "#fff", fontWeight: "700" }}>
                        Update Profile
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    Text: {
        fontWeight: "600",
        fontSize: 24,
        textAlign: "center",
        color: "#e65332",
        borderColor: "white",
        backgroundColor: "#fab3a2",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "bold",
        marginTop: 40,
        width: "40%",
        borderRadius: 20,
        borderWidth: 2,
    },
});
export default UpdateAreaScreen