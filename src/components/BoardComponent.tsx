import React, { FC, useState } from 'react'
import { Board } from '../models/Board'
import { Cell } from '../models/Cell'
import CellComponent from './CellComponent'

interface BoardProps {
  board: Board
  setBoard: (board: Board) => void
}

const BoardComponent: FC<BoardProps> = ({ board, setBoard }) => {
  const [selectCell, setSelectCell] = useState<Cell | null>(null)

  function clickCell(cell: Cell) {
    if (cell.figure) {
      setSelectCell(cell)
    }
  }
  return (
    <div className="board">
      {board.cells.map((row, index) => (
        <React.Fragment key={index}>
          {row.map((cell) => (
            <CellComponent
              click={clickCell}
              cell={cell}
              key={cell.id}
              select={cell.x === selectCell?.x && cell.y === selectCell?.y}
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  )
}

export default BoardComponent
