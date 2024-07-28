import { useContext } from "react";
import { statsArrays } from "./App";
import yearTech from './Units&Data/YearTech.json';

//when calculating the doctrine stats, look up the name, then look up the type, then look up if frontlines have anything, unless they are a support compny then just look up name and type


//base stats function
export function speed(battalionMap, yearTech, doctrineBuffMap){ //min speed
    let spd = 0;
    let first = true;
    if (battalionMap.size === 0){
        return 0;
    } else {
        for (const battalion of battalionMap.keys()){
            let doctrineBuff = 0;
            if (doctrineBuffMap.has(battalion.Name)){ //check the doctrinesbuff map to see if this battalion has a buff that can be given
                if(Object.hasOwn(doctrineBuffMap.get(battalion.Name), "Speed")){
                    console.log(doctrineBuffMap.get(battalion.Name).Speed);
                    doctrineBuff += doctrineBuffMap.get(battalion.Name).Speed;                    
                }
            }
            if (doctrineBuffMap.has(battalion.Type)){ // bug here, have to check that the soft attack stats is there or not
                if(Object.hasOwn(doctrineBuffMap.get(battalion.Type), "Speed")){
                    console.log(doctrineBuffMap.get(battalion.Type).Speed);
                    doctrineBuff += doctrineBuffMap.get(battalion.Type).Speed;                    
                }
            }
            if (doctrineBuffMap.has("Frontline") &&  battalion.Frontline === true){
                if(Object.hasOwn(doctrineBuffMap.get("Frontline"), "Speed")){
                    console.log(doctrineBuffMap.get("Frontline").Speed);
                    doctrineBuff += doctrineBuffMap.get("Frontline").Speed;                    
                }
            }
            if (doctrineBuffMap.has("Army")){
                if(Object.hasOwn(doctrineBuffMap.get("Army"), "Speed")){
                    console.log(doctrineBuffMap.get("Army").Speed);
                    doctrineBuff += doctrineBuffMap.get("Army").Speed;                    
                }
            }
            if (battalion.Type != "Support_Company"){
                if (first){
                    spd = battalion.Speed + yearTech.get(battalion.Name).Speed * (1+doctrineBuff);
                    first = false;
                } else {
                    if (spd > battalion.Speed + yearTech.get(battalion.Name).Speed * (1+doctrineBuff)){
                        spd = battalion.Speed + yearTech.get(battalion.Name).Speed * (1+doctrineBuff);
                    }
                }                
            }
        }        
    }

    return spd
}

export function hp(battalionMap, yearTech){
    let totalHP = 0;

    if (battalionMap.size > 0) {
        for (const battalion of battalionMap.keys()){
            totalHP += (battalion.HP + yearTech.get(battalion.Name).HP) * battalionMap.get(battalion);
        }
    } else {
        return 0
    }    

    return totalHP
}

export function organization(battalionMap, yearTech, doctrineBuffMap){
    let totalOrg = 0;
    let totalBats = 0;
    if (battalionMap.size > 0) {
        for (const battalion of battalionMap.keys()){
            let doctrineBuff = 0;
            if (doctrineBuffMap.has(battalion.Name)){ //check the doctrinesbuff map to see if this battalion has a buff that can be given
                if(Object.hasOwn(doctrineBuffMap.get(battalion.Name), "Organization")){
                    console.log(doctrineBuffMap.get(battalion.Name).Organization);
                    doctrineBuff += doctrineBuffMap.get(battalion.Name).Organization;                    
                }
            }
            if (doctrineBuffMap.has(battalion.Type)){ // bug here, have to check that the soft attack stats is there or not
                if(Object.hasOwn(doctrineBuffMap.get(battalion.Type), "Organization")){
                    console.log(doctrineBuffMap.get(battalion.Type).Organization);
                    doctrineBuff += doctrineBuffMap.get(battalion.Type).Organization;                    
                }
            }
            if (doctrineBuffMap.has("Frontline") &&  battalion.Frontline === true){
                if(Object.hasOwn(doctrineBuffMap.get("Frontline"), "Organization")){
                    console.log(doctrineBuffMap.get("Frontline").Organization);
                    doctrineBuff += doctrineBuffMap.get("Frontline").Organization;                    
                }
            }
            if (doctrineBuffMap.has("Army")){
                if(Object.hasOwn(doctrineBuffMap.get("Army"), "Organization")){
                    console.log(doctrineBuffMap.get("Army").Organization);
                    doctrineBuff += doctrineBuffMap.get("Army").Organization;                    
                }
            }
            totalOrg += (battalion.Organization + yearTech.get(battalion.Name).Organization + doctrineBuff) * battalionMap.get(battalion);
            totalBats += battalionMap.get(battalion);
        }
    } else {
        return 0
    }



    return totalOrg/totalBats
}

