import { AppProvider } from "@/context/userContext";
import Starting from './startPage';
import React from "react";

const index = () => {
    return <AppProvider>
        <Starting/>
    </AppProvider>
}

export default index;