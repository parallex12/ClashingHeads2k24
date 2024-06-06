import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    app: null
}

const firebase_expo_appSlice = createSlice({
    name: "fb_expo_app",
    initialState,
    reducers: {
        ConnectFBExpo: (state, action) => {
            return { ...state, app: action.payload }
        }
    }
})

export const { ConnectFBExpo } = firebase_expo_appSlice?.actions
export default firebase_expo_appSlice.reducer