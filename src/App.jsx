import { useState, createContext } from 'react'
import Tables from './Tables';
import Selector from './Selector';
import units from './Units&Data/Units.json';
import yearTech from './Units&Data/YearTech.json' // each stat is the difference between battalions in 1936 vs battalions in later years
import Equiplist from './Equiplist';
import DoctrineTab from './DoctrinesTab';
export const statsArrays = createContext(); 

function App() {
  const [tech, setTechLevel] = useState(new Map(yearTech[1936].map(element => [element.Name, element])));
  const [baseStats, setBaseStats] = useState([0,0,0,0,0,0,0,0,0,0,0,0]);
  const [attackStats, setAttackStats] = useState([0,0,0,0,0,0,0,0,0,0,0,0]);
  const [equipmentCost, setEquipmentCost] = useState([0,0,0,0]);
  const [year, setYear] = useState(1936);
  const [equipmentList, setEquipmentList] = useState(new Map());
  const [doctrineBuffs_Army, setDoctrineBuffs_Army] = useState(); //accumulator of stat buffs to all batatlions from doctrines, each 
  const [doctrineBuffsMap, setDoctrineBuffsMap] = useState(new Map()); // this map stores the accumulated buff for a aspecific type of unit
  const [popUp, setPopup] = useState(false);
  const [supportModifiers, setSuppMods] = useState(new Map());

// let g = {
//   "Speed": 0,
//   "Organization": 0,
//   "Breakthrough": 0,
//   "RecoveryRate": 0,
//   "Soft_Attack" : 0,
//   "Defence": 0,
//   "Hard_Attack": 0,
//   "Recon": 0,
//   "Air_Attack": 0,
//   "Entrenchment": 0,
//   "Supply": 0,
//   "Suppression": 0,
//   "Width": 0
// }

  /**
   * Docatrines can add stats to
   * speed
   * organization
   * breakthrough
   * max speed
   * recovery rate
   * soft attack
   * defence
   * hard attack
   * recon
   * air attack
   * entrenchment
   * supply consumption
   * suppression
   * combat width
   * 
   * 
   * 
   * plan for doctrines
   * two things to keep note
   * one object will record the stat increases for all battalions
   * 
   * A map that stores a 
   * key (battalion name or battalion catagory being affected)
   * value : an object that can apply those buffs
   * 
   *  during calculations
   * 
   * when calculating for the individual battalion, search the map to see if it pops up, if it does get the object and apply the buff to that stat
   * if the battalion name is not on the map, search the secondary type
   * 
   * once the individual stats are complete, apply the all buff stats at the end
   * 
   * only one doctrine will display on screen, user will need to select a doctrine first before the doctrine tree is shown, i am too stupid to figure out how to show all 4 of them at once
   * 
   * 
   * regarding checking and unch3cking:
   * 
   * the checkbox shoudl check if the previous required boxes are checked, if they are then enable the current box to be able to be checked, othefeise disable it
   * 
   * from there, if one is unchecked, then the next ones should follow suit
   *  
   */




  const [battalionArr, setBattalionArr] = useState([
    {"Name":"Add Battalion"},
    {"Name":"Add Battalion"},
    {"Name":"Add Battalion"},
    {"Name":"Add Battalion"},
    {"Name":"Add Battalion"},
    {"Name":"Add Battalion"},
    {"Name":"Add Battalion"},
    {"Name":"Add Battalion"},
    {"Name":"Add Battalion"},
    {"Name":"Add Battalion"},
    {"Name":"Add Battalion"},
    {"Name":"Add Battalion"},
    {"Name":"Add Battalion"},
    {"Name":"Add Battalion"},
    {"Name":"Add Battalion"},
    {"Name":"Add Battalion"},
    {"Name":"Add Battalion"},
    {"Name":"Add Battalion"},
    {"Name":"Add Battalion"},
    {"Name":"Add Battalion"},
    {"Name":"Add Battalion"},
    {"Name":"Add Battalion"},
    {"Name":"Add Battalion"},
    {"Name":"Add Battalion"},
    {"Name":"Add Battalion"},
    {"Name":"Add Battalion"},
    {"Name":"Add Battalion"},
    {"Name":"Add Battalion"},
    {"Name":"Add Battalion"},
    {"Name":"Add Battalion"},
  ]); // battalionArr is used for showing battalions on the division template table
  const [batMap, setBatMap] = useState(new Map()); // batMap is the list of battalions used to calculate the division stats, includes support companies


  function handleClick(){
    console.log(tech1940);
  }

  return (
    <>
      <statsArrays.Provider value={{supportModifiers, setSuppMods, tech, setTechLevel, yearTech, doctrineBuffs_Army, setDoctrineBuffs_Army, doctrineBuffsMap, setDoctrineBuffsMap, year, setYear, batMap, setBatMap, battalionArr, setBattalionArr, baseStats, setBaseStats, attackStats, setAttackStats, equipmentCost, setEquipmentCost, equipmentList, setEquipmentList, units}}>
        <h1>Hearts of Iron 4 Online Division Designer</h1>
        <button onClick={()=>setPopup(true)}>
          Doctrines
        </button>
        <Selector/>
        <Tables/>
        <Equiplist/>
        <DoctrineTab trigger = {popUp} close = {setPopup}/>
      </statsArrays.Provider>
    </>
  )
}

export default App
