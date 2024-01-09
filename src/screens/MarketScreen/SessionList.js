import React from 'react';
import { ScrollView, Text, View, StyleSheet, Pressable } from 'react-native';


const SessionList = ({ navigation, sessions }) => {
    console.log("SESSSSSSSSSSTYPE", sessions?.sessionType)
    const groupedSessions = groupSessionsByDates(sessions);
    console.log("Gourpppsession ", groupedSessions)
    return (
        <ScrollView style={{ height: '92%' }}>
            {groupedSessions.slice().reverse().map((group, index) => (
                <SessionItemGroup key={index} group={group} />
            ))}
        </ScrollView>
    );
};
const SessionItem = ({ session }) => {
    // console.log("itemmmmmmmmneeeeeeeeeeeeee", item)
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
                        navigation.navigate("SessionManagement", { session: session });
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
                        <View>
                            <View>
                                <Text style={{alignItems:'center', justifyContent:'center', fontSize:17}}>
                                    Session Type {session.sessionType}
                                </Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                {/* <Text
                                    style={{ ...styles.text, fontSize: 15 }}
                                >{`Start time: ${session?.createDate}`}</Text>
                                <Text style={{ color: 'white', fontWeight: "bold" }}> - </Text>
                                <Text
                                    style={{ ...styles.text, fontSize: 15 }}
                                >{`End time: ${session?.endDate}`}</Text> */}
                                <Text>
                                    Open Booking
                                </Text>
                            </View>
                        </View>

                    </View>
                    <Text style={{ alignItems: "center", textAlign: "center", color: 'white', padding: 5, fontWeight: "bold" }} >{`Date Create: ${session?.createDate}`}</Text>
                </Pressable>
            </View>
        </View>
    );
};

const SessionItemGroup = ({ group }) => {
    return (
        <View style={{ justifyContent: 'center' }}>
            <Text style={{ textAlign: 'center' }}>{`Create Date: ${group.createDate}, End Date: ${group.endDate}`}</Text>
            {group.sessions.map((session, index) => (
                <SessionItem key={index} session={session} />
            ))}
        </View>
    );
};


// Function to group sessions by create and end dates
const groupSessionsByDates = (sessions) => {
    const groupedSessions = [];
    sessions.forEach((session) => {
        const existingGroup = groupedSessions.find(
            (group) =>
                // group.createDate === session.createDate 
                // && 
                group.endDate === session.endDate
        );

        if (existingGroup) {
            existingGroup.sessions.push(session);
        } else {
            groupedSessions.push({
                createDate: session.createDate,
                endDate: session.endDate,
                sessions: [session],
            });
        }
    });

    return groupedSessions;
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


export default SessionList;
