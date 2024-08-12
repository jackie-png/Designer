import Equipment_Catalogue from './Units&Data/Equipment.json'
import Year_Bonus from './Units&Data/YearBonus.json'

export function calculateCombatStats(battalionMap, year, doctrineBuffs, supportModifiers, choice){

    // this function can be used for
    // HP, suppression, weight, supply use, sft atk, hrd atk, air atk, defense, breakthrough, combat width, 
    // calculates the total stats that are simply the sum of all the battalions stats
    if (battalionMap.size === 0){
        return 0
    }

    let total = 0;
    let baseStat; // the base stat of that equipment
    let doctrineBonus; // the doctrine buffs applied to baseStat
    let equipmentBonus; // the equipment bonus applied to baseStat
    let yearBonus; // the technology bonus for applied to baseStat
    let suppMods; // holds the value for the support company modifier

    //console.log(supportModifiers);


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
        //console.log(yearBonus)

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
        if (supportModifiers.has(battalion.Name)){
            if (Object.hasOwn(supportModifiers.get(battalion.Name), choice)){
                suppMods = supportModifiers.get(battalion.Name)[choice];
            } else {
                suppMods = 0;
            }
        } else {
            suppMods = 0;
        }

        //calculating the baseStat
        battalion.Equipment_List.forEach(element => { // for every equipment in the battalion's equipment 
            //console.log(element);
            if (Object.hasOwn(Equipment_Catalogue[year][element.Name], choice)){
                baseStat += Equipment_Catalogue[year][element.Name][choice];
            }
        });


        total += (baseStat + (baseStat * (doctrineBonus + equipmentBonus + yearBonus))) * (1 + suppMods) * battalionMap.get(battalion)
        //console.log(`Year: ${year} |Battalion: ${battalion.Name} |BaseStats: ${baseStat} |DoctrineBuffs: ${doctrineBonus} |EquipmentBonus: ${equipmentBonus} |YearBonus: ${yearBonus}| SuppMods: ${suppMods}| ${choice}| Total: ${total}`)

    }
    return total
}

export function calculateBaseStats_Avg(battalionMap, doctrineBuffs, supportModifiers, choice){

    // this function is to calculate the stats that are the avrg of battalion stats
    // organization, recovery rate
    if (battalionMap.size === 0){
        return 0
    }

    let total = 0;
    let baseStat; // the base stat of that equipment
    let doctrineBonus; // the doctrine buffs applied to baseStat
    let battalionCount = 0;
    let suppMods; // holds the value for the targetted support company modifier

    //console.log(supportModifiers);


    //formula for the stats of a battalion
    // total += baseStat + (baseStat * (yearBonus + equipmentBonus + doctrineBonus))
    // the modifier stats should all be default to 0 if there is no buff related to this stats

    for (let battalion of battalionMap.keys()){ // for every battalion in the battalionMap

        // reset all the stats to be 0
        baseStat = 0;
        doctrineBonus = 0;
        suppMods = 0;
        battalionCount+= battalionMap.get(battalion);

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
        if (supportModifiers.has(battalion.Name)){
            if (Object.hasOwn(supportModifiers.get(battalion.Name), choice)){
                suppMods = supportModifiers.get(battalion.Name)[choice];
            } else {
                suppMods = 0;
            }
        } else {
            suppMods = 0;
        }

        //calculating the baseStat
        baseStat = battalion[choice];

        total += (baseStat + doctrineBonus) * (1 + suppMods) * battalionMap.get(battalion);
        //console.log(`Battalion: ${battalion.Name}|BaseStats: ${baseStat} |DoctrineBuffs: ${doctrineBonus} |SuppMods: ${suppMods}| ${choice}| Total: ${total}`);

    }
    return total/battalionCount
}