export function recoveryRate(battalionMap, yearTech, doctrineBuffMap){
    // every doctrine adds a constant number of recoveryrate EXCEPT ARMOURED CARS INT ADVANCED FIREBASE supDoctrine[13]
    // MOBILE INFANTRY UPGRADE mobWarfare[4] ADDS A PERCENtAGE AS WELL WHAT the HECK
    // lies the game lied to me
    let total = 0;
    let totalBats = 0;
    if (battalionMap.size > 0) {
        for (const battalion of battalionMap.keys()){
            let doctrineBuff = 0;
            if (doctrineBuffMap.has(battalion.Name)){ //check the doctrinesbuff map to see if this battalion has a buff that can be given
                if(Object.hasOwn(doctrineBuffMap.get(battalion.Name), "RecoveryRate")){
                    console.log(doctrineBuffMap.get(battalion.Name).RecoveryRate);
                    doctrineBuff += doctrineBuffMap.get(battalion.Name).RecoveryRate;                    
                }
            }
            if (doctrineBuffMap.has(battalion.Type)){ // bug here, have to check that the soft attack stats is there or not
                if(Object.hasOwn(doctrineBuffMap.get(battalion.Type), "RecoveryRate")){
                    console.log(doctrineBuffMap.get(battalion.Type).RecoveryRate);
                    doctrineBuff += doctrineBuffMap.get(battalion.Type).RecoveryRate;                    
                }
            }
            if (doctrineBuffMap.has("Frontline") &&  battalion.Frontline === true){
                if(Object.hasOwn(doctrineBuffMap.get("Frontline"), "RecoveryRate")){
                    console.log(doctrineBuffMap.get("Frontline").RecoveryRate);
                    doctrineBuff += doctrineBuffMap.get("Frontline").RecoveryRate;                    
                }
            }
            if (doctrineBuffMap.has("Army")){
                if(Object.hasOwn(doctrineBuffMap.get("Army"), "RecoveryRate")){
                    console.log(doctrineBuffMap.get("Army").RecoveryRate);
                    doctrineBuff += doctrineBuffMap.get("Army").RecoveryRate;                    
                }
            }
            total += (battalion.RecoveryRate + yearTech.get(battalion.Name).RecoveryRate + doctrineBuff) * battalionMap.get(battalion);
            
            totalBats += battalionMap.get(battalion);                
        }
    } else {
        return 0
    }
    if ((total/totalBats) >= 0){
        return total/totalBats
    } else {
        return 0
    }
}

