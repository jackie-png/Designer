import { useContext } from "react"
import { statsArrays } from "./App"
//this will select and add the battalion selected to the battalion list for selector to calculate,

function TestContext(){

    const stats = useContext(statsArrays);

    function handleChange(){
        const newStats = [...stats.baseStats];
        newStats[0]++;
        stats.setBaseStats(newStats); // this works
    }

    return(
        <>
            <ul>
                {stats.baseStats.map((element, index) => (<li key={index}>{index}: {element} </li>))}
            </ul>
            <h1>Array1: {stats.baseStats}</h1>
            <button onClick={handleChange}>change</button>
        </>

    )
}

export default TestContext