import { Cell } from '../Cell'
import { Colors } from '../Colors'
import { Figure, FigureNames } from './Figure'
import blackLogo from '../../assets/black-king.png'
import whiteLogo from '../../assets/white-king.png'

export class King extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell)
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo
    this.name = FigureNames.KING
  }
  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false
    const verticalDirection =
      (target.y === this.cell.y + 1 || target.y === this.cell.y - 1) &&
      target.x === this.cell.x
    const horizontalDirection =
      (target.x === this.cell.x + 1 || target.x === this.cell.x - 1) &&
      target.y === this.cell.y
    const diagonalDirectionLeft =
      (target.x === this.cell.x + 1 && target.y === this.cell.y + 1) ||
      (target.x === this.cell.x - 1 && target.y === this.cell.y - 1)
    const diagonalDirectionRight =
      (target.x === this.cell.x + 1 && target.y === this.cell.y - 1) ||
      (target.x === this.cell.x - 1 && target.y === this.cell.y + 1)

    if (
      verticalDirection ||
      horizontalDirection ||
      diagonalDirectionLeft ||
      diagonalDirectionRight
    )
      return true
    return false
  }
}
