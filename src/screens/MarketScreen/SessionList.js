import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, Text, View, StyleSheet, Pressable, FlatList } from 'react-native';

const SessionList = ({ sessions }) => {
    // console.log("SESSSSSSSSSSTYPE", sessions?.sessionType)
    const groupedSessions = groupSessionsByDates(sessions);
    // console.log("Gourpppsession ", groupedSessions)
    return (
        <ScrollView style={{ height: '92%'}}>
            {groupedSessions.slice().reverse().map((group, index) => (
                <SessionItemGroup key={index} group={group} groupedSessions={groupedSessions} />
            ))}
        </ScrollView>
    );
};
const SessionItem = ({ session, groupedSessions  }) => {
    const navigation = useNavigation();
    return (
        <View style={{borderWidth:2, borderRadius:20, margin:5, alignItems:'center', justifyContent:'center', backgroundColor:'orange'}}>
            <View style={{ alignItems: "center" }}>
                <Pressable
                    style={({ pressed }) => [
                        {
                            opacity: pressed ? 0.5 : 1,
                        },
                        styles.buttonStyle,
                    ]}
                    onPress={() => 
                    //   navigation.navigate("SessionManagement", { session, groupedSessions  })
                    navigation.navigate("SessionManagement", { session, group: groupedSessions.find(group => group.sessions.includes(session)) })
                    }
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
                                <Text style={{alignItems:'center', justifyContent:'center', fontSize:16.5}}>
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

const SessionItemGroup = ({ group ,groupedSessions }) => {
    const navigation = useNavigation();
    return (
        <View style={{ justifyContent: 'center', borderWidth:1, borderRadius:10, margin:20 }}>
            <Text style={{ textAlign: 'center',fontSize:17 }}>{`Create Date: ${group.createDate}`}</Text>
            <Text style={{ textAlign: 'center',fontSize:17 }}>{` End Date: ${group.endDate}`}</Text>
            {/* {group.sessions.map((session, index) => (
                <SessionItem key={index} session={session} groupedSessions={groupedSessions} />
            ))} */}
            <FlatList
                data={group.sessions}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <SessionItem session={item} groupedSessions={groupedSessions} />
                )}
                horizontal={true}
            />
        </View>
    );
};


// Function to group sessions by create and end dates
const groupSessionsByDates = (sessions) => {
    const groupedSessions = [];
    sessions.forEach((session) => {
        const existingGroup = groupedSessions.find(
            (group) =>
                group.endDate === session.endDate
        );
        if (existingGroup) {
            existingGroup.sessions.push(session);
            existingGroup.sessionIds.push(session?.sessionId);
            existingGroup.sessionType.push(session?.sessionType);

        } else {
            groupedSessions.push({
                createDate: session.createDate,
                endDate: session.endDate,
                sessions: [session],
                sessionIds: [session?.sessionId],
                sessionType:[session?.sessionType]
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
