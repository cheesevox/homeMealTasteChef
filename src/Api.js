import axios from "axios";
// <<<<<<< HEAD
import { useDispatch } from "react-redux";
import { RouteName } from "./Constant";
import { value } from "deprecated-react-native-prop-types/DeprecatedTextInputPropTypes";

export const login = async (values, navigation, Toast) => {
  console.log(values);
  try {
    const response = await axios.post(
      `https://homemealtaste.azurewebsites.net/api/User/login`,
      values
    );

    if (response.data) {
      console.log("REPSSSSSSSSSSssss", response.data)
      console.log("role", response.data.roleId)
      const roleId = response.data.roleId;
      const userId = response.data.userId
      const status = response.data.status
      if (roleId === 2) {
        navigation.navigate("Login", { loginFailure: true });
      } else if (roleId === 3) {
        if (status == true) {
          navigation.navigate(`${RouteName.KITCHEN}`, { user: response.data });
        } else {
          Toast.show({
            type: "error",
            text1: "Home Meal Taste",
            text2: "Your account is ban!"
          })
        }
      } else {
        console.log("Unknown roleId:", roleId);
      }
    } else {
      console.log("No data in the response");
    }
  } catch (error) {
    console.log("Error in login", error);
  }
};


export const getOrderByUserID = (id) => {
  try {
    const repose = axios.get(
      `https://homemealtaste.azurewebsites.net/api/Order/get-order-by-user-id?id=${id}`
    );
    return repose.data;
  } catch (error) {
    console.log("error get user order by id");
  }
};
export const loginUser = () => {
  try {
    const repose = axios.get(
      `https://homemealtaste.azurewebsites.net/api/User/login`
    );
    return repose.data;
  } catch (error) {
    console.log("login error in here");
  }
};

export const getOrderByID = (id) => {
  try {
    const repose = axios.get(
    );
    return repose.data;
  } catch (error) {
    console.log("error by id get order");
  }
};

export const getAllMealInSessionID = async (id) => {
  try {
    const repose = await axios.get(
      `https://homemealtaste.azurewebsites.net/api/MealSession/get-all-meal-session-by-session-id?sessionid=${id}`
    );
    return repose.data;
  } catch (error) {
    console.log("err in get all meal sesison in sesion id", error);
  }
};

export const getAllArea = async () => {
  try {
    const repose = await axios.get(
      `https://homemealtaste.azurewebsites.net/api/Area/get-all-area`
    );
    return repose.data;
  } catch (error) { }
}
export const getAllDistrict = async () => {
  try {
    const response = await axios.get(
      "https://homemealtaste.azurewebsites.net/api/District/get-all-district"
    );
    return response.data;
  } catch (error) {
    console.log("Error get all district", error);
  }
};
export const getAreaByDistrictId = async (id) => {
  try {
    const response = await axios.get(
      `https://homemealtaste.azurewebsites.net/api/Area/get-area-by-district-id?districtid=${id}`
    );
    return response.data;
  } catch (error) {
    console.log("Get area by district id", error);
  }
};
export const getAllSessionByAreaId = async (id) => {
  try {
    const response = await axios.get(
      `https://homemealtaste.azurewebsites.net/api/Session/get-all-session-by-area-id-with-status-true?areaid=${id}`
      // `https://homemealtaste.azurewebsites.net/api/Session/get-all-session-by-area-id-with-status-true-in-day?areaid=${id}`
    );
    return response.data;
  } catch (error) {
    console.log("get all session by area Id", error);
  }
};
export const getAllSessionByAreaIdchef = async (id) => {
  try {
    const response = await axios.get(
      // `https://homemealtaste.azurewebsites.net/api/Session/get-all-session-by-area-id-with-status-true?areaid=${id}`
      `https://homemealtaste.azurewebsites.net/api/Session/get-all-session-by-area-id-with-status-true-in-day?areaid=${id}`
    );
    console.log("session get ben6 api file la2", response.data)
    return response.data;
  } catch (error) {
    console.log("get all session by area Id", error);
  }
};
export const getMealInSessionBySessionId = async (id) => {
  try {
    const response = await axios.get(
      `https://homemealtaste.azurewebsites.net/api/MealSession/get-all-meal-session-by-session-id?sessionid=${id}`
    );
    return response.data;
  } catch (error) {
    console.log("get all meal in session by session id");
  }
};
export const getAllMealSession = async () => {
  try {
    const response = await axios.get(
      "https://homemealtaste.azurewebsites.net/api/MealSession/get-all-meal-session"
    );
    return response.data;
  } catch (error) {
    console.log("get all meal ss", error);
  }
};
export const getDishByMealId = async (id) => {
  try {
    const response = await axios.get(`https://homemealtaste.azurewebsites.net/api/Meal/get-single-meal-by-meal-id?mealid=${id}`)
    return response.data
  } catch (error) {
    console.log("get dish by mela id", error)
  }
}
export const createOrderUser = async (values) => {
  console.log("values creaorder ///////////////", values)
  try {
    const response = await axios.post("https://homemealtaste.azurewebsites.net/api/Order/create-order", values)
  } catch (error) {
    console.log("create order", error)
  }
}

