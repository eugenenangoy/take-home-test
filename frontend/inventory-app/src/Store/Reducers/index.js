import { combineReducers } from "redux"
import barangReducers from "./barangReducers"
import userReducers from "./userReducers"

export default combineReducers({
    barangReducers,
    userReducers
})