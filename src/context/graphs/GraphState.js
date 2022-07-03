import React, { useState } from "react";
import GraphContext from "./graphContext";

const GraphState = (props) => {


    const [graphcontext1, setGraphContext1] = useState({ forcastSum: "0" });
    const [graphcontext2, setGraphContext2] = useState({ previousSum: "0" });

    // useState to update the state
    return (
        <GraphContext.Provider value={{ graphcontext1, setGraphContext1, graphcontext2, setGraphContext2 }}>
            {props.children}
        </GraphContext.Provider>
    )

}

export default GraphState;