export function suppression(battalionMap, yearTech, doctrineBuffMap){
    //if mp company in division, add 20% bonus to suppression
    let totalSup = 0;
    let supBonus = 0;
    
    if (battalionMap.has("Military Police")){
        supBonus = 0.2;

    }

    if (battalionMap.size > 0) {
        for (const battalion of battalionMap.keys()){
            let doctrineBuff = 0;
            if (doctrineBuffMap.has(battalion.Name)){ //check the doctrinesbuff map to see if this battalion has a buff that can be given
                if(Object.hasOwn(doctrineBuffMap.get(battalion.Name), "Suppression")){
                    console.log(doctrineBuffMap.get(battalion.Name).Suppression);
                    doctrineBuff += doctrineBuffMap.get(battalion.Name).Suppression;                    
                }
            }
            if (doctrineBuffMap.has(battalion.Type)){ // bug here, have to check that the soft attack stats is there or not
                if(Object.hasOwn(doctrineBuffMap.get(battalion.Type), "Suppression")){
                    console.log(doctrineBuffMap.get(battalion.Type).Suppression);
                    doctrineBuff += doctrineBuffMap.get(battalion.Type).Suppression;                    
                }
            }
            if (doctrineBuffMap.has("Frontline") &&  battalion.Frontline === true){
                if(Object.hasOwn(doctrineBuffMap.get("Frontline"), "Suppression")){
                    console.log(doctrineBuffMap.get("Frontline").Suppression);
                    doctrineBuff += doctrineBuffMap.get("Frontline").Suppression;                    
                }
            }
            if (doctrineBuffMap.has("Army")){
                if(Object.hasOwn(doctrineBuffMap.get("Army"), "Suppression")){
                    console.log(doctrineBuffMap.get("Army").Suppression);
                    doctrineBuff += doctrineBuffMap.get("Army").Suppression;                    
                }
            }
            totalSup += (battalion.Suppression + yearTech.get(battalion.Name).Suppression + doctrineBuff) * (1+supBonus) * battalionMap.get(battalion);
        }
    } else {
        return 0
    }

    return totalSup
}

export function recon(battalionMap, yearTech, doctrineBuffMap){
    //no recon unless recon companies added

    for (const battalion of battalionMap.keys()){
        if (battalion.Secondary_Type === "Recon"){
            let doctrineBuff = 1;
            if (doctrineBuffMap.has(battalion.Name)){ //check the doctrinesbuff map to see if this battalion has a buff that can be given
                if(Object.hasOwn(doctrineBuffMap.get(battalion.Name), "Recon")){
                    console.log(doctrineBuffMap.get(battalion.Name).Recon);
                    doctrineBuff = doctrineBuffMap.get(battalion.Name).Recon;                    
                }
            }
            if (doctrineBuffMap.has(battalion.Type)){ // bug here, have to check that the soft attack stats is there or not
                if(Object.hasOwn(doctrineBuffMap.get(battalion.Type), "Recon")){
                    console.log(doctrineBuffMap.get(battalion.Type).Recon);
                    doctrineBuff = doctrineBuffMap.get(battalion.Type).Recon;                    
                }
            }
            if (doctrineBuffMap.has("Frontline") &&  battalion.Frontline === true){
                if(Object.hasOwn(doctrineBuffMap.get("Frontline"), "Recon")){
                    console.log(doctrineBuffMap.get("Frontline").Recon);
                    doctrineBuff = doctrineBuffMap.get("Frontline").Recon;                    
                }
            }
            if (doctrineBuffMap.has("Army")){
                if(Object.hasOwn(doctrineBuffMap.get("Army"), "Recon")){
                    console.log(doctrineBuffMap.get("Army").Recon);
                    doctrineBuff = doctrineBuffMap.get("Army").Recon;                    
                }
            }
            return (battalion.Recon + yearTech.get(battalion.Name).Recon * doctrineBuff)
        }
    }
    return 0
}