export function calculateBaseStats_Sum(battalionMap, doctrineBuffs, supportModifiers, choice){

    // this function is to calculate the stats that are the avrg of battalion stats
    // organization, recovery rate
    if (battalionMap.size === 0){
        return 0
    }



    let total = 0;
    let baseStat; // the base stat of that equipment
    let doctrineBonus; // the doctrine buffs applied to baseStat
    let suppMods; // holds the value for the support company modifier

    //console.log(supportModifiers);


    //formula for the stats of a battalion
    // total += baseStat + (baseStat * (yearBonus + equipmentBonus + doctrineBonus))
    // the modifier stats should all be default to 0 if there is no buff related to this stats

    for (let battalion of battalionMap.keys()){ // for every battalion in the battalionMap

        // reset all the stats to be 0
        baseStat = 0;
        doctrineBonus = 0;
        suppMods = 0;

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
        if (supportModifiers.has(battalion.Name)){
            if (Object.hasOwn(supportModifiers.get(battalion.Name), choice)){
                suppMods = supportModifiers.get(battalion.Name)[choice];
            } else {
                suppMods = 0;
            }
        } else {
            suppMods = 0;
        }

        //calculating the baseStat
        baseStat = battalion[choice];

        total += (baseStat + doctrineBonus) * (1 + suppMods)* battalionMap.get(battalion);
        //console.log(`Battalion: ${battalion.Name}|BaseStats: ${baseStat} |DoctrineBuffs: ${doctrineBonus} |SuppMods: ${suppMods}| ${choice}| Total: ${total}`);

    }
    return total
}

export function supplyCalc(battalionMap, year, doctrineBuffs, supportModifiers, choice){
    let preTotal = calculateBaseStats_Sum(battalionMap, doctrineBuffs, supportModifiers, choice);
    let supplyModifier = 0;

    for (let battalion of battalionMap.keys()){
        if (battalion.Name === "Logistics Company"){
            if (Object.hasOwn(Year_Bonus[year], "Logistics Company")){
                supplyModifier = battalion.Supply_Use_Sub + Year_Bonus[year]["Logistics Company"].Supply_Use_Sub

            } else {
                supplyModifier = battalion.Supply_Use_Sub
            }
        }
    }

    //console.log(`Supply: ${preTotal} + (${preTotal} * ${supplyModifier})`)
    return preTotal + (preTotal * supplyModifier)
}

export function suppressionCalc(battalionMap, year, doctrineBuffs, supportModifiers, choice){
    let preTotal = calculateBaseStats_Sum(battalionMap, doctrineBuffs, supportModifiers, choice);
    let suppressModifier = 0;

    for (let battalion of battalionMap.keys()){
        if (battalion.Name === "Military Police"){
            if (Object.hasOwn(Year_Bonus[year], "Military Police")){
                suppressModifier = battalion.Supp_Bonus + Year_Bonus[year]["Military Police"].Supp_Bonus

            } else {
                suppressModifier = battalion.Supp_Bonus
            }
        }
    }

    //console.log(`Suppression: ${preTotal} + (${preTotal} * ${suppressModifier})`)
    return preTotal + (preTotal * suppressModifier)
}

export function avg_reliability(battalionMap, year){
    if (battalionMap.size === 0){
        return 0
    }
    let total = 0;
    let subTotal;
    let battalionCount = 0;
    let equipmentCount;

    for (let battalion of battalionMap.keys()){
        equipmentCount = 0;
        subTotal = 0;

        for (let equipment of battalion.Equipment_List){
            subTotal += Equipment_Catalogue[year][equipment.Name].Reliability;
            equipmentCount++;
        }
        //console.log(subTotal)
        total+= ((subTotal/equipmentCount) * battalionMap.get(battalion));
        battalionCount+=battalionMap.get(battalion);
    }

    return (total/battalionCount)*100
}

export function recon(battalionMap, year){
    for (let battalion of battalionMap.keys()){
        if (battalion.Secondary_Type === "Recon"){
            if(Object.hasOwn(Year_Bonus[year], "Recon")){
                return battalion.Recon + Year_Bonus[year].Recon.Recon
            } else {
                return battalion.Recon
            }
        }
    }   
    return 0
}

export function reliBonus(battalionMap, year){
    for (let battalion of battalionMap.keys()){
        if (battalion.Name === "Maintenance Company"){
            if(Object.hasOwn(Year_Bonus[year], "Maintenance Company")){
                return battalion.Relia_Bonus + Year_Bonus[year]["Maintenance Company"].Relia_Bonus * 100
            } else {
                return battalion.Relia_Bonus * 100
            }
        }
    }   
    return 0
}

