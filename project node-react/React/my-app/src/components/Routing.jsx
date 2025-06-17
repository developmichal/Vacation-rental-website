
import { Route, Routes } from "react-router-dom"
import { Home } from "./Home"
import { Sign } from "./Sign"
import { Search } from "./Search"
import { Login } from "./Login"
import { PersonalArea } from "./PersonalArea"
import { ApartmentCategory } from "./ApartmentCategory"
import EditApartment from "./EditApartment"
import { PublishApartment } from "./PublishApartment"
import { Filter } from "./filter"
import  BigCard  from "./bigCard"


export const Routing = () => {
    // הצהרות על ניתובים
    return <>
        {/* תגית עוטפת לכל הניתובים */}
        <Routes>
        <Route path="" element={<Home></Home>}></Route>
            <Route path="/Home" element={<Home></Home>}></Route>
            <Route path="/Home/:id" element={<ApartmentCategory></ApartmentCategory>}></Route>
            <Route path="/Login" element={<Login></Login>}></Route> 
            <Route path="/Sign" element={<Sign></Sign>}></Route> 
            <Route path="/search" element={<Filter></Filter>}></Route>
            <Route path="/PersonalArea/:id" element={<PersonalArea></PersonalArea>}></Route> 
            <Route path="/editApartment/:id/:id1" element={<EditApartment></EditApartment>}></Route> 
            <Route path="/Add/:id" element={<PublishApartment></PublishApartment>}></Route> 
            <Route path="/apartment/getById/:id" element={<BigCard />} />


       
        </Routes>
    </>
}
