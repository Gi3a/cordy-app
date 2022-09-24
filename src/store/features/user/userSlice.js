import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const initialState = {
    jwttoken: null,
    id: null,
    login: null,
    name: null,
    phoneNumber: null,
    mail: null,
    address: null,
    avatar: null,
    ranking: null
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action) {
            state.jwttoken = action.payload.jwttoken;
            state.id = action.payload.id;
            state.login = action.payload.login;
            state.name = action.payload.name;
            state.phoneNumber = action.payload.phoneNumber;
            state.mail = action.payload.mail;
            state.address = action.payload.address;
            state.avatar = action.payload.avatar;
            state.ranking = action.payload.ranking;
        },
        unsetUser(state) {
            state.jwttoken = null;
            state.id = null;
            state.login = null;
            state.name = null;
            state.phoneNumber = null;
            state.mail = null;
            state.address = null;
        }
    },
});

export const { setUser, unsetUser } = userSlice.actions;

export default userSlice.reducer;