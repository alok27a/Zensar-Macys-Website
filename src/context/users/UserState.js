import React, { useState } from "react";
import UserContext from "./userContext";

const UserState = (props) => {


    const [usercontext, setUserContext] = useState({ category: "1", startDate: "", endDate: "" });

    // useState to update the state
    return (
        <UserContext.Provider value={{usercontext, setUserContext}}>
            {props.children}
        </UserContext.Provider>
    )

}

export default UserState;