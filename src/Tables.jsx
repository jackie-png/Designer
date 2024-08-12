import { useState, useContext} from "react";
import styles from './Tables.module.css';
import { statsArrays } from "./App";

function Tables(){  

    const stats = useContext(statsArrays);
    
    return (
       <div>
            <table className={styles.table}>
                <tr>
                    <th className={styles.tableHeader}>
                        Base Stats
                    </th>
                    <th className={styles.tableHeader}>
                        Attack Stats
                    </th>
                    <th className={styles.tableHeader}>
                        Equipment Cost
                    </th>
                </tr>
                <tr>
                    <td className={styles.tableCell}>
                        <span style={{float: "left"}}>Max Speed</span><span style={{float: "right"}}>{stats.baseStats[0].toFixed(2)} km/hr</span>
                        
                    </td>
                    <td className={styles.tableCell}>
                        <span style={{float: "left"}}>Soft Attack</span><span style={{float: "right"}}>{stats.attackStats[0].toFixed(2)}</span>
                    </td>
                    <td className={styles.tableCell}>
                        <span style={{float: "left"}}>Manpower</span><span style={{float: "right"}}>{stats.equipmentCost[0].toFixed(2)}</span>
                    </td>
                </tr>
                <tr>
                    <td className={styles.tableCell}>
                        <span style={{float: "left"}}>Health Points</span><span style={{float: "right"}}>{stats.baseStats[1].toFixed(2)}</span>
                    </td>
                    <td className={styles.tableCell}>
                        <span style={{float: "left"}}>Hard Attack</span><span style={{float: "right"}}>{stats.attackStats[1].toFixed(2)}</span>
                    </td>
                    <td className={styles.tableCell}>
                        <span style={{float: "left"}}>Training Time</span><span style={{float: "right"}}>{stats.equipmentCost[1].toFixed(2)}</span>
                    </td>
                </tr>
                <tr>
                    <td className={styles.tableCell}>
                    <span style={{float: "left"}}>Organization</span><span style={{float: "right"}}>{stats.baseStats[2].toFixed(2)}</span>
                    </td>
                    <td className={styles.tableCell}>
                    <span style={{float: "left"}}>Air Attack</span><span style={{float: "right"}}>{stats.attackStats[2].toFixed(2)}</span>
                    </td>
                    <td className={styles.tableCell}>
                        <span style={{float: "left"}}>Fuel Capacity</span><span style={{float: "right"}}>{stats.equipmentCost[2].toFixed(2)}</span>
                    </td>
                </tr>
                <tr>
                    <td className={styles.tableCell}>
                    <span style={{float: "left"}}>Recovery Rate</span><span style={{float: "right"}}>{stats.baseStats[3].toFixed(2)}</span>

                    </td>
                    <td className={styles.tableCell}>
                    <span style={{float: "left"}}>Defence</span><span style={{float: "right"}}>{stats.attackStats[3].toFixed(2)}</span>
                    </td>                
                    <td className={styles.tableCell}>
                        <span style={{float: "left"}}>Fuel Usage</span><span style={{float: "right"}}>{stats.equipmentCost[3].toFixed(2)}</span>
                    </td>
                </tr>
                <tr>
                    <td className={styles.tableCell}>
                    <span style={{float: "left"}}>Reconnaissance</span><span style={{float: "right"}}>{stats.baseStats[4].toFixed(2)}</span>
                    </td>
                    <td className={styles.tableCell}>
                    <span style={{float: "left"}}>Breakthrough</span><span style={{float: "right"}}>{stats.attackStats[4].toFixed(2)}</span>
                    </td>
                </tr>
                <tr>
                    <td className={styles.tableCell}>
                    <span style={{float: "left"}}>Suppression</span><span style={{float: "right"}}>{stats.baseStats[5].toFixed(2)}</span>
                    </td>
                    <td className={styles.tableCell}>
                    <span style={{float: "left"}}>Armour</span><span style={{float: "right"}}>{stats.attackStats[5].toFixed(2)}</span>

                    </td>
                </tr>
                <tr>
                    <td className={styles.tableCell}>
                    <span style={{float: "left"}}>Weight</span><span style={{float: "right"}}>{stats.baseStats[6].toFixed(2)}</span>
                    </td>
                    <td className={styles.tableCell}>
                    <span style={{float: "left"}}>Piercing</span><span style={{float: "right"}}>{stats.attackStats[6].toFixed(2)}</span>
                    </td>
                </tr>
                <tr>
                    <td className={styles.tableCell}>
                    <span style={{float: "left"}}>Supply Use</span><span style={{float: "right"}}>{stats.baseStats[7].toFixed(2)}</span>
                    </td>
                    <td className={styles.tableCell}>
                    <span style={{float: "left"}}>Inititive</span><span style={{float: "right"}}>{stats.attackStats[7].toFixed(2)}%</span>
                    </td>
                </tr>
                <tr>
                    <td className={styles.tableCell}>
                    <span style={{float: "left"}}>Avg Reliability</span><span style={{float: "right"}}>{stats.baseStats[8].toFixed(2)}%</span>
                    </td>
                    <td className={styles.tableCell}>
                    <span style={{float: "left"}}>Entrenchment</span><span style={{float: "right"}}>{stats.attackStats[8].toFixed(2)}</span>
                    </td>
                </tr>
                <tr>
                    <td className={styles.tableCell}>
                    <span style={{float: "left"}}>Reliability Bonus</span><span style={{float: "right"}}>{stats.baseStats[9].toFixed(2)}%</span>
                    </td>
                    <td className={styles.tableCell}>
                    <span style={{float: "left"}}>Eq Capture Ratio</span><span style={{float: "right"}}>{stats.attackStats[9].toFixed(2)}%</span>
                    </td>
                </tr>
                <tr>
                    <td className={styles.tableCell}>
                    <span style={{float: "left"}}>TrickleBack & War Support Protection</span><span style={{float: "right"}}>{stats.baseStats[10].toFixed(2)}%</span>
                    </td>
                    <td className={styles.tableCell}>
                    <span style={{float: "left"}}>Combat Width</span><span style={{float: "right"}}>{stats.attackStats[10].toFixed(2)}</span>
                    </td>
                </tr>
                <tr>
                    <td className={styles.tableCell}>
                    <span style={{float: "left"}}>Exp Loss</span><span style={{float: "right"}}>{stats.baseStats[11].toFixed(2)}%</span>
                    </td>
                    <td className={styles.tableCell}>
                    <span style={{float: "left"}}>Hardness</span><span style={{float: "right"}}>{stats.attackStats[11].toFixed(2)}%</span>
                    </td>

                </tr>

            </table>
       </div> 
    );
}//make a seperate table and have each column be an image

export default Tables