export const getAllOrderByCutomerId = async (id) => {
  try {
    const response = await axios.get(`https://homemealtaste.azurewebsites.net/api/Order/get-order-by-customer-id?id=${id}`)
    return response.data
  } catch (error) {
    console.log("erroe all order by cutomer id", error)
  }
}

export const getAllAreaByDistrictId = async (id) => {
  try {
    const response = await axios.get(`https://homemealtaste.azurewebsites.net/api/Area/get-area-by-district-id?districtid=${id}`)
    console.log("tra ve area cho kaooooooooooo", response.data)
    return response.data
  } catch (error) {
    console.log("error in getall area by district")
  }
}
// export const getAllDistrict = async () => {
//   try {
//     const repose = await axios.get(
//       `https://homemealtaste.azurewebsites.net/api/District/get-all-district`
//     );
//     return repose.data;
//   } catch (error) {}
// };

export const getUserByID = async (id) => {
  try {
    const response = await axios.get(`https://homemealtaste.azurewebsites.net/api/User/get-user-by-id?id=${id}`)
    return response.data
  } catch (error) {
    console.log("error user by id ", error)
  }
}

export const createFeedBackOrder = async (values) => {
  console.log("values create feedback///////////////", values)
  try {
    const response = await axios.post("https://homemealtaste.azurewebsites.net/api/Feedback/create-feedback", values)
  } catch (error) {
    console.log("create feedback", error)
  }
}

export const getAllFeedbackByKitchenId = async (id) => {
  try {
    const response = await axios.get(`https://homemealtaste.azurewebsites.net/api/Feedback/get-feedback-by-kitchen-id?kitchenid=${id}`)
    return response.data
  } catch (error) {
    console.log("error feedback", error)
  }
}

export const createPayment = async (values) => {
  console.log("values create Payemnet$$$$$", values)
  try {
    const response = await axios.post("https://homemealtaste.azurewebsites.net/api/Payment", values)
    return response.data
  } catch (error) {
    console.log("create payment $$$$", error)
  }
}
export const getMoneyExportFile = async (id, value) => {
  try {
    const response = await axios.get(
      `https://homemealtaste.azurewebsites.net/api/Kitchen/withdraw-money-from-chef-wallet-export-file-PDF?kitchenid=${id}&moneyWithdraw=${value}`
    );
    return response.data;
  } catch (error) { console.log("REPOSSSSSSSSSSSSSSsss link", error) }
};
// =======
// chef dish
export const getAllDishByKitchenId = async (id) => {
  try {
    const response = await axios.get(
      `https://homemealtaste.azurewebsites.net/api/Dish/get-dish-by-kitchen-id?kitchenid=${id}`
    );
    return response.data;
  } catch (error) { }
};
export const deleteDishByDishId = async (id) => {
  try {
    await axios.delete(
      `https://homemealtaste.azurewebsites.net/api/Dish/delete-dish-not-exist-in-session-by-dish-id?dishid=${id}`
    );
    console.log("Delete successfully.");
  } catch (error) {
    console.log("delete dish", error);
  }
};
export const deleteMealByMealId = async (id) => {
  await axios.delete(
    `https://homemealtaste.azurewebsites.net/api/Meal/delete-meal-id-not-exist-in-session?mealid=${id}`
  );

};
export const createNewDish = async (image, attribute) => {
  const formData = new FormData();
  formData.append("image", {
    uri: image,
    type: "image/jpeg", // or 'image/png'
    name: "myImage.jpg",
  });

  // Append additional attributes to FormData
  Object.entries(attribute).forEach(([key, value]) => {
    formData.append(key, value);
  });
  try {
    const response = await axios.post(
      "https://homemealtaste.azurewebsites.net/api/Dish",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.status === 200) {
      console.log("Create new dish successfully.");
      console.log(response.data);
    }
  } catch (error) {
    console.error("Error creating new dish:", error.message);
    console.error("Error details:", error.response);

    // Log the entire error object for more information
    console.error("Full error object:", error);

    // If error.response is not available, log the entire error object
    if (!error.response) {
      console.error("Error object without response:", error);
    }
  }
};

