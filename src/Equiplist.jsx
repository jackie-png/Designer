import { useContext, useEffect, useState, useRef } from "react";
import { statsArrays } from "./App";

function Equiplist(){
    const stats = useContext(statsArrays);
    const equipmentList = Array.from(stats.equipmentList, ([Name, Amount]) => ({Name, Amount}));
    return(
        <div>
            <h1>Equipment List:</h1>
            <ul>
                {equipmentList.map((element, index) => <li key = {index}>{element.Name} : {element.Amount}</li>)}
            </ul>
        </div>
    )

}

export default Equiplist;