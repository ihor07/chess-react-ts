import { click } from '@testing-library/user-event/dist/click'
import React, { FC } from 'react'
import { Cell } from '../models/Cell'

interface CellProps {
  cell: Cell
  select: boolean
  click: (cell: Cell) => void
}

const CellComponent: FC<CellProps> = ({ cell, select, click }) => {
  return (
    <div
      className={['cell', cell.color, select ? 'select' : ''].join(' ')}
      onClick={() => click(cell)}
      style={{ background: cell.available && cell.figure ? 'green' : '' }}>
      {cell.available && !cell.figure && <div className={'available'} />}
      {cell.figure?.logo && <img src={cell.figure.logo} alt="" />}
    </div>
  )
}

export default CellComponent
