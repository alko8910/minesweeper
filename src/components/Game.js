import React from 'react'
import Board from './Board'
const Game = () => {
    const height = 8;
    const width = 8;
    const mines = 1;
    return (
        <div>
            <Board 
                height={height}
                width={width}
                mines={mines}
            />
        </div>
    )
}

export default Game
