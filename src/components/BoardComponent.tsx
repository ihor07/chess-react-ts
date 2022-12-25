import React, { FC, useEffect, useState } from 'react'
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
    if (selectCell && selectCell !== cell && selectCell.figure?.canMove(cell)) {
      selectCell.moveFigure(cell)
      setSelectCell(null)
      updateBoard()
    } else {
      setSelectCell(cell)
    }
  }
  useEffect(() => {
    highlightCells()
  }, [selectCell])

  function highlightCells() {
    board.highlightCells(selectCell)
    updateBoard()
  }
  function updateBoard() {
    const newBoard = board.getCopyBoard()
    setBoard(newBoard)
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
