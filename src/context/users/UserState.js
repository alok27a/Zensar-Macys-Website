import React from "react";
import UserContext from "./userContext";

const UserState = (props) =>{

    const state ={
        
    }

    // useState to update the state
    return (
        <UserContext.Provider value={state}>
            {props.children}
        </UserContext.Provider>
    )

}

export default UserState;