export function supplyUse(battalionMap, yearTech, doctrineBuffMap){

    let total = 0;
    if (battalionMap.size > 0) {
        for (const battalion of battalionMap.keys()){
            let doctrineBuff = 0;
            if (doctrineBuffMap.has(battalion.Name)){ //check the doctrinesbuff map to see if this battalion has a buff that can be given
                if(Object.hasOwn(doctrineBuffMap.get(battalion.Name), "Supply")){
                    console.log(doctrineBuffMap.get(battalion.Name).Supply);
                    doctrineBuff += doctrineBuffMap.get(battalion.Name).Supply;                    
                }
            }
            if (doctrineBuffMap.has(battalion.Type)){ // bug here, have to check that the soft attack stats is there or not
                if(Object.hasOwn(doctrineBuffMap.get(battalion.Type), "Supply")){
                    console.log(doctrineBuffMap.get(battalion.Type).Supply);
                    doctrineBuff += doctrineBuffMap.get(battalion.Type).Supply;                    
                }
            }
            if (doctrineBuffMap.has("Frontline") &&  battalion.Frontline === true){
                if(Object.hasOwn(doctrineBuffMap.get("Frontline"), "Supply")){
                    console.log(doctrineBuffMap.get("Frontline").Supply);
                    doctrineBuff += doctrineBuffMap.get("Frontline").Supply;                    
                }
            }
            if (doctrineBuffMap.has("Army")){
                if(Object.hasOwn(doctrineBuffMap.get("Army"), "Supply")){
                    console.log(doctrineBuffMap.get("Army").Supply);
                    doctrineBuff += doctrineBuffMap.get("Army").Supply;                    
                }
            }
            total += (battalion.Supply + yearTech.get(battalion.Name).Supply * (1+doctrineBuff)) * battalionMap.get(battalion);
        }
    } else {
        return 0
    }


    return total
}

export function weight(battalionMap, yearTech){
    let total = 0;
    if (battalionMap.size > 0) {
        for (const battalion of battalionMap.keys()){
            total += (battalion.Weight + yearTech.get(battalion.Name).Weight) * battalionMap.get(battalion);
        }
    } else {
        return 0
    }


    return total
}

export function avg_relia(battalionMap, yearTech){
    // avg reliability is calculated by taking the average reliability of the battalion, and then averaging that with the entire division
    // ex, 6 infantry, 1 moterized anti-tank, support anti-tank
    // = (6*0.9 + 0.8 + 0.8 )/8 battalions = 0.875, math checks out but dang
    
    let total = 0;
    let size = 0;
    let subTotal = 0;
    let subSize = 0;

    if (battalionMap.size <= 0) {
        return 0
    } else {
        for (const battalion of battalionMap.keys()){
            console.log(battalion.Equipment_List);
            battalion.Equipment_List.forEach(element => {
                subTotal += element.Reliability;
                subSize += 1;
                console.log(`${element.Name}: subTotal = ${subTotal} subSize = ${subSize}`);
            });
            total += (subTotal/subSize)*battalionMap.get(battalion);
            size += battalionMap.get(battalion);
            subTotal = 0;
            subSize = 0;
            console.log("Size: "+size);
        }        
    }

    if (size === 0){
        return 0
    } else {
        return 100*(total/size)
    }
}

export function reliBonus(battalionMap, yearTech){
    for (const battalion of battalionMap.keys()){
        if (battalion.Name === "Maintenance Company"){
            return (battalion.Relia_Bonus  + yearTech.get(battalion.Name).Relia_Bonus) * 100
        }
    }
    return 0
}

export function trickleBack(battalionMap, yearTech){
    //hospital only
    for (const battalion of battalionMap.keys()){
        if (battalion.Name === "Field Hospital"){
            return (battalion.Trickleback + yearTech.get(battalion.Name).Trickleback) * 100
        }
    }
    return 0
}

export function xpLoss(battalionMap, yearTech){
    //only add hospital
    for (const battalion of battalionMap.keys()){
        if (battalion.Name === "Field Hospital"){
            return (battalion.Exp_Loss + yearTech.get(battalion.Name).Exp_Loss) * 100
        }
    }
    return 0
}

