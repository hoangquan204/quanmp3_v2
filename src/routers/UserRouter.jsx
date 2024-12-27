import { Route, Routes } from "react-router-dom";
import HomePage from "../components/HomePage";

function UserRouter() {
    return <>
        <Routes>
            <Route path='/*' element={<HomePage></HomePage>}></Route>
            {/* <Route path='/class/:id' element={<ClassRoomDetail></ClassRoomDetail>}></Route> */}
        </Routes>
    </>
}

export default UserRouter;