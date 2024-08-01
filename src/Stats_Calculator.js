import Equipment_Catalogue from './Units&Data/Equipment.json'
import Year_Bonus from './Units&Data/YearBonus.json'

export function calculateCombatStats(battalionMap, year, doctrineBuffs, supportModifiers, choice){

    // this function can be used for
    // HP, suppression, weight, supply use, sft atk, hrd atk, air atk, defense, breakthrough, combat width, 
    // calculates the total stats that are simply the sum of all the battalions stats


    let total = 0;
    let baseStat; // the base stat of that equipment
    let doctrineBonus; // the doctrine buffs applied to baseStat
    let equipmentBonus; // the equipment bonus applied to baseStat
    let yearBonus; // the technology bonus for applied to baseStat
    let suppMods; // holds the value for the support company modifier

    console.log(supportModifiers);


    //formula for the stats of a battalion
    // total += baseStat + (baseStat * (yearBonus + equipmentBonus + doctrineBonus))
    // the modifier stats should all be default to 0 if there is no buff related to this stats

    for (let battalion of battalionMap.keys()){ // for every battalion in the battalionMap

        // reset all the stats to be 0
        baseStat = 0;
        doctrineBonus = 0;
        suppMods = 0;

        //calculate the equipmentBonus
        if (Object.hasOwn(battalion, "Equipment_Modifier")){
            if(Object.hasOwn(battalion.Equipment_Modifier, choice)){
                equipmentBonus = battalion.Equipment_Modifier[choice];
            } else {
                equipmentBonus = 0
            }
        } else {
            equipmentBonus = 0
        }

        //get the year bonus of the battalion
        yearBonus = Year_Bonus[year][battalion.Name];
        if (Object.hasOwn(Year_Bonus[year],battalion.Name)){
            if(Object.hasOwn(Year_Bonus[year][battalion.Name], choice)){
                yearBonus = Year_Bonus[year][battalion.Name][choice];
            } else {
                yearBonus = 0
            }
        } else {
            yearBonus = 0
        }
        console.log(yearBonus)

        //calculate the doctrineBuff
        if (doctrineBuffs.has(battalion.Name)){ //check the doctrinesbuff map to see if this battalion has a buff that can be given
            if(Object.hasOwn(doctrineBuffs.get(battalion.Name), choice)){
                doctrineBonus += doctrineBuffs.get(battalion.Name)[choice];                    
            }
        }
        if (doctrineBuffs.has(battalion.Type)){ // bug here, have to check that the soft attack stats is there or not
            if(Object.hasOwn(doctrineBuffs.get(battalion.Type), choice)){
                doctrineBonus += doctrineBuffs.get(battalion.Type)[choice];                    
            }
        }
        if (doctrineBuffs.has("Frontline") &&  battalion.Frontline === true){
            if(Object.hasOwn(doctrineBuffs.get("Frontline"), choice)){
                doctrineBonus += doctrineBuffs.get("Frontline")[choice];                    
            }
        }
        if (doctrineBuffs.has("Army")){
            if(Object.hasOwn(doctrineBuffs.get("Army"), choice)){
                doctrineBonus += doctrineBuffs.get("Army")[choice];                    
            }
        }

        //find if there is any support company modifiers
        console.log()
        if (supportModifiers.has(battalion.Name)){
            suppMods = supportModifiers.get(battalion.Name)[choice];
        } else {
            suppMods = 0;
        }

        //calculating the baseStat
        battalion.Equipment_List.forEach(element => { // for every equipment in the battalion's equipment 
            console.log(element);
            if (Object.hasOwn(Equipment_Catalogue[year][element.Name], choice)){
                baseStat += Equipment_Catalogue[year][element.Name][choice];
            }
        });

        console.log(`Battalion: ${battalion.Name}|BaseStats: ${baseStat} |DoctrineBuffs: ${doctrineBonus} |EquipmentBonus: ${equipmentBonus} |YearBonus: ${yearBonus}| SuppMods: ${suppMods}`)

        total += (baseStat + (baseStat * (doctrineBonus + equipmentBonus + yearBonus))) * (1 + suppMods) * battalionMap.get(battalion)
    }
    return total
}

export function list(){
    console.log(Equipment_Catalogue);
}

export default list