export function trickleBack(battalionMap, year){
    for (let battalion of battalionMap.keys()){
        if (battalion.Name === "Field Hospital"){
            if(Object.hasOwn(Year_Bonus[year], "Field Hospital")){
                return battalion.Trickleback + Year_Bonus[year]["Field Hospital"].Trickleback * 100
            } else {
                return battalion.Trickleback * 100
            }
        }
    }   
    return 0
}

export function xpLoss(battalionMap, year){
    for (let battalion of battalionMap.keys()){
        if (battalion.Name === "Field Hospital"){
            if(Object.hasOwn(Year_Bonus[year], "Field Hospital")){
                return battalion.Exp_Loss + Year_Bonus[year]["Field Hospital"].Exp_Loss * 100
            } else {
                return battalion.Exp_Loss * 100
            }
        }
    }   
    return 0
}

export function initiative(battalionMap, year){
    for (let battalion of battalionMap.keys()){
        if (battalion.Name === "Signal Company"){
            if(Object.hasOwn(Year_Bonus[year], "Signal Company")){
                return battalion.Initiative + Year_Bonus[year]["Signal Company"].Initiative * 100
            } else {
                return battalion.Initiative * 100
            }
        }
    }   
    return 0
}


export function piercing_and_Armour(battalionMap, year, choice){

    if (battalionMap.size === 0){
        return 0;
    }
    // piercing or armour = 40% * highest + 60% * average 
    let highest = 0; // holds the highest piercing
    let total = 0; // total sum of piercing
    let battalionCount = 0; // total battalion count
    let equipmentBonus;
    let yearBonus;
    let baseStat;

    let subtotal = 0; // piercing of an individual piercing

    for (let battalion of battalionMap.keys()){
        battalionCount += battalionMap.get(battalion);
        baseStat = 0;

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

        battalion.Equipment_List.forEach(element => { // for every equipment in the battalion's equipment 
            //console.log(element);
            if (Object.hasOwn(Equipment_Catalogue[year][element.Name], choice)){
                baseStat += Equipment_Catalogue[year][element.Name][choice];
            }
        });

        //calculate the individual piercing
        subtotal = baseStat + (baseStat * (yearBonus + equipmentBonus));

        //check if the subtotal is the highest piercing in the division
        highest = Math.max(highest, subtotal);
        console.log(`Total: ${total}`);

        total += subtotal * battalionMap.get(battalion);

        console.log(`Battalion: ${battalion.Name}|BaseStats: ${baseStat} |highest: ${highest} |subtotal: ${subtotal}|battalionCount: ${battalionCount}| Total: ${total}`);

    }

    return 0.4 * highest + 0.6 * (total/battalionCount)


}

export function hardness(battalionMap, year){
    if (battalionMap.size === 0){
        return 0
    }

    let total = 0;
    let count = 0;
    let baseStat;

    for (let battalion of battalionMap.keys()){
        count += battalionMap.get(battalion);
        baseStat = 0;

        battalion.Equipment_List.forEach(element => { // for every equipment in the battalion's equipment 
            //console.log(element);
            if (Object.hasOwn(Equipment_Catalogue[year][element.Name], "Hardness")){
                baseStat += Equipment_Catalogue[year][element.Name]["Hardness"];
            }
        });

        total += baseStat * battalionMap.get(battalion);
    
    }

    return 100 * (total/count);
}

export function entrenchment(battalionMap, supportModifiers){
    let total = 0;
    let suppMods = 0
    for (let battalion of battalionMap.keys()){

        if (supportModifiers.has(battalion.Name)){
            if (Object.hasOwn(supportModifiers.get(battalion.Name), "Entrenchment")){
                suppMods = supportModifiers.get(battalion.Name)["Entrenchment"];
            } else {
                suppMods = 0;
            }
        } else {
            suppMods = 0;
        }

        total += (battalion.Entrenchment + suppMods) * battalionMap.get(battalion);
    }

    return total
}

export function list(){
    console.log(Equipment_Catalogue);
}

export default list