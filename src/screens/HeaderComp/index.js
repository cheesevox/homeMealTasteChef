import React from "react";
import BackIcon from "../../components/Icons/BackIcon";
import { Pressable, Text } from "react-native";
import { View } from "react-native";
import BellIcon from "../../components/Icons/BellIcon";
import MessageIcon from "../../components/Icons/MessageIcon";

const HeaderComp = (props) => {
  const {
    label,
    isHasBackIcon = true,
    isHasBellIcon = false,
    isHasMessageIcon = false,
    onBack,
    onClickBellIcon,
    onClickMessageIcon,
  } = props;
  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        paddingVertical: 20,
      }}
    >
      <View
        style={{
          alignItems: "center",
          flex: 1,
        }}
      >
        <Pressable
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.5 : 1,
              backgroundColor:'orange',
              padding:10,
              marginRight:30,
              borderRadius:50
            },
          ]}
          onPress={onBack}
        >
          {isHasBackIcon && <BackIcon />}
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.5 : 1,
            },
          ]}
          onPress={onClickBellIcon}
        >
          {isHasBellIcon && <BellIcon color="orange" />}
        </Pressable>
      </View>

      <Text
        style={{
          // color: "#FFF",
          // textAlign: "center",
          // // fontFamily: "Poppins",
          // fontSize: 20,
          // fontWeight: "700",
          // flex: 8,
          fontWeight: '600',
          fontSize: 24,
          textAlign: 'center',
          color: '#e65332',
          borderColor: 'white',
          backgroundColor: '#fab3a2',
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: 'bold',
          width: '50%',
          borderRadius: 20,
          borderWidth: 2
        }}
      >
        {label}
      </Text>
      <Pressable
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.5 : 1,
            alignItems: "center",
            flex: 1,
            paddingRight: 12,
          },
        ]}
        onPress={onClickMessageIcon}
      >
        {isHasMessageIcon && (
          <View style={{ justifyContent: "flex-end" }}>
            <MessageIcon color={"#FFF"} />
          </View>
        )}
      </Pressable>
    </View>
  );
};

export default React.memo(HeaderComp);
