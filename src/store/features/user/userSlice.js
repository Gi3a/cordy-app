import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    jwttoken: null,
    id: null,
    login: null,
    name: null,
    phoneNumber: null,
    mail: null,
    address: null,
    avatar: null,
    ranking: null,
    cats: [],
    favorites: [],
    feedbacks: []
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
            state.cats = action.payload.cats;
            state.favorites = action.payload.favorites;
            state.feedbacks = action.payload.feedbacks;
        },
        setCats(state, action) {
            state.cats = action.payload.cats;
        },
        setFavorites(state, action) {
            state.favorites = action.payload.favorites;
        },
        unsetUser(state) {
            state.jwttoken = null;
            state.id = null;
            state.login = null;
            state.name = null;
            state.phoneNumber = null;
            state.mail = null;
            state.address = null;
            state.ranking = null;
            state.cats = null;
            state.favorites = null;
            state.feedbacks = null;
        }
    },
});

export const { setUser, unsetUser, setCats, setFavorites } = userSlice.actions;

export default userSlice.reducer;