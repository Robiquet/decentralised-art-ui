import IconButton from "@material-ui/core/IconButton";
import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ColorContext from "../context/selected-color";
import ColorPanel from "./ColorPanel";
import ConnectWallet from "./ConnectWallet";
import Pixel from "./Pixel";
import PixelCanvas from "./PixelCanvas";

const COLS = 40;
const ROWS = 40;
const PIXEL_SIZE = 50;
const GRID_HEIGHT = ROWS * PIXEL_SIZE;
const GRID_WIDTH = COLS * PIXEL_SIZE;

interface ContainerProps {
  height: number;
  width: number;
}

const Container = styled.div<ContainerProps>`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  overflow: auto;
`;

const StyledPanel = styled(ColorPanel)`
  position: sticky;
  left: ${() => window.innerWidth - 80 + "px"};
  bottom: 10px;
`;
interface PixelPosition {
  rowIndex: number;
  colIndex: number;
}

interface PixelDetails extends PixelPosition {
  color: string;
}

const Grid = () => {
  const [colours, setColours] = useState<string[][]>([]);
  const [intervalRef, setIntervalRef] = useState<NodeJS.Timeout>();
  const [changedPixels, setChangedPixels] = useState<PixelDetails[]>([]);
  const [showPanel, setShowPanel] = useState<boolean>(false)

  const colorContext = useContext(ColorContext);

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
  };

  const handleConnect = () => {
    setShowPanel(true)
    stopPreview();
  };

  const handlePixelClick = (rowIndex: number, colIndex: number) => {
    const currentColors = colours;

    currentColors[rowIndex][colIndex] = colorContext.color;
    const pixelIndex = changedPixels.findIndex(
      (p) => p.colIndex === colIndex && p.rowIndex === rowIndex
    );

    //pixel has been modified
    if (pixelIndex === -1) {
      setChangedPixels([
        ...changedPixels,
        { color: colorContext.color, colIndex: colIndex, rowIndex: rowIndex },
      ]);
    } else {
      const newPixels = [...changedPixels];
      newPixels[pixelIndex] = {
        color: colorContext.color,
        colIndex: colIndex,
        rowIndex: rowIndex,
      };
      setChangedPixels(newPixels);
    }

    setColours(currentColors);
  };

  const shouldAssignColour = () => {
    const randomNumber = Math.floor(Math.random() * 10);
    return randomNumber === 5;
  };

  const generateRandomColour = () => {
    var randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
  };


  return (
    <>
      <ConnectWallet onConnect={handleConnect}></ConnectWallet>
      <Container height={GRID_HEIGHT} width={GRID_WIDTH}>
        <PixelCanvas pixelSize={PIXEL_SIZE} colours={colours} onPixelClick={(rowIndex, colIndex) => handlePixelClick(rowIndex, colIndex)}></PixelCanvas>
      </Container>
      {showPanel === true ? <StyledPanel></StyledPanel> : <></>}
      
    </>
  );
};

export default Grid;
