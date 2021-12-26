import React from 'react'
import '../App.css'
export default function Cell  ({details, updateFlag, revealCell})  {
 
   const style = {
        background: details.revealed || details.flagged ? 'white' : ''
    }


    return (
        <div 
            onContextMenu={(e) => updateFlag(e, details.x, details.y)}
            onClick={() => revealCell(details.x, details.y)} 
            style={style} 
            className='cellStyle'
        >
            {!details.revealed && details.flagged ? '🚩'
            : details.revealed && details.value !== 0 
            ? (details.value === 'X' 
                ? "💣"
                :details.value) 
            : ('')}
        </div>
    )
}


