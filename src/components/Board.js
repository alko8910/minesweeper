import React, {useState, useEffect} from 'react'
import createBoard from '../util/createBoard'
import Cell from './Cell'
import { revealed } from "../util/reveal";
const Board = () => {
    const [grid, setGrid] = useState([])
    const [nonMineCount, setNonMineCount] = useState(0)
    const [mineLocations, setMineLocations] = useState([])
    useEffect(() => {
        //creating a board
        function freshBoard() {
            const newBoard = createBoard(8,8,10);
            setNonMineCount(8*8-10);
            setMineLocations(newBoard.mineLocation)
            setGrid(newBoard.board)
        }
        
        freshBoard()
    }, [])

    //on right click /flaggcell
    const updateFlag = (e, x, y) => {
        e.preventDefault();
        let newGrid = JSON.parse(JSON.stringify(grid));
        console.log(newGrid[x][y])
        newGrid[x][y].flagged = true;
        setGrid(newGrid)
      
    }

    const revealCell = (x, y) => {
        if(grid[x][y].reveal) {
            return;
        }
        let newGrid = JSON.parse(JSON.stringify(grid));
        if(newGrid[x][y].value === 'X'){
            alert('minefound')
            for(let i = 0; i < mineLocations.length; i++) {
                newGrid[mineLocations[i][0]][mineLocations[i][1]].revealed  = true;
            }
            setGrid(newGrid)
        }else{
            let newRevealBoard = revealed(newGrid, x, y, nonMineCount)
            setGrid(newRevealBoard.arr);
            setNonMineCount(newRevealBoard.newNonMinesCount)
        }
        
    }

   return (
       <div>
           <p>{nonMineCount}</p>
           <div style= {{
               display:'flex',
               flexDirection:"column",
               alignItems:"center",
           }}>
               {grid.map((singleRow, index1) => {
                return (
                    <div style={{display:'flex'}} key={index1}>
                        {singleRow.map((singleBlock, index2) => {
                        return (
                            <Cell 
                            revealCell={revealCell}
                            details={singleBlock}
                            updateFlag={updateFlag}
                            key={index2}
                            />
                            )
                    
                    })}
                    </div>
                )
    }) }
           </div>
       </div>   )

   
    
    
}

export default Board
