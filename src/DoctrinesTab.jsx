import { useContext, useEffect, useState, useRef } from "react";
import { statsArrays } from "./App";
import styles from './DoctrineTab.module.css';
import doctrinelist from './Units&Data/Doctrines.json';


function statsMerger(stat, acc){ // adds the stats of a doctrine upgrade into an acc
    let newAcc = acc;
    for(let [key, value] of Object.entries(stat)){ //key is the stat that will be increased, value is the number that will be applied
        //check if the acc has the current key

        if (Object.hasOwn(acc, key)){ // if the key is already inside the object, add the new value onto the accumulated stat
            //hasOwn takes an object and a key, returns a boolean representing if the key is inside the object
            let newStat = newAcc[key] + value;
            newAcc[key] = newStat;
        } else {
            newAcc[key] = value; // otherwise add the stat onto the accumulator
        }
    }
    return newAcc
}

function DoctrineTab(props){
    const stats = useContext(statsArrays);

    // each array here controls the checkboxes and whether they are checked or not
    const [mobChecked, setMobChecked] = useState(new Array(16).fill(false));
    const [supChecked, setSupChecked] = useState(new Array(16).fill(false));
    const [grdChecked, setGrdChecked] = useState(new Array(16).fill(false));
    const [masChecked, setMasChecked] = useState(new Array(15).fill(false));

    //what is the current doctrine selected
    const [currentDoc, setCurrentDoc] = useState("");

    const [doctrineBuffArrays,setNewBuffs] = useState(new Map()); // this map holds all the buffs towards each catagory, map element ("type", [buff 1, buff2, ...])
    const tempMap = useRef(new Map()); // replace the tempMap with the doctrineBuffsMap



    function choosingMainDoctrine(event){
        /**
         * This Function selects the main doctrine that will be used to buff divisions
         */
        const value = JSON.parse(event.target.value);
        const selectedDoctrine = value.doctrine;
        const buffs = value.buffs;

        const newBuffsArray = new Map(doctrineBuffArrays);

        var newMobChecked = [...mobChecked];

        var newSupChecked = [...supChecked];

        var newGrdChecked = [...grdChecked];

        var newMasChecked = [...masChecked];

        switch (selectedDoctrine) { //differentiates which doctrine had been selected, they all do the same thing but for their respective doctrine
            case "Mobile Warfare":
                if (!newMobChecked[0]){ // check if the checkbox has been checked or not

                    //clear all the other checked boxes, clear the doctrinebuffs, and set the current doctrine to this one
                    newSupChecked = newSupChecked.fill(false);
                    newGrdChecked = newSupChecked.fill(false);
                    newMasChecked = newSupChecked.fill(false);

                    setCurrentDoc(selectedDoctrine);
                    newBuffsArray.clear();

                    newMobChecked[0] = true; // check the box

                    for (let [key, value] of Object.entries(buffs)){ // add the current upgrade's buff into the doctrinebuffs map

                        if(newBuffsArray.get(key) == null){
                            newBuffsArray.set(key, [value]);
                        } else {
                            let newArr = newBuffsArray.get(key)
                            newArr.push(value)

                        }
                    }
                } else { // if the box has been unchecked, clear the current doctrine selected and uncheck all the upgrades and clear the buff map
                    setCurrentDoc("");
                    newMobChecked = newMobChecked.fill(false);                    
                    newBuffsArray.clear();

                }
                break;
            case "Superior Firepower":

                if (!newSupChecked[0]){ // check if the checkbox has been checked or not

                    //clear all the other checked boxes, clear the doctrinebuffs, and set the current doctrine to this one
                    newMobChecked = newMobChecked.fill(false);
                    newGrdChecked = newGrdChecked.fill(false);
                    newMasChecked = newMasChecked.fill(false);

                    setCurrentDoc(selectedDoctrine);
                    newBuffsArray.clear();

                    newSupChecked[0] = true; // check the box

                    for (let [key, value] of Object.entries(buffs)){ // add the current upgrade's buff into the doctrinebuffs map

                        if(newBuffsArray.get(key) == null){
                            newBuffsArray.set(key, [value]);
                        } else {
                            let newArr = newBuffsArray.get(key)
                            newArr.push(value)

                        }
                    }
                } else { // if the box has been unchecked, clear the current doctrine selected and uncheck all the upgrades and clear the buff map
                    setCurrentDoc("");
                    newSupChecked = newSupChecked.fill(false);                    
                    newBuffsArray.clear();

                }
                break;

            case "Grand Battleplan":
                if (!newGrdChecked[0]){ // check if the checkbox has been checked or not

                    //clear all the other checked boxes, clear the doctrinebuffs, and set the current doctrine to this one
                    newSupChecked = newSupChecked.fill(false);
                    newMobChecked = newMobChecked.fill(false);
                    newMasChecked = newMasChecked.fill(false);

                    setCurrentDoc(selectedDoctrine);
                    newBuffsArray.clear();

                    newGrdChecked[0] = true; // check the box

                    for (let [key, value] of Object.entries(buffs)){ // add the current upgrade's buff into the doctrinebuffs map

                        if(newBuffsArray.get(key) == null){
                            newBuffsArray.set(key, [value]);
                        } else {
                            let newArr = newBuffsArray.get(key)
                            newArr.push(value)

                        }
                    }
                } else { // if the box has been unchecked, clear the current doctrine selected and uncheck all the upgrades and clear the buff map
                    setCurrentDoc("");
                    newGrdChecked = newGrdChecked.fill(false);                    
                    newBuffsArray.clear();

                }
                break;
            case "Mass Assault":
                if (!newMasChecked[0]){ // check if the checkbox has been checked or not

                    //clear all the other checked boxes, clear the doctrinebuffs, and set the current doctrine to this one
                    newSupChecked = newSupChecked.fill(false);
                    newMobChecked = newMobChecked.fill(false);
                    newGrdChecked = newGrdChecked.fill(false);

                    setCurrentDoc(selectedDoctrine);
                    newBuffsArray.clear();

                    newMasChecked[0] = true; // check the box

                    for (let [key, value] of Object.entries(buffs)){ // add the current upgrade's buff into the doctrinebuffs map

                        if(newBuffsArray.get(key) == null){
                            newBuffsArray.set(key, [value]);
                        } else {
                            let newArr = newBuffsArray.get(key)
                            newArr.push(value)

                        }
                    }
                } else { // if the box has been unchecked, clear the current doctrine selected and uncheck all the upgrades and clear the buff map
                    setCurrentDoc("");
                    newMasChecked = newMasChecked.fill(false);                    
                    newBuffsArray.clear();

                }
                break;
            default:
                break;
        }

        // set the states to their new versions
        setMobChecked(newMobChecked);
        setSupChecked(newSupChecked);
        setGrdChecked(newGrdChecked);
        setMasChecked(newMasChecked);
        setNewBuffs(newBuffsArray);
        
    }

    function addDoctrine(event){

        /**
         * This Function deals with adding the upgrades within the main doctrine selected
        */
        

        const value = JSON.parse(event.target.value);
        const selectedDoctrine = value.doctrine;
        let index = value.index;
        const buffs = value.buffs
        let newMobChecked = [...mobChecked];
        let newSupChecked = [...supChecked];
        let newMasChecked = [...masChecked];
        let newGrdChecked = [...grdChecked];


        const newBuffsArray = new Map(doctrineBuffArrays);

        switch (selectedDoctrine) { // differentiate which doctrine upgrade had been selected
            case "Mobile Warfare":
                if (!newMobChecked[index]){ // add the selected buff onto the buffArray map
                    newMobChecked[index] = true;

                    // for every entry in the buffs of the selected upgrade, add them to the buffs array map if they are not there
                    for (let [key, value] of Object.entries(buffs)){ 
                        if(!newBuffsArray.has(key)){
                            newBuffsArray.set(key, [value]);
                        } else { // if the key is in the map, push this upgrade to the end of the array of the coresponding key
                            let newArr = newBuffsArray.get(key);
                            newArr.push(value);
                        }
                    }
                } else { // remove the buff from the buff array map
                    for (let ind = index; ind < mobChecked.length; ind++){
                                  
                        if(!mobChecked[ind]){
                            continue;
                        } else {
                            for (let key in doctrinelist.Mobile_Warfare[ind]){
                                if (key == "Nothing"){ // if the key is "nothing", this upgrade affects no battalion, move on to the next element
                                    break;
                                } else { // otherwise pop the last element of the corresponding array
                                    let newArr = newBuffsArray.get(key);
                                    newArr.pop();
                                    newBuffsArray.set(key, newArr);
                                }
                            }

                        }
                        newMobChecked[ind] = false;

                    }
                }
                setMobChecked(newMobChecked);
                console.log(newBuffsArray);


                break;
            case "Superior Firepower":
                if (!newSupChecked[index]){ // add the selected buff onto the buffArray map
                    newSupChecked[index] = true;
                    for (let [key, value] of Object.entries(buffs)){
                        if(!newBuffsArray.has(key)){
                            newBuffsArray.set(key, [value]);
                        } else {
                            let newArr = newBuffsArray.get(key);
                            newArr.push(value);
                        }
                    }
                } else { // remove the buff from the buff array map
                    for (let ind = index; ind < supChecked.length; ind++){
                                  
                        if(!supChecked[ind]){
                            continue;
                        } else {

                            for (let key in doctrinelist.Superior_Firepower[ind]){
                                if (key == "Nothing"){
                                    break;
                                } else {
                                    let newArr = newBuffsArray.get(key);
                                    newArr.pop();
                                    newBuffsArray.set(key, newArr);
                                }
                            }
                        }
                        newSupChecked[ind] = false;

                    }
                }
                setSupChecked(newSupChecked);

                break;
            case "Grand Battleplan":
                if (!newGrdChecked[index]){ // add the selected buff onto the buffArray map
                    newGrdChecked[index] = true;
                    for (let [key, value] of Object.entries(buffs)){
                        if(!newBuffsArray.has(key)){
                            newBuffsArray.set(key, [value]);
                        } else {
                            let newArr = newBuffsArray.get(key);
                            newArr.push(value);
                        }
                    }
                } else { // remove the buff from the buff array map
                    for (let ind = index; ind < grdChecked.length; ind++){
                                  
                        if(!grdChecked[ind]){
                            continue;
                        } else {

                            for (let key in doctrinelist.Grand_Battleplan[ind]){
                                if (key == "Nothing"){
                                    break;
                                } else {
                                    let newArr = newBuffsArray.get(key);
                                    newArr.pop();
                                    newBuffsArray.set(key, newArr);
                                }
                            }
                        }
                        newSupChecked[ind] = false;

                    }
                }
                setGrdChecked(newGrdChecked);
                console.log(newBuffsArray);
                break;
            case "Mass Assault":
                if (!newMasChecked[index]){ // add the selected buff onto the buffArray map
                    newMasChecked[index] = true;
                    for (let [key, value] of Object.entries(buffs)){
                        if(!newBuffsArray.has(key)){
                            newBuffsArray.set(key, [value]);
                        } else {
                            let newArr = newBuffsArray.get(key);
                            newArr.push(value);
                        }
                    }
                } else { // remove the buff from the buff array map
                    for (let ind = index; ind < masChecked.length; ind++){
                                  
                        if(!masChecked[ind]){
                            continue;
                        } else {

                            for (let key in doctrinelist.Mass_Assault[ind]){
                                if (key == "Nothing"){
                                    break;
                                } else {
                                    let newArr = newBuffsArray.get(key);
                                    newArr.pop();
                                    newBuffsArray.set(key, newArr);
                                }
                            }
                        }
                        newMasChecked[ind] = false;

                    }
                }
            
                setMasChecked(newMasChecked);
                console.log(newBuffsArray);
                break;
            default:
                break;
        }

        setNewBuffs(newBuffsArray);

    }

    useEffect(()=>{
        //recalculate the doctrinebuffs when the doctrinebuffarrays gets changed
        //console.log("in useEffect");
        tempMap.current.clear(); // clear the current accumulated stats to re calculate things

        doctrineBuffArrays.forEach((value, key) => { // key is the type of battalion, value is an array of objects representing buffs that unit will get
            // console.log(key);
            // console.log(value);

            //first see if you need an empty accumulator or if you can continue using the map's accumulated stats

            let acc = {};
            if (tempMap.current.has(key)){ // check if the accumulator map has the current key
                acc = tempMap.current.get(key); // the acc is now the accumulated stats previously in the loop
            }

            for(let stat of value){
                //console.log(stat);
                acc = statsMerger(stat, acc); // redefine the acc to be the result of what stats had been merged into it
            }

            if (Object.keys(acc).length == 0){ // if the resultant acc is empty, remove the key, there are no buffs applied to this battalion
                tempMap.current.delete(key);
            } else {
                tempMap.current.set(key, acc); // set the current key to the new accumulated stats
            }

        });    
        stats.setDoctrineBuffsMap(new Map(tempMap.current)); // set tempMap.current to be the new doctrineBuffsMap
        stats.setDoctrineBuffs_Army(prev => { // set the army buffs to be the new object located inside the tempMap map
            if(tempMap.current.has("Army")){ // only set it if the army tag is inside the tempMap
                return tempMap.current.get("Army")
            } else { //otherwise set it to undefined
                return undefined
            }
        });
        console.log(stats.doctrineBuffsMap);
    }, [doctrineBuffArrays]);

    return(props.trigger)?(
        <div className={styles.Popup}>
            <div className={styles.innerPop}>
                <h1>Land Doctrines</h1>
                <h2>Pick from One of Four Doctrines, only one doctrine can be selected at a time</h2>
                <h2>Doctrines that are displayed in pairs are mutually exclusive until they combine back into one</h2>
                <div className={styles.doctrineScroll}>
                    <div className={styles.doctrineContainer}>
                        <h1>Mobile Warfare</h1>
                        <div className={styles.singleDoctrine}>
                            <label>
                                <input id="mob0" type="checkbox" checked={mobChecked[0]} onChange={(e) => choosingMainDoctrine(e)} value={JSON.stringify({"doctrine": "Mobile Warfare", "index": 0, "buffs": doctrinelist.Mobile_Warfare[0]})}></input>
                                upgrade 0
                                <h1>Hi there</h1>
                            </label>
                        </div>
                        <div className={styles.singleDoctrine}>
                            <label>
                                <input id="mob1" type="checkbox" disabled={mobChecked[0]? false: true} checked={mobChecked[1]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Mobile Warfare", "index": 1, "buffs": doctrinelist.Mobile_Warfare[1]})}></input>
                                upgrade 1
                                <h1>Hi there</h1>
                            </label>
                        </div>
                        <div className={styles.singleDoctrine}>
                            <label>
                                <input id="mob2" type="checkbox" disabled={mobChecked[1]? false: true}checked={mobChecked[2]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Mobile Warfare", "index": 2, "buffs": doctrinelist.Mobile_Warfare[2]})}></input>
                                upgrade 2
                                <h1>Hi there</h1>
                            </label>
                        </div>
                        <div className={styles.mutualExDoctrine}>
                            <label>
                                <input id="mob3" type="checkbox" disabled={mobChecked[2]&&!mobChecked[4]? false: true} checked={mobChecked[3]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Mobile Warfare", "index": 3, "buffs": doctrinelist.Mobile_Warfare[3]})}></input>
                                upgrade 3
                                <h1>Hello</h1>
                            </label>
                            <label>
                                <input id="mob4" type="checkbox" disabled={mobChecked[2]&&!mobChecked[3]? false: true} checked={mobChecked[4]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Mobile Warfare", "index": 4, "buffs": doctrinelist.Mobile_Warfare[4]})}></input>
                                upgrade 4
                                <h1>there</h1>
                            </label>
                            <label>
                                <input id="mob5" type="checkbox" disabled={mobChecked[3]? false: true}checked={mobChecked[5]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Mobile Warfare", "index": 5 , "buffs": doctrinelist.Mobile_Warfare[5]})}></input>
                                upgrade 5
                                <h1>Hello</h1>
                            </label>
                            <label>
                                <input id="mob6" type="checkbox" disabled={mobChecked[4]? false: true} checked={mobChecked[6]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Mobile Warfare", "index": 6 , "buffs": doctrinelist.Mobile_Warfare[6]})}></input>
                                upgrade 6
                                <h1>there</h1>
                            </label>
                            <label>
                                <input id="mob7" type="checkbox" disabled={mobChecked[5]? false: true} checked={mobChecked[7]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Mobile Warfare", "index": 7 , "buffs": doctrinelist.Mobile_Warfare[7]})}></input>
                                upgrade 7
                                <h1>Hello</h1>
                            </label>
                            <label>
                                <input id="mob8" type="checkbox" disabled={mobChecked[6]? false: true} checked={mobChecked[8]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Mobile Warfare", "index": 8 , "buffs": doctrinelist.Mobile_Warfare[8]})}></input>
                                upgrade 8
                                <h1>there</h1>
                            </label>
                        </div>
                        <div className={styles.singleDoctrine}>
                            <label>
                                <input id="mob9" type="checkbox" disabled={mobChecked[7]||mobChecked[8] ? false: true} checked={mobChecked[9]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Mobile Warfare", "index": 9 , "buffs": doctrinelist.Mobile_Warfare[9]})}></input>
                                upgrade 9
                                <h1>Hi there</h1>
                            </label>
                        </div>
                        <div className={styles.mutualExDoctrine}>
                            <label>
                                <input id="mob10" type="checkbox" disabled={mobChecked[9]&&!mobChecked[11]? false: true}checked={mobChecked[10]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Mobile Warfare", "index": 10 , "buffs": doctrinelist.Mobile_Warfare[10]})}></input>
                                upgrade 10
                                <h1>Hello</h1>
                            </label>
                            <label>
                                <input id="mob11" type="checkbox" disabled={mobChecked[9]&&!mobChecked[10]? false: true} checked={mobChecked[11]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Mobile Warfare", "index": 11 , "buffs": doctrinelist.Mobile_Warfare[11]})}></input>
                                upgrade 11
                                <h1>there</h1>
                            </label>
                            <label>
                                <input id="mob12" type="checkbox" disabled={mobChecked[10]? false: true} checked={mobChecked[12]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Mobile Warfare", "index": 12 , "buffs": doctrinelist.Mobile_Warfare[12]})}></input>
                                upgrade 12
                                <h1>Hello</h1>
                            </label>
                            <label>
                                <input id="mob13" type="checkbox" disabled={mobChecked[11]? false: true} checked={mobChecked[13]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Mobile Warfare", "index": 13 , "buffs": doctrinelist.Mobile_Warfare[13]})}></input>
                                upgrade 13
                                <h1>there</h1>
                            </label>
                            <label>
                                <input id="mob14" type="checkbox" disabled={mobChecked[12]? false: true} checked={mobChecked[14]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Mobile Warfare", "index": 14 , "buffs": doctrinelist.Mobile_Warfare[14]})}></input>
                                upgrade 14
                                <h1>Hello</h1>
                            </label>
                            <label>
                                <input id="mob15" type="checkbox" disabled={mobChecked[13]? false: true} checked={mobChecked[15]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Mobile Warfare", "index": 15, "buffs": doctrinelist.Mobile_Warfare[15]})}></input>
                                upgrade 15
                                <h1>there</h1>
                            </label>
                        </div>
                    </div>
                    <div className={styles.doctrineContainer}>
                        <h1>Superior Firepower</h1>
                        <div className={styles.singleDoctrine}>
                            <label>
                                <input type="checkbox" checked={supChecked[0]} onChange={(e) => choosingMainDoctrine(e)} value={JSON.stringify({"doctrine": "Superior Firepower", "index": 0, "buffs": doctrinelist.Superior_Firepower[0]})}></input>
                                upgrade 0
                                <h1>Hi there</h1>
                            </label>
                        </div>
                        <div className={styles.singleDoctrine}>
                            <label>
                                <input type="checkbox" disabled={supChecked[0]? false: true} checked={supChecked[1]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Superior Firepower", "index": 1, "buffs": doctrinelist.Superior_Firepower[1]})}></input>
                                upgrade 1
                                <h1>Hi there</h1>
                            </label>
                        </div>
                        <div className={styles.singleDoctrine}>
                            <label>
                                <input type="checkbox" disabled={supChecked[1]? false: true} checked={supChecked[2]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Superior Firepower", "index": 2, "buffs": doctrinelist.Superior_Firepower[2]})}></input>
                                upgrade 2
                                <h1>Hi there</h1>
                            </label>
                        </div>
                        <div className={styles.mutualExDoctrine}>
                            <label>
                                <input type="checkbox" disabled={supChecked[2] && !supChecked[4]? false: true} checked={supChecked[3]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Superior Firepower", "index": 3, "buffs": doctrinelist.Superior_Firepower[3]})}></input>
                                upgrade 3
                                <h1>Hello</h1>
                            </label>
                            <label>
                                <input type="checkbox" disabled={supChecked[2] && !supChecked[3]? false: true} checked={supChecked[4]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Superior Firepower", "index": 4, "buffs": doctrinelist.Superior_Firepower[4]})}></input>
                                upgrade 4
                                <h1>there</h1>
                            </label>
                            <label>
                                <input type="checkbox" disabled={supChecked[3]? false: true} checked={supChecked[5]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Superior Firepower", "index": 5, "buffs": doctrinelist.Superior_Firepower[5]})}></input>
                                upgrade 5
                                <h1>Hello</h1>
                            </label>
                            <label>
                                <input type="checkbox" disabled={supChecked[4]? false: true} checked={supChecked[6]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Superior Firepower", "index": 6, "buffs": doctrinelist.Superior_Firepower[6]})}></input>
                                upgrade 6
                                <h1>there</h1>
                            </label>
                        </div>
                        <div className={styles.singleDoctrine}>
                            <label>
                                <input type="checkbox" disabled={supChecked[5] || supChecked[6]? false: true} checked={supChecked[7]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Superior Firepower", "index": 7, "buffs": doctrinelist.Superior_Firepower[7]})}></input>
                                upgrade 7
                                <h1>Hi there</h1>
                            </label>
                        </div>
                        <div className={styles.mutualExDoctrine}>
                            <label>
                                <input type="checkbox" disabled={supChecked[7] && !supChecked[9] ? false: true} checked={supChecked[8]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Superior Firepower", "index": 8, "buffs": doctrinelist.Superior_Firepower[8]})}></input>
                                upgrade 8
                                <h1>Hello</h1>
                            </label>
                            <label>
                                <input type="checkbox" disabled={supChecked[1] && !supChecked[8]? false: true} checked={supChecked[9]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Superior Firepower", "index": 9, "buffs": doctrinelist.Superior_Firepower[9]})}></input>
                                upgrade 9
                                <h1>there</h1>
                            </label>
                            <label>
                                <input type="checkbox" disabled={supChecked[8]? false: true} checked={supChecked[10]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Superior Firepower", "index": 10, "buffs": doctrinelist.Superior_Firepower[10]})}></input>
                                upgrade 10
                                <h1>Hello</h1>
                            </label>
                            <label>
                                <input type="checkbox" disabled={supChecked[9]? false: true} checked={supChecked[11]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Superior Firepower", "index": 11, "buffs": doctrinelist.Superior_Firepower[11]})}></input>
                                upgrade 11
                                <h1>there</h1>
                            </label>
                            <label>
                                <input type="checkbox" disabled={supChecked[10]? false: true} checked={supChecked[12]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Superior Firepower", "index": 12, "buffs": doctrinelist.Superior_Firepower[12]})}></input>
                                upgrade 12
                                <h1>Hello</h1>
                            </label>
                            <label>
                                <input type="checkbox" disabled={supChecked[11]? false: true} checked={supChecked[13]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Superior Firepower", "index": 13, "buffs": doctrinelist.Superior_Firepower[13]})}></input>
                                upgrade 13
                                <h1>there</h1>
                            </label>
                            <label>
                                <input type="checkbox" disabled={supChecked[12]? false: true} checked={supChecked[14]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Superior Firepower", "index": 14, "buffs": doctrinelist.Superior_Firepower[14]})}></input>
                                upgrade 14
                                <h1>Hello</h1>
                            </label>
                            <label>
                                <input type="checkbox" disabled={supChecked[13]? false: true} checked={supChecked[15]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Superior Firepower", "index": 15, "buffs": doctrinelist.Superior_Firepower[15]})}></input>
                                upgrade 15
                                <h1>there</h1>
                            </label>
                        </div>
                    </div>
                    <div className={styles.doctrineContainer}>
                        <h1>Grand Battleplan</h1>
                        <div className={styles.singleDoctrine}>
                            <label>
                                <input type="checkbox" checked={grdChecked[0]} onChange={(e) => choosingMainDoctrine(e)} value={JSON.stringify({"doctrine": "Grand Battleplan", "index": 0, "buffs": doctrinelist.Grand_Battleplan[0]})}></input>
                                upgrade 0
                                <h1>Hi there</h1>
                            </label>
                        </div>
                        <div className={styles.singleDoctrine}>
                            <label>
                                <input type="checkbox" disabled={grdChecked[0]? false: true} checked={grdChecked[1]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Grand Battleplan", "index": 1, "buffs": doctrinelist.Grand_Battleplan[1]})}></input>
                                upgrade 1
                                <h1>Hi there</h1>
                            </label>
                        </div>
                        <div className={styles.singleDoctrine}>
                            <label>
                                <input type="checkbox"disabled={grdChecked[1]? false: true} checked={grdChecked[2]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Grand Battleplan", "index": 2, "buffs": doctrinelist.Grand_Battleplan[2]})}></input>
                                upgrade 2
                                <h1>Hi there</h1>
                            </label>
                        </div>
                        <div className={styles.singleDoctrine}>
                            <label>
                                <input type="checkbox"disabled={grdChecked[2]? false: true} checked={grdChecked[3]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Grand Battleplan", "index": 3, "buffs": doctrinelist.Grand_Battleplan[3]})}></input>
                                upgrade 3
                                <h1>Hi there</h1>
                            </label>
                        </div>
                        <div className={styles.mutualExDoctrine}>
                            <label>
                                <input type="checkbox"disabled={grdChecked[3] && !grdChecked[5]? false: true} checked={grdChecked[4]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Grand Battleplan", "index": 4, "buffs": doctrinelist.Grand_Battleplan[4]})}></input>
                                upgrade 4
                                <h1>Hello</h1>
                            </label>
                            <label>
                                <input type="checkbox"disabled={grdChecked[3] && !grdChecked[4]? false: true} checked={grdChecked[5]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Grand Battleplan", "index": 5, "buffs": doctrinelist.Grand_Battleplan[5]})}></input>
                                upgrade 5
                                <h1>there</h1>
                            </label>
                            <label>
                                <input type="checkbox"disabled={grdChecked[4]? false: true} checked={grdChecked[6]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Grand Battleplan", "index": 6, "buffs": doctrinelist.Grand_Battleplan[6]})}></input>
                                upgrade 6
                                <h1>Hello</h1>
                            </label>
                            <label>
                                <input type="checkbox"disabled={grdChecked[5]? false: true} checked={grdChecked[7]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Grand Battleplan", "index": 7, "buffs": doctrinelist.Grand_Battleplan[7]})}></input>
                                upgrade 7
                                <h1>there</h1>
                            </label>
                            <label>
                                <input type="checkbox"disabled={grdChecked[6]? false: true} checked={grdChecked[8]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Grand Battleplan", "index": 8, "buffs": doctrinelist.Grand_Battleplan[8]})}></input>
                                upgrade 8
                                <h1>Hello</h1>
                            </label>
                            <label>
                                <input type="checkbox"disabled={grdChecked[7]? false: true} checked={grdChecked[9]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Grand Battleplan", "index": 9, "buffs": doctrinelist.Grand_Battleplan[9]})}></input>
                                upgrade 9
                                <h1>there</h1>
                            </label>
                            <label>
                                <input type="checkbox"disabled={grdChecked[8]? false: true} checked={grdChecked[10]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Grand Battleplan", "index": 10, "buffs": doctrinelist.Grand_Battleplan[10]})}></input>
                                upgrade 10
                                <h1>Hello</h1>
                            </label>
                            <label>
                                <input type="checkbox"disabled={grdChecked[9]? false: true} checked={grdChecked[11]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Grand Battleplan", "index": 11, "buffs": doctrinelist.Grand_Battleplan[11]})}></input>
                                upgrade 11
                                <h1>there</h1>
                            </label>
                            <label>
                                <input type="checkbox"disabled={grdChecked[10]? false: true} checked={grdChecked[12]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Grand Battleplan", "index": 12, "buffs": doctrinelist.Grand_Battleplan[12]})}></input>
                                upgrade 12
                                <h1>Hello</h1>
                            </label>
                            <label>
                                <input type="checkbox"disabled={grdChecked[11]? false: true} checked={grdChecked[13]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Grand Battleplan", "index": 13, "buffs": doctrinelist.Grand_Battleplan[13]})}></input>
                                upgrade 13
                                <h1>there</h1>
                            </label>
                            <label>
                                <input type="checkbox"disabled={grdChecked[12]? false: true} checked={grdChecked[14]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Grand Battleplan", "index": 14, "buffs": doctrinelist.Grand_Battleplan[14]})}></input>
                                upgrade 14
                                <h1>Hello</h1>
                            </label>
                            <label>
                                <input type="checkbox"disabled={grdChecked[13]? false: true} checked={grdChecked[15]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Grand Battleplan", "index": 15, "buffs": doctrinelist.Grand_Battleplan[15]})}></input>
                                upgrade 15
                                <h1>there</h1>
                            </label>
                        </div>
                    </div>
                    <div className={styles.doctrineContainer}>
                        <h1>Mass Assault</h1>
                        <div className={styles.singleDoctrine}>
                            <label>
                                <input type="checkbox" checked={masChecked[0]} onChange={(e) => choosingMainDoctrine(e)} value={JSON.stringify({"doctrine": "Mass Assault", "index": 0, "buffs": doctrinelist.Mass_Assault[0]})}></input>
                                upgrade 0
                                <h1>Hi there</h1>
                            </label>
                        </div>
                        <div className={styles.singleDoctrine}>
                            <label>
                                <input type="checkbox"disabled={masChecked[0]? false: true} checked={masChecked[1]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Mass Assault", "index": 1, "buffs": doctrinelist.Mass_Assault[1]})}></input>
                                upgrade 1
                                <h1>Hi there</h1>
                            </label>
                        </div>
                        <div className={styles.singleDoctrine}>
                            <label>
                                <input type="checkbox"disabled={masChecked[1]? false: true} checked={masChecked[2]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Mass Assault", "index": 2, "buffs": doctrinelist.Mass_Assault[2]})}></input>
                                upgrade 2
                                <h1>Hi there</h1>
                            </label>
                        </div>
                        <div className={styles.mutualExDoctrine}>
                            <label>
                                <input type="checkbox"disabled={masChecked[2] && !masChecked[4]? false: true} checked={masChecked[3]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Mass Assault", "index": 3, "buffs": doctrinelist.Mass_Assault[3]})}></input>
                                upgrade 3
                                <h1>Hello</h1>
                            </label>
                            <label>
                                <input type="checkbox" disabled={masChecked[2] && !masChecked[3]? false: true} checked={masChecked[4]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Mass Assault", "index": 4, "buffs": doctrinelist.Mass_Assault[4]})}></input>
                                upgrade 4
                                <h1>there</h1>
                            </label>
                            <label>
                                <input type="checkbox" disabled={masChecked[3]? false: true} checked={masChecked[5]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Mass Assault", "index": 5, "buffs": doctrinelist.Mass_Assault[5]})}></input>
                                upgrade 5
                                <h1>Hello</h1>
                            </label>
                            <label>
                                <input type="checkbox" disabled={masChecked[4]? false: true} checked={masChecked[6]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Mass Assault", "index": 6, "buffs": doctrinelist.Mass_Assault[6]})}></input>
                                upgrade 6
                                <h1>there</h1>
                            </label>
                            <label>
                                <input type="checkbox" disabled={masChecked[5]? false: true} checked={masChecked[7]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Mass Assault", "index": 7, "buffs": doctrinelist.Mass_Assault[7]})}></input>
                                upgrade 7
                                <h1>Hello</h1>
                            </label>
                            <label>
                                <input type="checkbox" disabled={masChecked[6]? false: true} checked={masChecked[8]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Mass Assault", "index": 8, "buffs": doctrinelist.Mass_Assault[8]})}></input>
                                upgrade 8
                                <h1>there</h1>
                            </label>
                            <label>
                                <input type="checkbox" disabled={masChecked[7]? false: true} checked={masChecked[9]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Mass Assault", "index": 9, "buffs": doctrinelist.Mass_Assault[9]})}></input>
                                upgrade 9
                                <h1>Hello</h1>
                            </label>
                            <label>
                                <input type="checkbox" disabled={masChecked[8]? false: true} checked={masChecked[10]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Mass Assault", "index": 10, "buffs": doctrinelist.Mass_Assault[10]})}></input>
                                upgrade 10
                                <h1>there</h1>
                            </label>
                            <label>
                                <input type="checkbox" disabled={masChecked[9]? false: true} checked={masChecked[11]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Mass Assault", "index": 11, "buffs": doctrinelist.Mass_Assault[11]})}></input>
                                upgrade 11
                                <h1>Hello</h1>
                            </label>
                            <label>
                                <input type="checkbox" disabled={masChecked[10]? false: true} checked={masChecked[12]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Mass Assault", "index": 12, "buffs": doctrinelist.Mass_Assault[12]})}></input>
                                upgrade 12
                                <h1>there</h1>
                            </label>
                            <label>
                                <input type="checkbox" disabled={masChecked[11]? false: true} checked={masChecked[13]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Mass Assault", "index": 13, "buffs": doctrinelist.Mass_Assault[13]})}></input>
                                upgrade 13
                                <h1>Hello</h1>
                            </label>
                            <div></div>
                            <label>
                                <input type="checkbox" disabled={masChecked[13]? false: true} checked={masChecked[14]} onChange={(e) => addDoctrine(e)} value={JSON.stringify({"doctrine": "Mass Assault", "index": 14, "buffs": doctrinelist.Mass_Assault[14]})}></input>
                                upgrade 14
                                <h1>Hello</h1>
                            </label>
                            <div></div>
                        </div>
                    </div>
                </div>   
                <div className={styles.buttonContainer}>
                    <button onClick={()=> props.close(false)}>
                        close
                    </button>                    
                </div>            
            </div>
        </div>
    ) : "";
}

export default DoctrineTab;