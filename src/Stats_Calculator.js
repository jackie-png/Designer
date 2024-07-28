import Equipment_Catalogue from './Units&Data/Equipment.json'
import Year_Bonus from './Units&Data/YearBonus.json'

export function softAtk(battalionMap, year, doctrineBuffs){

    let total = 0;
    let baseStat; // the base stat of that equipment
    let doctrineBonus; // the doctrine buffs applied to baseStat
    let equipmentBonus; // the equipment bonus applied to baseStat
    let yearBonus; // the technology bonus for applied to baseStat


    //formula for the stats of a battalion
    // total += baseStat + (baseStat * (yearBonus + equipmentBonus + doctrineBonus))
    // the modifier stats should all be default to 0 if there is no buff related to this stats

    for (let battalion of battalionMap.keys()){ // for every battalion in the battalionMap

        // reset all the stats to be 0
        baseStat = 0;
        doctrineBonus = 0;

        //calculate the equipmentBonus
        if (Object.hasOwn(battalion, "Equipment_Modifier")){
            if(Object.hasOwn(battalion.Equipment_Modifier, "Soft_Attack")){
                equipmentBonus = battalion.Equipment_Modifier.Soft_Attack;
            } else {
                equipmentBonus = 0
            }
        } else {
            equipmentBonus = 0
        }

        //get the year bonus of the battalion
        yearBonus = Year_Bonus[year][battalion.Name];
        if (Object.hasOwn(Year_Bonus[year],battalion.Name)){
            if(Object.hasOwn(Year_Bonus[year][battalion.Name], "Soft_Attack")){
                yearBonus = Year_Bonus[year][battalion.Name].Soft_Attack;
            } else {
                yearBonus = 0
            }
        } else {
            yearBonus = 0
        }
        console.log(yearBonus)

        //calculate the doctrineBuff
        if (doctrineBuffs.has(battalion.Name)){ //check the doctrinesbuff map to see if this battalion has a buff that can be given
            if(Object.hasOwn(doctrineBuffs.get(battalion.Name), "Soft_Attack")){
                doctrineBonus += doctrineBuffs.get(battalion.Name).Soft_Attack;                    
            }
        }
        if (doctrineBuffs.has(battalion.Type)){ // bug here, have to check that the soft attack stats is there or not
            if(Object.hasOwn(doctrineBuffs.get(battalion.Type), "Soft_Attack")){
                doctrineBonus += doctrineBuffs.get(battalion.Type).Soft_Attack;                    
            }
        }
        if (doctrineBuffs.has("Frontline") &&  battalion.Frontline === true){
            if(Object.hasOwn(doctrineBuffs.get("Frontline"), "Soft_Attack")){
                doctrineBonus += doctrineBuffs.get("Frontline").Soft_Attack;                    
            }
        }
        if (doctrineBuffs.has("Army")){
            if(Object.hasOwn(doctrineBuffs.get("Army"), "Soft_Attack")){
                doctrineBonus += doctrineBuffs.get("Army").Soft_Attack;                    
            }
        }

        //calculating the baseStat
        battalion.Equipment_List.forEach(element => { // for every equipment in the battalion's equipment 
            console.log(element);
            if (Object.hasOwn(Equipment_Catalogue[year][element.Name], "Soft_Attack")){
                baseStat += Equipment_Catalogue[year][element.Name].Soft_Attack;
            }
        });

        console.log(`BaseStats: ${baseStat} |DoctrineBuffs: ${doctrineBonus} |EquipmentBonus: ${equipmentBonus} |YearBonus: ${yearBonus}`)

        total += (baseStat + (baseStat * (doctrineBonus + equipmentBonus + yearBonus))) * battalionMap.get(battalion)
    }
    return total
}

export function list(){
    console.log(Equipment_Catalogue);
}

export default list