import React from 'react'

export default function Cell  ({details, updateFlag, revealCell})  {
 
    return (
        <div 
            onContextMenu={(e) => updateFlag(e, details.x, details.y)}
            onClick={() => revealCell(details.x, details.y)} 
            style={style.cellStyles} 
        >
            {!details.revealed && details.flagged ? '🚩'
            : details.revealed && details.value !==0 
            ? (details.value === 'X' 
                ? "💣"
                :details.value) 
            : ('')}
        </div>
    )
}
const style = {
    cellStyles:{
        width:40, 
        height:40,
        background:'grey',
        border:'1px solid black',
        display:'flex',
        justifyContetnt:'center',
        alignItems:"center",
        cursor: 'pointer',
    }
}

