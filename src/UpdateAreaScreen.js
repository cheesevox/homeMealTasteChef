import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAllMealSEssionWithStatusBeforeUpdateArea } from './Api'
import { useSelector, useDispatch } from 'react-redux';

const UpdateAreaScreen = ({route}) => {
    const user = useSelector(state => state.user.user)
    const [mealInSession, setMealInSession] = useState([])
    const id = user?.kitchenId
    const fecthAllMealInSessionBeforeUpdateArea = (id) => {
        getAllMealSEssionWithStatusBeforeUpdateArea(id).then((res) => {
            console.log("RESSSSSSSSS", res)
            setMealInSession(res)
        })
    }
    useEffect(() => {
   fecthAllMealInSessionBeforeUpdateArea()
      }, [])
    return (
        <View>
            <Text>UpdateAreaScreen</Text>
        </View>
    )
}

export default UpdateAreaScreen