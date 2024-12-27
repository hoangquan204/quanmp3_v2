import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../components/User/authSlice";
import notificationSlice from "../components/Notification/notificationSlice";
import themeSlice from "../theme/themeSlice";
import adminSlice from "../components/admin/adminSlice";
import messageSlice from "../components/Message/messageSlice";
import commentSlice from "../components/Comment/commentSlice";


export default configureStore({
    reducer: {
        auth: authSlice.reducer,
        notification: notificationSlice.reducer,
        theme: themeSlice.reducer,
        admin: adminSlice.reducer,
        message: messageSlice.reducer,
        comment: commentSlice.reducer,
    }
})