import { BrowserRouter } from "react-router-dom";
import { Nav } from "./Nav";
import { Home } from "./Home";
import { useRef } from "react";
import { Routing } from "./Routing";

export const Main = () => {


    return (
        <BrowserRouter>
            <Routing></Routing>
        </BrowserRouter>
    );
};
