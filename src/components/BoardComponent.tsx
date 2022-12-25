import React, { FC, useEffect, useState } from 'react'
import { Board } from '../models/Board'
import { Cell } from '../models/Cell'
import { Player } from '../models/Player'
import CellComponent from './CellComponent'

interface BoardProps {
  board: Board
  setBoard: (board: Board) => void
  currentPlayer: Player | null
  swapPlayer: () => void
}

const BoardComponent: FC<BoardProps> = ({
  board,
  setBoard,
  currentPlayer,
  swapPlayer,
}) => {
  const [selectCell, setSelectCell] = useState<Cell | null>(null)

  function clickCell(cell: Cell) {
    if (selectCell && selectCell !== cell && selectCell.figure?.canMove(cell)) {
      selectCell.moveFigure(cell)
      swapPlayer()
      setSelectCell(null)
      updateBoard()
    } else {
      if (cell.figure?.color === currentPlayer?.color) {
        setSelectCell(cell)
      }
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
    <div>
      <h3 className="step">Now step {currentPlayer?.color}</h3>
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
    </div>
  )
}

export default BoardComponent