//combat stats functions
export function softAtk(battalionMap, yearTech, doctrineBuffMap){
    let total = 0;
    if (battalionMap.size > 0) {
        for (const battalion of battalionMap.keys()){
            let doctrineBuff = 0;
            console.log();
            if (doctrineBuffMap.has(battalion.Name)){ //check the doctrinesbuff map to see if this battalion has a buff that can be given
                if(Object.hasOwn(doctrineBuffMap.get(battalion.Name), "Soft_Attack")){
                    console.log("name "+doctrineBuffMap.get(battalion.Name).Soft_Attack);
                    doctrineBuff += doctrineBuffMap.get(battalion.Name).Soft_Attack;                    
                }
            }
            if (doctrineBuffMap.has(battalion.Type)){ // bug here, have to check that the soft attack stats is there or not
                if(Object.hasOwn(doctrineBuffMap.get(battalion.Type), "Soft_Attack")){
                    console.log("type "+doctrineBuffMap.get(battalion.Type).Soft_Attack);
                    doctrineBuff += doctrineBuffMap.get(battalion.Type).Soft_Attack;                    
                }
            }
            if (doctrineBuffMap.has("Frontline") &&  battalion.Frontline === true){
                if(Object.hasOwn(doctrineBuffMap.get("Frontline"), "Soft_Attack")){
                    console.log("frontline "+doctrineBuffMap.get("Frontline").Soft_Attack);
                    doctrineBuff += doctrineBuffMap.get("Frontline").Soft_Attack;                    
                }
            }
            if (doctrineBuffMap.has("Army")){
                if(Object.hasOwn(doctrineBuffMap.get("Army"), "Soft_Attack")){
                    console.log("army "+doctrineBuffMap.get("Army").Soft_Attack);
                    doctrineBuff += doctrineBuffMap.get("Army").Soft_Attack;                    
                }
            }       
            doctrineBuff += 1;
            console.log((battalion.Soft_Attack * doctrineBuff));
            console.log(`${battalion.Name} : soft attack: ${battalion.Soft_Attack + yearTech.get(battalion.Name).Soft_Attack * (doctrineBuff)}`);
            total += ((battalion.Soft_Attack + yearTech.get(battalion.Name).Soft_Attack) * (doctrineBuff)) * battalionMap.get(battalion) ;
        }
    } else {
        return 0
    }


    return total
}

export function hardAtk(battalionMap, yearTech, doctrineBuffMap){
    let total = 0;
    if (battalionMap.size > 0) {
        for (const battalion of battalionMap.keys()){
            let doctrineBuff = 0;
            if (doctrineBuffMap.has(battalion.Name)){ //check the doctrinesbuff map to see if this battalion has a buff that can be given
                if(Object.hasOwn(doctrineBuffMap.get(battalion.Name), "Hard_Attack")){
                    console.log(doctrineBuffMap.get(battalion.Name).Hard_Attack);
                    doctrineBuff += doctrineBuffMap.get(battalion.Name).Hard_Attack;                    
                }
            }
            if (doctrineBuffMap.has(battalion.Type)){ // bug here, have to check that the soft attack stats is there or not
                if(Object.hasOwn(doctrineBuffMap.get(battalion.Type), "Hard_Attack")){
                    console.log(doctrineBuffMap.get(battalion.Type).Hard_Attack);
                    doctrineBuff += doctrineBuffMap.get(battalion.Type).Hard_Attack;                    
                }
            }
            if (doctrineBuffMap.has("Frontline") &&  battalion.Frontline === true){
                if(Object.hasOwn(doctrineBuffMap.get("Frontline"), "Hard_Attack")){
                    console.log(doctrineBuffMap.get("Frontline").Hard_Attack);
                    doctrineBuff += doctrineBuffMap.get("Frontline").Hard_Attack;                    
                }
            }
            if (doctrineBuffMap.has("Army")){
                if(Object.hasOwn(doctrineBuffMap.get("Army"), "Hard_Attack")){
                    console.log(doctrineBuffMap.get("Army").Hard_Attack);
                    doctrineBuff += doctrineBuffMap.get("Army").Hard_Attack;                    
                }
            }
            total += (battalion.Hard_Attack + yearTech.get(battalion.Name).Hard_Attack  * (1+doctrineBuff)) * battalionMap.get(battalion);
        }
    } else {
        return 0
    }


    return total
}