export const getAllDishType = async () => {
  try {
    const response = await axios.get(
      "https://homemealtaste.azurewebsites.net/api/DishType/get-all-dish-type"
    );
    return response.data;
  } catch (error) {
    console.log("get all dishtype error", error);
  }
};
export const getAllMealByKitchen = async (id) => {
  try {
    const response = await axios.get(
      `https://homemealtaste.azurewebsites.net/api/Meal/get-all-meal-by-kitchen-id?id=${id}`
    );
    return response.data;
  } catch (error) {
    console.log("get all meal by kitchen error", error);
  }
};
// export const getDishByMealId = async (id)=>{
//     try {
//         const response = await axios.get(`https://homemealtaste.azurewebsites.net/api/Dish/get-dish-id-by-meal-id?mealid=${id}`)

//     } catch (error) {
//     }
// }

export const getMealById = async (id) => {
  try {
    const response = await axios.get(
      `https://homemealtaste.azurewebsites.net/api/Meal/get-single-meal-by-meal-id?mealid=${id}`
    );
    return response.data;
  } catch (error) {
    console.log("get meal by id", error);
  }
};

export const getOrderByKitchenId = async (id) => {
  try {
    const response = await axios.get(`https://homemealtaste.azurewebsites.net/api/Order/get-all-order-by-kitchen-id?kitchenid=${id}`)
    return response.data
  } catch (error) {
    console.log("get order by kitchen id", error)
  }
}
export const postStatusPaidToCompleted = async (id) => {
  try {
    console.log(id)
    await axios.patch(`https://homemealtaste.azurewebsites.net/api/Order/change-status-order-to-COMPLETED?orderid=${id}`)
  } catch (error) {
    console.log("post status paid to complete errror", error)
  }
}
export const getAllMealSessionWithStatus = async () => {
  try {
    const response = await axios.get(`https://homemealtaste.azurewebsites.net/api/MealSession/get-all-meal-session-with-status-APPROVED-and-REMAINQUANTITY->-0`)
    return response.data
  } catch (error) {
    console.log("err log all meal with approve ", error)
  }
}
export const getAllMealSessionByKitchen = async (id) => {
  console.log(id);
  try {
    const response = await axios.get(
      `https://homemealtaste.azurewebsites.net/api/MealSession/get-all-meal-session-by-kitchen-id?kitchenId=${id}`
    );
    return response.data;
  } catch (error) {
    console.log("get all meal session by kitchen error", error);
  }
};
export const createMealSession = async (values) => {
  console.log(values);
  try {
    const response = await axios.post(
      "https://homemealtaste.azurewebsites.net/api/MealSession",
      values
    );
    if (response.status == 200) {
      console.log("Create meal session successfully.");
    }
  } catch (error) {
    console.log("create meal session", error);
  }
};

export const getAllOrderByMealSessionId = async (id) => {
  console.log(id);
  try {
    const response = await axios.get(
      `https://homemealtaste.azurewebsites.net/api/Order/get-all-order-by-mealsession-id?mealsessionid=${id}`
    );
    return response.data;
  } catch (error) {
    console.log("get all order by meal sesison id err", error);
  }
};

export const postStatusOrderForCustomer = async (id, value) => {
  try {
    console.log("posrtttttttttt id", id)
    console.log("valuuuuuuuuu post", value)
    await axios.patch(`https://homemealtaste.azurewebsites.net/api/Order/change-status-order?mealsessionid=${id}&status=${value}`)
  } catch (error) {
    console.log("post status for order customer", error)
  }
};

export const getMealSessionById = async (id) => {
  try {
    const response = await axios.get(
      `https://homemealtaste.azurewebsites.net/api/MealSession/get-single-meal-session-by-meal-session-id?mealsessionid=${id}`
    );
    return response.data;
  } catch (error) {
    console.log("get meal session by id", error);
  }
};
export const getAllMealSessionInDayApprove = async () => {
  try {
    const response = await axios.get(`https://homemealtaste.azurewebsites.net/api/MealSession/get-all-meal-session-with-status-APPROVED-and-REMAINQUANTITY-%3e-0-IN-DAY`)
    return response.data
  } catch (error) {
    console.log("err log all meal with approve ", error)
  }
}

