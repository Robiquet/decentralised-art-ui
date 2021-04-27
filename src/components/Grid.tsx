import Pixel from "./Pixel";
import styled from "styled-components";

const COLS = 20;
const ROWS = 20;

const Row = styled.div`
  display: flex;
`;

const Container = styled.div`
  height: 2000px;
  width: 2000px;
  overflow: auto;
`;

const Grid = () => {
  const numbers = Array(ROWS)
    .fill(0)
    .map((el, row) => (
      <Row key={row}>
        {Array(COLS)
          .fill(0)
          .map((el, col) => (
            <Pixel key={`${row}_${col}`}></Pixel>
          ))}
      </Row>
    ));

  return <Container>{numbers}</Container>;
};

export default Grid;
