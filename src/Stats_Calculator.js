import Equipment_Catalogue from './Units&Data/Equipment.json'
import Year_Bonus from './Units&Data/YearBonus.json'

export function softAtk(battalionMap, year, doctrineBuffs){

    let total = 0;

    console.log(Object.keys(Equipment_Catalogue));
    for (let battalion of battalionMap.keys()){
        battalion.Equipment_List.forEach(element => {
            console.log(Equipment_Catalogue[year][element.Name].Soft_Attack);
        });
    }
    return total
}

export function list(){
    console.log(Equipment_Catalogue);
}

export default list