export const createNewMeal = async (image, attribute, dishes) => {
  console.log("tung thanh phan", image, attribute, dishes);
  const formData = new FormData();
  formData.append("Image", {
    uri: image,
    type: "image/jpeg", // or 'image/png'
    name: "mealImage.jpg",
  });
  Object.entries(attribute).forEach(([key, value]) => {
    formData.append(key, value);
  });
  dishes.forEach((dishId, index) => {
    formData.append("DishIds", dishId);
  });
  // formData.append("DishIds", dishes);
  console.log("formdata la", formData);
  console.log("dish dc gui sang api la", dishes);
  try {
    const response = await axios.post(
      "https://homemealtaste.azurewebsites.net/api/Meal/create-meal",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.status === 200) {
      console.log("Create new meal successfully.");
      console.log(response.data);
    }
  } catch (error) {
    console.error("Error creating new dish:", error.message);
    console.error("Error details:", error.response);

    // Log the entire error object for more information
    console.error("Full error object:", error);

    // If error.response is not available, log the entire error object
    if (!error.response) {
      console.error("Error object without response:", error);
    }
  }
};

export const updateDish = async (id, image, attribute) => {
  console.log("ben api update dish", id, image, attribute)
  const formData = new FormData();
  // Append image with correct file name and type
  formData.append("dishId", id)
  formData.append("image", {
    uri: image, // Make sure this is the correct path or URL
    type: "image/jpeg", // or 'image/png'
    name: "myImage.jpg", // You can extract the file name from the URI or provide it dynamically
  });

  // Append other attributes
  Object.entries(attribute).forEach(([key, value]) => {
    formData.append(key, value);
  });
  console.log("daaaaaaaaaaaaaaaaata", formData)
  try {
    const response = await axios.put(
      "https://homemealtaste.azurewebsites.net/api/Dish/update-dish-not-exist-in-session",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("Response:", response.data); // Log the response data for debugging

    if (response.status === 200) {
      console.log("Update successful.");
    }
  } catch (error) {
    console.error("Error updating dish:", error.message);
    console.error("Error details:", error.response);

    // Log the entire error object for more information
    console.error("Full error object:", error);

    // If error.response is not available, log the entire error object
    if (!error.response) {
      console.error("Error object without response:", error);
    }
  }
};

export const updateMeal = async (id, image, attribute, dishes) => {
  const formData = new FormData();
  // Append image with correct file name and type
  formData.append("mealId", id)
  formData.append("image", {
    uri: image, // Make sure this is the correct path or URL
    type: "image/jpeg", // or 'image/png'
    name: "myImage.jpg", // You can extract the file name from the URI or provide it dynamically
  });
  Object.entries(attribute).forEach(([key, value]) => {
    formData.append(key, value);
  });
  dishes.forEach((dishId, index) => {
    formData.append("DishIds", dishId);
  });
  // Assuming dishes is an array of key-value pairs (objects)
  console.log("daaaaaaaaaaaaaaaaata", formData)
  const response = await axios.put(
    "https://homemealtaste.azurewebsites.net/api/Meal/update-meal-not-exist-in-session",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  console.log("Response:", response.data); // Log the response data for debugging
};

export const updateProfile = async (values) => {
  console.log("values for updating profile:", values);

  try {
    const response = await axios.put(
      "https://homemealtaste.azurewebsites.net/api/User/update-profile-chef",
      values
    );

    // Log the response data for debugging
    console.log("Update Profile Response:", response.data);

    if (response.status === 200) {
      console.log("Update successful.");
    } else {
      console.error("Update failed. Unexpected status code:", response.status);
    }
  } catch (error) {
    console.error("Error updating profile:", error.message);
    console.error("Error details:", error.response);

    // Log the entire error object for more information
    console.error("Full error object:", error);
  }
};
export const getAllDishOnSessionByKitchenId = async (id) => {
  try {
    const response = await axios.get(`https://homemealtaste.azurewebsites.net/api/Dish/get-all-dish-in-meal-session-by-kitchen-id?kitchenid=${id}`)
    return response.data
  } catch (error) {
    console.log("error get all already dísh in kitchen id", error)
  }
}
export const getAllSessionRegisterTrue = async (id) => {
  try {
    const response = await axios.get(
      `https://homemealtaste.azurewebsites.net/api/Session/get-all-session-with-status-on`
    );
    return response.data;
  } catch (error) {
    console.log("Get all session with true", error);
  }
};

export const getAllOrderWithPaid = async (id) => {
  try {
    const response = await axios.get(`https://homemealtaste.azurewebsites.net/api/Order/get-all-order-with-status-paid-by-meal-session-id?mealsessionId=${id}`)
    return response.data
  } catch (error) {
    console.log("error get all order b y mealsession id", error)
  }
}
export const getAllOrderCompleteHomePage = async (id) => {
  try {
    const response = await axios.get(`https://homemealtaste.azurewebsites.net/api/Order/get-all-order-with-status-completed`)
    return response.data
  } catch (error) {
    console.log("error get all order comleted by mealsession id", error)
  }
}
export const getAllOrderProcessingHomePage = async (id) => {
  try {
    const response = await axios.get(`https://homemealtaste.azurewebsites.net/api/MealSession/get-all-meal-session-with-status-processing`)
    return response.data
  } catch (error) {
    console.log("error get all order comleted by mealsession id", error)
  }
}
export const getAllNewOrderHomePage = async (id) => {
  try {
    const response = await axios.get(`https://homemealtaste.azurewebsites.net/api/Order/get-all-order`)
    return response.data
  } catch (error) {
    console.log("error get all order comleted by mealsession id", error)
  }
}

export const getAllSessionByAreaIdWithStatusOPEN = async (id) => {
  try {
    const response = await axios.get(
      `https://homemealtaste.azurewebsites.net/api/Session/get-all-session-by-area-id-with-status-open?areaid=${id}`
    );
    return response.data;
  } catch (error) {
    console.log("get all session by area Id", error);
  }
};

export const getAllMealSEssionWithStatusBeforeUpdateArea = async (id) => {
  try {
    const response = await axios.get(
      `https://homemealtaste.azurewebsites.net/api/MealSession/get-all-meal-session-with-not-status-completed-and-cancelled-by-kitchen-id?kitchenId=${id}`
    );
    return response.data;
  } catch (error) {
    console.log("get all meal session by fot update area ", error);
  }
};
export const UpdateAllMealSessionToCancel = async (value) => {
  try {
    await axios.patch(`https://homemealtaste.azurewebsites.net/api/MealSession/update-area-and-all-meal-session-with-status-processing`)
  } catch (error) {
    console.log("post status paid to complete errror", error)
  }
}

export const getAllPriceMealSessionByKitchenId = async (id) => {
  try {
    const response = await axios.get(
      `https://homemealtaste.azurewebsites.net/api/Kitchen/get-total-price-all-meal-session-by-kitchen-id?kitchenId=${id}`
    );
    return response.data;
  } catch (error) {
    console.log("get all meal session have price compelete kitchenid ", error);
  }
};
export const UpdateMealSesionStatus = async (value) => {
  try {
    await axios.patch(`https://homemealtaste.azurewebsites.net/api/MealSession/update-status-meal-session`)
  } catch (error) {
    console.log("post status paid to complete errror", error)
  }
}

export const updateMealSessionWhenUpdateArea = async (values) => {
  console.log("values for mealsesion updating area:", values);
  try {
    const response = await axios.put(
      "https://homemealtaste.azurewebsites.net/api/MealSession/update-area-and-all-meal-session-with-status-processing",
      values
    );

    // Log the response data for debugging
    console.log("Update Profile Response:", response.data);

    if (response.status === 200) {
      console.log("Update successful.");
    } else {
      console.error("Update failed. Unexpected status code:", response.status);
    }
  } catch (error) {
    console.error("Error updating profile:", error.message);
    console.error("Error details:", error.response);

    // Log the entire error object for more information
    console.error("Full error object:", error);
  }
};
export const postStatusOrder = async (id, value) => {
  try {
    console.log(id)
    await axios.patch(`https://homemealtaste.azurewebsites.net/api/Order/change-single-status-order?orderId=${id}&status=${value}`)
  } catch (error) {
    console.log("post status paid to complete or noteat errror", error)
  }
}

export const UpdateMealSessionStatus = async (value) => {
  try {
    await axios.patch(`https://homemealtaste.azurewebsites.net/api/MealSession/update-status-meal-session`, value)
    console.log("patch    UPDATE IDD ", value)
  } catch (error) {
    console.log("post status mealsesion cancel", error)
  }
}
export const getTransactionByUserID = async (id) => {
  try {
    const response = await axios.get(
      `https://homemealtaste.azurewebsites.net/api/Transaction/get-all-transaction-by-user-id?userid=${id}`
    );
    return response.data;
  } catch (error) {
    console.log("Error getting user order by id", error);
    throw error; // Rethrow the error so that the calling code can handle it
  }
};