export function defense(battalionMap, yearTech, doctrineBuffMap){
    let total = 0;
    if (battalionMap.size > 0) {
        for (const battalion of battalionMap.keys()){
            let doctrineBuff = 0;
            if (doctrineBuffMap.has(battalion.Name)){ //check the doctrinesbuff map to see if this battalion has a buff that can be given
                if(Object.hasOwn(doctrineBuffMap.get(battalion.Name), "Defense")){
                    console.log(doctrineBuffMap.get(battalion.Name).Defense);
                    doctrineBuff += doctrineBuffMap.get(battalion.Name).Defense;                    
                }
            }
            if (doctrineBuffMap.has(battalion.Type)){ // bug here, have to check that the soft attack stats is there or not
                if(Object.hasOwn(doctrineBuffMap.get(battalion.Type), "Defense")){
                    console.log(doctrineBuffMap.get(battalion.Type).Defense);
                    doctrineBuff += doctrineBuffMap.get(battalion.Type).Defense;                    
                }
            }
            if (doctrineBuffMap.has("Frontline") &&  battalion.Frontline === true){
                if(Object.hasOwn(doctrineBuffMap.get("Frontline"), "Defense")){
                    console.log(doctrineBuffMap.get("Frontline").Defense);
                    doctrineBuff += doctrineBuffMap.get("Frontline").Defense;                    
                }
            }
            if (doctrineBuffMap.has("Army")){
                if(Object.hasOwn(doctrineBuffMap.get("Army"), "Defense")){
                    console.log(doctrineBuffMap.get("Army").Defense);
                    doctrineBuff += doctrineBuffMap.get("Army").Defense;                    
                }
            }
            total += (battalion.Defense + yearTech.get(battalion.Name).Defense * (1+doctrineBuff)) * battalionMap.get(battalion);
        }
    } else {
        return 0
    }


    return total   
}

export function breakthrough(battalionMap, yearTech, doctrineBuffMap){
    let total = 0;

    if (battalionMap.size > 0) {
        for (const battalion of battalionMap.keys()){
            let doctrineBuff = 0;
            if (doctrineBuffMap.has(battalion.Name)){ //check the doctrinesbuff map to see if this battalion has a buff that can be given
                if(Object.hasOwn(doctrineBuffMap.get(battalion.Name), "Breakthrough")){
                    console.log(doctrineBuffMap.get(battalion.Name).Breakthrough);
                    doctrineBuff += doctrineBuffMap.get(battalion.Name).Breakthrough;                    
                }
            }
            if (doctrineBuffMap.has(battalion.Type)){ // bug here, have to check that the soft attack stats is there or not
                if(Object.hasOwn(doctrineBuffMap.get(battalion.Type), "Breakthrough")){
                    console.log(doctrineBuffMap.get(battalion.Type).Breakthrough);
                    doctrineBuff += doctrineBuffMap.get(battalion.Type).Breakthrough;                    
                }
            }
            if (doctrineBuffMap.has("Frontline") &&  battalion.Frontline === true){
                if(Object.hasOwn(doctrineBuffMap.get("Frontline"), "Breakthrough")){
                    console.log(doctrineBuffMap.get("Frontline").Breakthrough);
                    doctrineBuff += doctrineBuffMap.get("Frontline").Breakthrough;                    
                }
            }
            if (doctrineBuffMap.has("Army")){
                if(Object.hasOwn(doctrineBuffMap.get("Army"), "Breakthrough")){
                    console.log(doctrineBuffMap.get("Army").Breakthrough);
                    doctrineBuff += doctrineBuffMap.get("Army").Breakthrough;                    
                }
            }
            total += (battalion.Breakthrough + yearTech.get(battalion.Name).Breakthrough * (1+doctrineBuff))* battalionMap.get(battalion);
        }
    } else {
        return 0
    }


    return total
}

