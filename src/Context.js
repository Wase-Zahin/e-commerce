import React, { useContext, createContext, useState } from "react";

const myContext = createContext();

export const MyGlobalWrapper = ({ children, id }) => {
    const hel = "hello";
    
    return (
        <myContext.Provider
            value={{ hel }}>{children}
        </myContext.Provider>
    )
}

export const MyContextProvider = () => {
    return useContext(myContext);
}