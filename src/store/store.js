import { configureStore } from "@reduxjs/toolkit";
import user from './slices/user'
import admin from './slices/admin'

export default configureStore({
    reducer: {
        user,
        admin
    }
})