export function airAtk(battalionMap, yearTech, doctrineBuffMap){
    let total = 0;

    if (battalionMap.size > 0) {
        for (const battalion of battalionMap.keys()){
            let doctrineBuff = 0;

            if (doctrineBuffMap.has(battalion.Name)){ //check the doctrinesbuff map to see if this battalion has a buff that can be given
                if(Object.hasOwn(doctrineBuffMap.get(battalion.Name), "Air_Attack")){
                    console.log(doctrineBuffMap.get(battalion.Name).Air_Attack);
                    doctrineBuff += doctrineBuffMap.get(battalion.Name).Air_Attack;                    
                }
            }
            if (doctrineBuffMap.has(battalion.Type)){ // bug here, have to check that the soft attack stats is there or not
                if(Object.hasOwn(doctrineBuffMap.get(battalion.Type), "Air_Attack")){
                    console.log(doctrineBuffMap.get(battalion.Type).Air_Attack);
                    doctrineBuff += doctrineBuffMap.get(battalion.Type).Air_Attack;                    
                }
            }
            if (doctrineBuffMap.has("Frontline") &&  battalion.Frontline === true){
                if(Object.hasOwn(doctrineBuffMap.get("Frontline"), "Air_Attack")){
                    console.log(doctrineBuffMap.get("Frontline").Air_Attack);
                    doctrineBuff += doctrineBuffMap.get("Frontline").Air_Attack;                    
                }
            }
            if (doctrineBuffMap.has("Army")){
                if(Object.hasOwn(doctrineBuffMap.get("Army"), "Air_Attack")){
                    console.log(doctrineBuffMap.get("Army").Air_Attack);
                    doctrineBuff += doctrineBuffMap.get("Army").Air_Attack;                    
                }
            }
            total += (battalion.Air_Attack + yearTech.get(battalion.Name).Air_Attack) * battalionMap.get(battalion);
        }
    } else {
        return 0
    }


    return total
}

export function combatWidth(battalionMap, yearTech, doctrineBuffMap){
    let total = 0;

    if (battalionMap.size > 0) {
        for (const battalion of battalionMap.keys()){
            let doctrineBuff = 0;

            if (doctrineBuffMap.has(battalion.Name)){ //check the doctrinesbuff map to see if this battalion has a buff that can be given
                if(Object.hasOwn(doctrineBuffMap.get(battalion.Name), "Width")){
                    console.log(doctrineBuffMap.get(battalion.Name).Width);
                    doctrineBuff += doctrineBuffMap.get(battalion.Name).Width;                    
                }
            }
            if (doctrineBuffMap.has(battalion.Type)){ // bug here, have to check that the soft attack stats is there or not
                if(Object.hasOwn(doctrineBuffMap.get(battalion.Type), "Width")){
                    console.log(doctrineBuffMap.get(battalion.Type).Width);
                    doctrineBuff += doctrineBuffMap.get(battalion.Type).Width;                    
                }
            }
            if (doctrineBuffMap.has("Frontline") &&  battalion.Frontline === true){
                if(Object.hasOwn(doctrineBuffMap.get("Frontline"), "Width")){
                    console.log(doctrineBuffMap.get("Frontline").Width);
                    doctrineBuff += doctrineBuffMap.get("Frontline").Width;                    
                }
            }
            if (doctrineBuffMap.has("Army")){
                if(Object.hasOwn(doctrineBuffMap.get("Army"), "Width")){
                    console.log(doctrineBuffMap.get("Army").Width);
                    doctrineBuff += doctrineBuffMap.get("Army").Width;                    
                }
            }
            total += (battalion.Width + yearTech.get(battalion.Name).Width + doctrineBuff)* battalionMap.get(battalion);
        }
    } else {
        return 0
    }


    return total
}

