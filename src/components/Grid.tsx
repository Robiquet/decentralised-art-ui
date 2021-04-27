import Pixel from "./Pixel";
import "./Grid.scss";

const COLS = 20;
const ROWS = 20;

const Grid = () => {
    const numbers = Array(ROWS)
    .fill(0)
    .map((el, row) => (
      <div className="row" key={row}>
        {Array(COLS)
          .fill(0)
          .map((el, col) => (
            <Pixel key={`${row}_${col}`}></Pixel>
          ))}
      </div>
    ));

  return (
    <div className="grid">
        {numbers}
    </div>
  );
};

export default Grid;
