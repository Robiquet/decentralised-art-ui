import Pixel from "./Pixel";
import styled from "styled-components";
import { useEffect, useState } from "react";

const COLS = 5;
const ROWS = 5;

const Row = styled.div`
  display: flex;
`;

const Container = styled.div`
  height: 2000px;
  width: 2000px;
  overflow: auto;
`;

const Grid = () => {
  const [colours, setColours] = useState<string[][]>([]);

  useEffect(() => {
    setInterval(() => {
      const coloursGrid: string[][] = Array(ROWS)
        .fill(0)
        .map(() => {
          return Array(COLS)
            .fill(0)
            .map(() => {
              const colour = generateRandomColour();
              return colour;
            });
        });
      setColours(coloursGrid);
    }, 500);
  }, []);

  const generateRandomColour = () => {
    var randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
  };

  const numbers = colours.map((row, rowIndex) => (
    <Row key={rowIndex}>
      {row.map((colour, colIndex) => (
        <Pixel colour={colour} key={`${rowIndex}_${colIndex}`}></Pixel>
      ))}
    </Row>
  ));

  return <Container>{numbers}</Container>;
};

export default Grid;