export function armour(battalionMap, yearTech){
    let highest = 0;
    let total = 0;
    let totalBat = 0;
    if (battalionMap.size > 0) {
        for (const battalion of battalionMap.keys()){
            if (battalion.Armour != null){
                if(highest < (battalion.Armour + yearTech.get(battalion.Name).Armour)){
                    highest = battalion.Armour + yearTech.get(battalion.Name).Armour;
                }
                total += (battalion.Armour + yearTech.get(battalion.Name).Armour) * battalionMap.get(battalion);
            }
            totalBat += battalionMap.get(battalion);
        }        
    } else {
        return 0
    }



    return 0.4*highest + 0.6*(total/totalBat)
    
}

export function hardness(battalionMap, yearTech){
    let total = 0;
    let totalBats = 0;

    if (battalionMap.size > 0){
        for (const battalion of battalionMap.keys()){
            if (battalion.Type != "Support_Company"){
                total += (battalion.Hardness + yearTech.get(battalion.Name).Hardness)* battalionMap.get(battalion);
                totalBats += battalionMap.get(battalion);
            }

        }        
    } else {
        return 0
    }


    if (totalBats === 0){
        return 0
    } else {
        return 100*(total/totalBats)
    }
}

export function initiative(battalionMap, yearTech){
    //no initiative unless added signal companies
    for (const battalion of battalionMap.keys()){
        if (battalion.Name === "Signal Company"){
            return (battalion.Initiative + yearTech.get(battalion.Name).Initiative) * 100
        }
    }
    return 0
}

export function entrench(battalionMap, yearTech){
    //no entrenchment unless you add engineers 
    
}

export function piercing(battalionMap, yearTech){
    let highest = 0;
    let total = 0;
    let totalBat = 0;
    if (battalionMap.size > 0) {
        for (const battalion of battalionMap.keys()){
            if (battalion.Piercing != null){
                if(highest < (battalion.Piercing + yearTech.get(battalion.Name).Piercing)){
                    highest = (battalion.Piercing + yearTech.get(battalion.Name).Piercing);
                }
                total += (battalion.Piercing + yearTech.get(battalion.Name).Piercing) + battalionMap.get(battalion);
            }
            totalBat += battalionMap.get(battalion);
        }        
    } else {
        return 0
    }



    return 0.4*highest + 0.6*(total/totalBat)

}

export function capture_ratio(battalionMap, yearTech){
    for (const battalion of battalionMap.keys()){
        if (battalion.Name === "Maintenance Company"){
            return (battalion.Equipment_Capture_Ratio + yearTech.get(battalion.Name).Equipment_Capture_Ratio)
        }
    }
    return 0
}

export function manpower(battalionMap, yearTech){
    let sum = 0;
    for (const battalion of battalionMap.keys()){
        sum += (battalion.Manpower + yearTech.get(battalion.Name).Manpower);
    }

    return sum;
}

export function fuel_cap(battalionMap, yearTech){
    let sum = 0;
    for (const battalion of battalionMap.keys()){
        sum += (battalion.Fuel_Cap + yearTech.get(battalion.Name).Fuel_Cap);
    }

    return sum;    
}

export function training(battalionMap, yearTech){
    let max = 0;
    for (const battalion of battalionMap.keys()){
        if (battalion.TrainingTime > max){
            max = (battalion.TrainingTime + yearTech.get(battalion.Name).TrainingTime);
        }
    }
    return max;
}

export function fuel_usage(battalionMap, yearTech){
    //apply logistics after calculating
    let sum = 0;
    for (const battalion of battalionMap.keys()){
        sum += (battalion.Fuel_Use + yearTech.get(battalion.Name).Fuel_Use);
    }

    return sum;  
}

export default speed;