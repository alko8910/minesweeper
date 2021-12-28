import React, {useState, useEffect} from 'react'
import createBoard from '../util/createBoard'
import Cell from './Cell'
import { revealed } from "../util/reveal";
const Board = ({height, width, mines}) => {
    const [grid, setGrid] = useState([])
    const [nonMineCount, setNonMineCount] = useState(0)
    const [mineLocations, setMineLocations] = useState([]);
    const [gameOver, setGameOver] = useState(false)
    const [mineCounter, setMineCounter] = useState(10);
    const [won, setWon] = useState(false);
    const [startButton, setStartButton] = useState(true)
    useEffect(() => {
        //creating a board
         freshBoard()
    }, [])
    function freshBoard() {
        const newBoard = createBoard(height, width, mines);
        setNonMineCount(width*width-mines);
        setMineLocations(newBoard.mineLocation)
        setGrid(newBoard.board)
    }

    //on right click /flaggcell
    const updateFlag = (e, x, y) => {
      
        e.preventDefault();
        if(gameOver || won || startButton) {
            return
        }
        let newGrid = JSON.parse(JSON.stringify(grid));
        console.log(newGrid[x][y])
        if(mineCounter > 0){
            if(!newGrid[x][y].flagged){
                newGrid[x][y].flagged = true;
                setMineCounter(mineCounter - 1)
                
            }else{
               newGrid[x][y].flagged = false
                setMineCounter(mineCounter + 1)
            }
        }
        if(mineCounter === 0 && newGrid[x][y].flagged === true){
            newGrid[x][y].flagged = false
                setMineCounter(mineCounter + 1)
        }
        setGrid(newGrid)
      
    }
    const revealCell = (x, y) => {
        if(grid[x][y].reveal || gameOver || startButton) {
            return;
        }
        if(grid[x][y].flagged){
            return
        }
        let newGrid = JSON.parse(JSON.stringify(grid));
        if(newGrid[x][y].value === 'X'){
            for(let i = 0; i < mineLocations.length; i++) {
                 newGrid[mineLocations[i][0]][mineLocations[i][1]].revealed  = true;
           
          
           
        }
            setGrid(newGrid);
            setGameOver(true);
            showBoard()
            
        }else{
            let newRevealBoard = revealed(newGrid, x, y, nonMineCount)
            setGrid(newRevealBoard.arr);
            setNonMineCount(newRevealBoard.newNonMinesCount);
            if(newRevealBoard.newNonMinesCount === 0){
                setWon(true)
                showBoard()
            }
        }
        
    }
    const restartGame = () => {
        setGameOver(false);
        freshBoard();
        setMineCounter(10);
        setWon(false);
        setStartButton(false);
    }
console.log(grid)

const showBoard = () => {
    let newGrid = JSON.parse(JSON.stringify(grid));
    newGrid.map((data) => {
        data.map((dataItem) => {
            if(dataItem.flagged && dataItem.value === "X"){
                dataItem.revealed = false
            }else{
                dataItem.revealed = true;
            }
            
        })
    })
    setGrid(newGrid)
}
   return (
       <div>
          <div className='div-change'> 
              {
                gameOver  &&
               <p className='message'>You Lost</p>
           }
           {
               won && 
               <p className='message'>You Won!!</p>
           }
           { mineCounter >= 0 &&
           <p className='message'>Mines remaing: {mineCounter}</p>
           }
           </div>
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
              { (gameOver || won || startButton)   && 
                <button onClick={restartGame}>Play</button>
        }

       </div>   )

   
    
    
}

export default Board
