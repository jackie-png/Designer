import "./Popup.css"
import { useState, useContext } from "react";
import { statsArrays } from "./App";

function Popup(props) {

    const stats = useContext(statsArrays);
    const InfList = stats.units.Infantry_Bat; //list of all infantry battalions
    const MobList = stats.units.Motorized_Bat; // list of all mobile battalions
    const CSList = stats.units.Combat_Support_List; // list of all combat support
    const MSList = stats.units.Mobile_Support_List; // list of all mobile support
    const SCList = stats.units.Support_Companies; // list of all support companies
    const BatArr = stats.battalionArr; // list for displaying on table
    const batMap = stats.batMap; // list for calculating stats 
    const equipMap = stats.equipmentList; // map of equipment for this unit



    function addUnit(battalion){
        /**
         * THis function deals with adding a battalion to the battalion selection screen
         */
        console.log(battalion);
        console.log("Current battalions:" + BatArr);
        console.log("Selected: " + props.selected);
        console.log(stats.units.Infantry_Bat[0]);


        let newArr = [...BatArr];
        newArr[props.selected] = battalion;
        let newMap = new Map(batMap);
        let newEquipMap = new Map(equipMap);
        let newSupportMods = new Map(stats.supportModifiers);

        if (!newMap.has(battalion)){ //if the battalion map doesnt have the current battalion in it, add it in and set the count to 1
            newMap.set(battalion, 1);
        } else {
            newMap.set(battalion, (newMap.get(battalion)+1)); //incremenet the count of that battalion
        }

        console.log("Before");
        console.log(newEquipMap);

        for (const equipment of battalion.Equipment_List){ // calculating the equipment needed for this battalion
            if (!newEquipMap.has(equipment.Name)){ // if the euqpiment is not in the list add it in
                newEquipMap.set(equipment.Name, equipment.Amount);
            } else { // otherwise add the amount onto the existing amount
                newEquipMap.set(equipment.Name, (newEquipMap.get(equipment.Name)+equipment.Amount));
            }
        }

        //add the support modifiers to the accumulating object, only for support companies

        if (battalion.Type === "Support_Company"){
            for (let [modifier,stat] of Object.entries(battalion.Support_Modifier)){ // for every support company modifier inside the support company
                // add the battalion inside
                console.log(modifier)
                console.log(stat)
                if (newSupportMods.has(modifier)){ // if the map already has an entry for this battalion
                     for (let [modStat, value] of Object.entries(stat)){ // for every stat modifed 
                        console.log(modStat)
                        console.log(value)
                        if(Object.hasOwn(newSupportMods.get(modifier), modStat)){ // check if the object inside the map has this property
                            newSupportMods.get(modifier)[modStat] += value;
                        } else {
                            newSupportMods.get(modifier)[modStat] = value;
                        }
                    }   
                } else {
                    newSupportMods.set(modifier, stat)
                }
                console.log(newSupportMods)
            }
        }


        console.log("After");
        console.log(newEquipMap);
        console.log(newSupportMods);
        stats.setEquipmentList(newEquipMap);
        stats.setBatMap(newMap);
        stats.setBattalionArr(newArr);
        stats.setSuppMods(newSupportMods);

    }

    if (!props.isSupport){
        return(props.trigger)?(
                    <div className="Popup" onClick={()=>props.close(false)}>
                        <div className="innerPop">
                            <h1>
                                Division List: Slot {props.selected}
                            </h1>
                            <h2>
                                Click on a division below
                            </h2>
                            <h2>Technology Level: {props.year} tech</h2>

                            <div className="batList">
                                <h1>
                                    Infantry Battalions
                                </h1>
                                <ul>
                                    {InfList.map((element, index)=>{
                                        if (element.Intro_Year <= props.year){
                                            return <li key={index} onClick={()=>addUnit(element)}><h2>{element.Name}</h2></li>
                                        }
                                    })}
                                </ul>
                                <h1>
                                    Moterized Battalions
                                </h1>
                                <ul>
                                    {MobList.map((element, index)=>{
                                        if (element.Intro_Year <= props.year){
                                            return <li key={index} onClick={()=>addUnit(element)}><h2>{element.Name}</h2></li>
                                        }
                                    })}
                                </ul>
                                <h1>
                                    Combat Support Battalions
                                </h1>
                                <ul>
                                    {CSList.map((element, index)=>{
                                        if (element.Intro_Year <= props.year){
                                            return <li key={index} onClick={()=>addUnit(element)}><h2>{element.Name}</h2></li>
                                        }
                                    })}
                                </ul>
                                <h1>
                                    Mobile Combat Support Battalions
                                </h1>
                                <ul>
                                    {MSList.map((element, index)=>{
                                        if (element.Intro_Year <= props.year){
                                            return <li key={index} onClick={()=>addUnit(element)}><h2>{element.Name}</h2></li>
                                        }
                                    })}
                                </ul>    
                            </div>
                            
                            <button onClick={()=> props.close(false)}>
                                close
                            </button>

                        </div>
                    </div>
                ) : "";
    } else {
        return(props.trigger)?(
            <div className="Popup" onClick={()=>props.close(false)}>
                <div className="innerPop">
                    <h1>
                        Support Company List: Slot {props.selected}
                    </h1>
                    <h2>
                        Click on a division below
                    </h2>
    
                    <div className="batList">
                        <ul>
                            {SCList.map((element, index)=><li key={index} onClick={()=>{
                                console.log("hi there");
                                console.log(element);
                                for (let i = 0; i < 5; i++){
                                    console.log(BatArr[i]);
                                    console.log(element.Name == BatArr[i].Name);

                                    if (element.Name === BatArr[i].Name){
                                        console.log(true);
                                        return null
                                    }
                                }
                                addUnit(element);
                            }}>{element.Name}
                                    
                            </li>)}

                        </ul>
                    </div>
                    
                    <button onClick={()=> props.close(false)}>
                        close
                    </button>
    
                </div>
            </div>
        ) : "";
    } 
        
}

export default Popup