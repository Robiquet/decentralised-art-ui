import Pixel from "./Pixel";
import styled from "styled-components";
import { useEffect, useState } from "react";
import ConnectWallet from "./ConnectWallet";
import { HexColorPicker } from "react-colorful";


const COLS = 40;
const ROWS = 40;
const PIXEL_SIZE = 50;
const GRID_HEIGHT = ROWS * PIXEL_SIZE;
const GRID_WIDTH = COLS * PIXEL_SIZE;

const Row = styled.div`
  display: flex;
`;

interface ContainerProps {
  height: number;
  width: number;
}

const Container = styled.div<ContainerProps>`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  overflow: auto;
`;

const Grid = () => {
  const [colours, setColours] = useState<string[][]>([]);
  const [intervalRef, setIntervalRef] = useState<NodeJS.Timeout>();
  const [color, setColor] = useState("#000000");

  useEffect(() => {
    window.scrollTo(
      GRID_WIDTH / 2 - window.innerWidth / 2,
      GRID_HEIGHT / 2 - window.innerHeight / 2
    );

    setColours(generateGrid());

    const ref = setInterval(() => {
      const coloursGrid: string[][] = generateGrid();
      setColours(coloursGrid);
    }, 10000);
    setIntervalRef(ref);

    stopPreview(); // should be called when user connects wallet
  }, []);

  const stopPreview = () => {
    if (intervalRef) {
      clearInterval(intervalRef);
      setColours(generateEmptyGrid());
    }
  };

  const generateGrid = () => {
    return Array(ROWS)
      .fill(0)
      .map(() => {
        return Array(COLS)
          .fill(0)
          .map(() => {
            return shouldAssignColour() ? generateRandomColour() : "";
          });
      });
  };

  const generateEmptyGrid = () => {
    return Array(ROWS)
      .fill(0)
      .map(() => {
        return Array(COLS)
          .fill(0)
          .map(() => {
            return "";
          });
      });
  }

  const handleConnect=()=> {
    stopPreview()
  }

  const shouldAssignColour = () => {
    const randomNumber = Math.floor(Math.random() * 10);
    return randomNumber === 5;
  };

  const generateRandomColour = () => {
    var randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
  };

  const numbers = colours.map((row, rowIndex) => (
    <Row key={rowIndex}>
      {row.map((colour, colIndex) => (
        <Pixel
          colour={colour}
          pixelSize={PIXEL_SIZE}
          key={`${rowIndex}_${colIndex}`}
        ></Pixel>
      ))}
    </Row>
  ));

  return (
    <>
    <HexColorPicker color={color} onChange={setColor} />;
    <ConnectWallet onConnect={handleConnect}></ConnectWallet>
      <Container height={GRID_HEIGHT} width={GRID_WIDTH}>
        {numbers}
      </Container>
    </>
  );
};

export default Grid;
