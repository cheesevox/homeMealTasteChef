import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import userSlice from "./slices/userSlice";
import mealSlice from "./slices/mealSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    user:userSlice,
    meal:mealSlice,
  },
});