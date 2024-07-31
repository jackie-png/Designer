//this will recalculate the stats
import { useContext, useEffect, useState, useRef } from "react";
import { statsArrays } from "./App";
import styles from './Tables.module.css';
import Popup from "./Popup";
//import {speed, hp, organization, recoveryRate, suppression, supplyUse, weight, trickleBack, softAtk, hardAtk, defense, breakthrough, airAtk, combatWidth, armour, hardness, initiative, entrench, piercing, avg_relia, xpLoss, recon, reliBonus, capture_ratio, manpower, training, fuel_cap, fuel_usage} from "./Statscalc.js"
import {list, softAtk} from "./Stats_Calculator.js";


function Selector(){
    const stats = useContext(statsArrays);
    const [isInitialMount, setIsInitialMount] = useState(true);
    const batMap = stats.batMap;
    const [popUp, setPop] = useState(false);
    const [selectedSquare, setSelectedSquare] = useState(-1);
    const [isSupportSelected, setIsSupport] = useState(false);    

    function updateStats(){
        /*
        * This Function updates the stats of the division
        */

        //new arrays for the new stats
        console.log("updating stats")
        const newAttackStats = [0,0,0,0,0,0,0,0,0,0,0,0];
        const newBaseStats = [0,0,0,0,0,0,0,0,0,0,0,0];
        const newEquipmentCost = [0,0,0,0];
        

        // //go through each stat and call the respective function to calculate the new stat
        // newBaseStats[0] = speed(batMap,stats.tech, stats.doctrineBuffsMap);
        // newBaseStats[1] = hp(batMap,stats.tech);
        // newBaseStats[2] = organization(batMap,stats.tech, stats.doctrineBuffsMap);
        // newBaseStats[3] = recoveryRate(batMap,stats.tech, stats.doctrineBuffsMap);
        // newBaseStats[4] = recon(batMap,stats.tech, stats.doctrineBuffsMap);
        // newBaseStats[5] = suppression(batMap,stats.tech, stats.doctrineBuffsMap);
        // newBaseStats[6] = weight(batMap,stats.tech);
        // newBaseStats[7] = supplyUse(batMap,stats.tech, stats.doctrineBuffsMap);
        // newBaseStats[8] = avg_relia(batMap,stats.tech);
        // newBaseStats[9] = reliBonus(batMap,stats.tech);
        // newBaseStats[10] = trickleBack(batMap,stats.tech);
        // newBaseStats[11] = xpLoss(batMap,stats.tech);

        newAttackStats[0] = softAtk(batMap,stats.year, stats.doctrineBuffsMap, stats.supportModifiers);
        // newAttackStats[1] = hardAtk(batMap,stats.tech, stats.doctrineBuffsMap);
        // newAttackStats[2] = airAtk(batMap,stats.tech, stats.doctrineBuffsMap);
        // newAttackStats[3] = defense(batMap,stats.tech, stats.doctrineBuffsMap);
        // newAttackStats[4] = breakthrough(batMap,stats.tech, stats.doctrineBuffsMap);
        // newAttackStats[5] = armour(batMap,stats.tech);
        // newAttackStats[6] = piercing(batMap,stats.tech);
        // newAttackStats[7] = initiative(batMap,stats.tech); 
        // //newAttackStats[8] =
        // newAttackStats[9] = capture_ratio(batMap,stats.tech);
        // newAttackStats[10] = combatWidth(batMap,stats.tech, stats.doctrineBuffsMap);
        // newAttackStats[11] = hardness(batMap,stats.tech);

        // newEquipmentCost[0] = manpower(batMap,stats.tech);
        // newEquipmentCost[1] = training(batMap,stats.tech);
        // newEquipmentCost[2] = fuel_cap(batMap,stats.tech);
        // newEquipmentCost[3] = fuel_usage(batMap,stats.tech);

        list();

        //set the new stats in
        stats.setAttackStats(newAttackStats);
        stats.setBaseStats(newBaseStats);
        stats.setEquipmentCost(newEquipmentCost);

    }
    useEffect(() => {
        // Do nothing on the initial mount
    }, []);

    useEffect(() => {
        if (isInitialMount) {
            setIsInitialMount(false); // Skip effect on initial mount
        } else {
            console.log(stats.battalionArr);
            console.log(stats.tech);
            console.log(stats.doctrineBuffsMap);
            console.log(stats.doctrineBuffs_Army);
            updateStats();
        }
    }, [stats.battalionArr, stats.tech, stats.doctrineBuffsMap, stats.doctrineBuffs_Army]);// this will trigger when either the battalions, tech level, or doctrine is changed(soon)

    function removeBattalion(battalion, index){
        /**
         * This function is responsible for removing the battalion selected
         */
        let newMap = new Map(batMap);
        let newArr = [...stats.battalionArr];

        let newEquipMap = new Map(stats.equipmentList);
        console.log(newArr);
        if (newMap.get(battalion) > 1){ // decrement the battalion's count unless it is at one, then remove the battalion from the map
            newMap.set(battalion, newMap.get(battalion)-1);
        } else {
            newMap.delete(battalion);
        }

        for (const equipment of battalion.Equipment_List){ // if removing the amoutn fo equipment results in something less than or 0, remove it from the list
            if (newEquipMap.get(equipment.Name) - equipment.Amount <= 0){
                newEquipMap.delete(equipment.Name);
            } else {
                newEquipMap.set(equipment.Name, newEquipMap.get(equipment.Name) - equipment.Amount);
            }
        }
        newArr[index] = {"Name":"Add Battalion"};
        console.log(newEquipMap);
        stats.setEquipmentList(newEquipMap);
        stats.setBattalionArr(newArr);
        stats.setBatMap(newMap);
    }
 //onClick={()=> removeBattalion(index,element[0])}

    function changeYear(e){
        /*
        * This function deals with changing the tech level of the division
        */
        let newYearTech = new Map(stats.yearTech[e.target.value].map(element => [element.Name, element]));
        console.log("Year changed");
        console.log(newYearTech);
        stats.setYear(e.target.value);
        stats.setTechLevel(newYearTech);

    }
    return(
        <div>
            <button onClick={()=>{
                console.log(stats.battalionArr);
                console.log(stats.tech);
                console.log(stats.doctrineBuffsMap);
                console.log(stats.doctrineBuffs_Army);

            }}>
                console log stats
            </button>
            <label>
                Select Year to change Technology Level: 
                <select value={stats.year} onChange={(e) => changeYear(e)}>
                    <option value={1936}>1936</option>
                    <option value={1940}>1940</option>
                    <option value={1942}>1942</option>
                    <option value={1945}>1945</option>
                </select>                
            </label>

            <h1>Year: {stats.year}</h1>

            <table className={styles.table}>
                <tr>
                    <th className={styles.tableHeader}>
                        <h1>
                            Support Companies
                        </h1>
                    </th>
                    <th></th>
                    <th></th>
                    <th className={styles.tableHeader}>
                        <h1>Combat Battalions</h1>
                    </th>
                    <th></th>
                    <th></th>
                </tr>
                <tr>
                    <td className={styles.tableCell}>
                        <h1 onClick={()=>{
                            if (stats.battalionArr[0].Name == "Add Battalion"){
                                setPop(true);
                                setSelectedSquare(0);
                                setIsSupport(true);                                
                            } else {
                                removeBattalion(stats.battalionArr[0],0);
                            }
                            }}>{stats.battalionArr[0].Name}
                        </h1>
                    </td>
                    <td className={styles.tableCell}>
                        <h1 onClick={()=>{
                            if (stats.battalionArr[5].Name == "Add Battalion"){
                                setPop(true);
                                setSelectedSquare(5);
                                setIsSupport(false);                                
                            } else {
                                removeBattalion(stats.battalionArr[5],5);
                            }
                            }}>{stats.battalionArr[5].Name}
                        </h1>
                    </td>
                    <td className={styles.tableCell}>
                    <h1 onClick={()=>{
                            if (stats.battalionArr[6].Name == "Add Battalion"){
                                setPop(true);
                                setSelectedSquare(6);
                                setIsSupport(false);                                
                            } else {
                                removeBattalion(stats.battalionArr[6],6);
                            }
                            }}>
                            {stats.battalionArr[6].Name}
                        </h1>
                    </td>
                    <td className={styles.tableCell}>
                        <h1 onClick={()=>{
                            if (stats.battalionArr[7].Name == "Add Battalion"){
                                setPop(true);
                                setSelectedSquare(7);
                                setIsSupport(false);                                
                            } else {
                                removeBattalion(stats.battalionArr[7],7);
                            }
                            }}>
                            {stats.battalionArr[7].Name}
                        </h1>
                    </td>
                    <td className={styles.tableCell}>
                        <h1 onClick={()=>{
                            if (stats.battalionArr[8].Name == "Add Battalion"){
                                setPop(true);
                                setSelectedSquare(8);
                                setIsSupport(false);                                
                            } else {
                                removeBattalion(stats.battalionArr[8],8);
                            }
                            }}>
                            {stats.battalionArr[8].Name}
                        </h1>
                    </td>
                    <td className={styles.tableCell}>
                        <h1 onClick={()=>{
                            if (stats.battalionArr[9].Name == "Add Battalion"){
                                setPop(true);
                                setSelectedSquare(9);
                                setIsSupport(false);                                
                            } else {
                                removeBattalion(stats.battalionArr[9],9);
                            }
                            }}>
                            {stats.battalionArr[9].Name}
                        </h1>
                    </td>
                </tr>
                    <td className={styles.tableCell}>
                    <h1 onClick={()=>{
                            if (stats.battalionArr[1].Name == "Add Battalion"){
                                setPop(true);
                                setSelectedSquare(1);
                                setIsSupport(true);                                
                            } else {
                                removeBattalion(stats.battalionArr[1],1);
                            }
                            }}>
                            {stats.battalionArr[1].Name}
                        </h1>
                    </td>
                    <td className={styles.tableCell}>
                    <h1 onClick={()=>{
                            if (stats.battalionArr[10].Name == "Add Battalion"){
                                setPop(true);
                                setSelectedSquare(10);
                                setIsSupport(false);                                
                            } else {
                                removeBattalion(stats.battalionArr[10],10);
                            }
                            }}>{stats.battalionArr[10].Name}</h1>
                    </td>
                    <td className={styles.tableCell}>
                    <h1 onClick={()=>{
                            if (stats.battalionArr[11].Name == "Add Battalion"){
                                setPop(true);
                                setSelectedSquare(11);
                                setIsSupport(false);                                
                            } else {
                                removeBattalion(stats.battalionArr[11],11);
                            }
                            }}>{stats.battalionArr[11].Name}</h1>
                    </td>
                    <td className={styles.tableCell}>
                    <h1 onClick={()=>{
                            if (stats.battalionArr[12].Name == "Add Battalion"){
                                setPop(true);
                                setSelectedSquare(12);
                                setIsSupport(false);                                
                            } else {
                                removeBattalion(stats.battalionArr[12],12);
                            }
                            }}>{stats.battalionArr[12].Name}</h1>
                    </td>
                    <td className={styles.tableCell}>
                    <h1 onClick={()=>{
                            if (stats.battalionArr[13].Name == "Add Battalion"){
                                setPop(true);
                                setSelectedSquare(13);
                                setIsSupport(false);                                
                            } else {
                                removeBattalion(stats.battalionArr[13],13);
                            }
                            }}>{stats.battalionArr[13].Name}</h1>
                    </td>
                    <td className={styles.tableCell}>
                        <h1 onClick={()=>{
                            if (stats.battalionArr[14].Name == "Add Battalion"){
                                setPop(true);
                                setSelectedSquare(14);
                                setIsSupport(false);                                
                            } else {
                                removeBattalion(stats.battalionArr[14],14);
                            }
                            }}>{stats.battalionArr[14].Name}
                        </h1>
                    </td>
                <tr>
                    <td className={styles.tableCell}>
                    <h1 onClick={()=>{
                            if (stats.battalionArr[2].Name == "Add Battalion"){
                                setPop(true);
                                setSelectedSquare(2);
                                setIsSupport(true);                                
                            } else {
                                removeBattalion(stats.battalionArr[2],2);
                            }
                            }}>{stats.battalionArr[2].Name}
                        </h1>
                    </td>
                    <td className={styles.tableCell}>
                    <h1 onClick={()=>{
                            if (stats.battalionArr[15].Name == "Add Battalion"){
                                setPop(true);
                                setSelectedSquare(15);
                                setIsSupport(false);                                
                            } else {
                                removeBattalion(stats.battalionArr[15],15);
                            }
                            }}>
                            {stats.battalionArr[15].Name}
                        </h1> 
                    </td>
                    <td className={styles.tableCell}>
                    <h1 onClick={()=>{
                            if (stats.battalionArr[16].Name == "Add Battalion"){
                                setPop(true);
                                setSelectedSquare(16);
                                setIsSupport(false);                                
                            } else {
                                removeBattalion(stats.battalionArr[16],16);
                            }
                            }}>
                            {stats.battalionArr[16].Name}
                        </h1> 
                    </td>
                    <td className={styles.tableCell}>
                    <h1 onClick={()=>{
                            if (stats.battalionArr[17].Name == "Add Battalion"){
                                setPop(true);
                                setSelectedSquare(17);
                                setIsSupport(false);                                
                            } else {
                                removeBattalion(stats.battalionArr[17],17);
                            }
                            }}>
                            {stats.battalionArr[17].Name}
                        </h1> 
                    </td>
                    <td className={styles.tableCell}>
                    <h1 onClick={()=>{
                            if (stats.battalionArr[18].Name == "Add Battalion"){
                                setPop(true);
                                setSelectedSquare(18);
                                setIsSupport(false);                                
                            } else {
                                removeBattalion(stats.battalionArr[18],18);
                            }
                            }}>{stats.battalionArr[18].Name}
                        </h1>
                    </td>
                    <td className={styles.tableCell}>
                    <h1 onClick={()=>{
                            if (stats.battalionArr[19].Name == "Add Battalion"){
                                setPop(true);
                                setSelectedSquare(19);
                                setIsSupport(false);                                
                            } else {
                                removeBattalion(stats.battalionArr[19],19);
                            }
                            }}>{stats.battalionArr[19].Name}
                        </h1>
                    </td>
                </tr>
                    <td className={styles.tableCell}>
                    <h1 onClick={()=>{
                            if (stats.battalionArr[3].Name == "Add Battalion"){
                                setPop(true);
                                setSelectedSquare(3);
                                setIsSupport(true);                                
                            } else {
                                removeBattalion(stats.battalionArr[3],3);
                            }
                            }}>{stats.battalionArr[3].Name}
                        </h1>
                    </td>
                    <td className={styles.tableCell}>
                    <h1 onClick={()=>{
                            if (stats.battalionArr[20].Name == "Add Battalion"){
                                setPop(true);
                                setSelectedSquare(20);
                                setIsSupport(false);                                
                            } else {
                                removeBattalion(stats.battalionArr[20],20);
                            }
                            }}>{stats.battalionArr[20].Name}
                        </h1>
                    </td>
                    <td className={styles.tableCell}>
                    <h1 onClick={()=>{
                            if (stats.battalionArr[21].Name == "Add Battalion"){
                                setPop(true);
                                setSelectedSquare(21);
                                setIsSupport(false);                                
                            } else {
                                removeBattalion(stats.battalionArr[21],21);
                            }
                            }}>{stats.battalionArr[21].Name}
                        </h1>
                    </td>
                    <td className={styles.tableCell}>
                    <h1 onClick={()=>{
                            if (stats.battalionArr[22].Name == "Add Battalion"){
                                setPop(true);
                                setSelectedSquare(22);
                                setIsSupport(false);                                
                            } else {
                                removeBattalion(stats.battalionArr[22],22);
                            }
                            }}>{stats.battalionArr[22].Name}
                        </h1>
                    </td>
                    <td className={styles.tableCell}>
                    <h1 onClick={()=>{
                            if (stats.battalionArr[23].Name == "Add Battalion"){
                                setPop(true);
                                setSelectedSquare(23);
                                setIsSupport(false);                                
                            } else {
                                removeBattalion(stats.battalionArr[23],23);
                            }
                            }}>{stats.battalionArr[23].Name}
                        </h1>
                    </td>
                    <td className={styles.tableCell}>
                    <h1 onClick={()=>{
                            if (stats.battalionArr[24].Name == "Add Battalion"){
                                setPop(true);
                                setSelectedSquare(24);
                                setIsSupport(false);                                
                            } else {
                                removeBattalion(stats.battalionArr[24],24);
                            }
                            }}>{stats.battalionArr[24].Name}
                        </h1>
                    </td>
                <tr>
                    <td className={styles.tableCell}>
                    <h1 onClick={()=>{
                            if (stats.battalionArr[4].Name == "Add Battalion"){
                                setPop(true);
                                setSelectedSquare(4);
                                setIsSupport(true);                                
                            } else {
                                removeBattalion(stats.battalionArr[4],4);
                            }
                            }}>{stats.battalionArr[4].Name}
                        </h1>
                    </td>
                    <td className={styles.tableCell}>
                    <h1 onClick={()=>{
                            if (stats.battalionArr[25].Name == "Add Battalion"){
                                setPop(true);
                                setSelectedSquare(25);
                                setIsSupport(false);                                
                            } else {
                                removeBattalion(stats.battalionArr[25],25);
                            }
                            }}>{stats.battalionArr[25].Name}
                        </h1>
                    </td>
                    <td className={styles.tableCell}>
                    <h1 onClick={()=>{
                            if (stats.battalionArr[26].Name == "Add Battalion"){
                                setPop(true);
                                setSelectedSquare(26);
                                setIsSupport(false);                                
                            } else {
                                removeBattalion(stats.battalionArr[26],26);
                            }
                            }}>{stats.battalionArr[26].Name}
                        </h1>
                    </td>
                    <td className={styles.tableCell}>
                    <h1 onClick={()=>{
                            if (stats.battalionArr[27].Name == "Add Battalion"){
                                setPop(true);
                                setSelectedSquare(27);
                                setIsSupport(false);                                
                            } else {
                                removeBattalion(stats.battalionArr[27],27);
                            }
                            }}>{stats.battalionArr[27].Name}
                        </h1>
                    </td>
                    <td className={styles.tableCell}>
                    <h1 onClick={()=>{
                            if (stats.battalionArr[28].Name == "Add Battalion"){
                                setPop(true);
                                setSelectedSquare(28);
                                setIsSupport(false);                                
                            } else {
                                removeBattalion(stats.battalionArr[28],28);
                            }
                            }}>{stats.battalionArr[28].Name}
                        </h1>
                    </td>
                    <td className={styles.tableCell}>
                        <h1 onClick={()=>{
                            if (stats.battalionArr[29].Name == "Add Battalion"){
                                setPop(true);
                                setSelectedSquare(29);
                                setIsSupport(false);                                
                            } else {
                                removeBattalion(stats.battalionArr[29],29);
                            }
                            }}>{stats.battalionArr[29].Name}
                        </h1>
                    </td>
                </tr>
            </table>
            <Popup trigger = {popUp} close = {setPop} selected = {selectedSquare} isSupport = {isSupportSelected} year = {stats.year}/>
        </div>
    );
}

export default Selector