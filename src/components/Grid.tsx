import {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import styled from "styled-components";
import ColorContext from "../context/selected-color";
import ColorPanel from "./ColorPanel";
import ConnectWallet from "./ConnectWallet";
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

interface PixelPosition {
  rowIndex: number;
  colIndex: number;
}

interface PixelDetails extends PixelPosition {
  color: string;
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

interface ColourState {
  changedPixels: PixelDetails[];
  colours: string[][];
}

interface ColourAction {
  colour: string;
  rowIndex: number;
  colIndex: number;
}

const colourInitialiser = () => {
  return {
    changedPixels: [],
    colours: Array(ROWS)
      .fill(0)
      .map(() => {
        return Array(COLS)
          .fill(0)
          .map(() => {
            return "";
          });
      }),
  };
};

const colourReducer = (state: ColourState, action: ColourAction) => {
  const currentColors = state.colours;
  const newChangedPixels: PixelDetails[] = state.changedPixels;

  const { colour, rowIndex, colIndex } = action;

  currentColors[rowIndex][colIndex] = colour;
  const pixelIndex = state.changedPixels.findIndex(
    (p) => p.colIndex === colIndex && p.rowIndex === rowIndex
  );

  //pixel has been modified
  if (pixelIndex === -1) {
    newChangedPixels.push({
      color: colour,
      colIndex: colIndex,
      rowIndex: rowIndex,
    });
  } else {
    newChangedPixels[pixelIndex] = {
      color: colour,
      colIndex: colIndex,
      rowIndex: rowIndex,
    };
  }

  console.log(currentColors)
  return { changedPixels: newChangedPixels, colours: currentColors };
};

const Grid = () => {
  const [previewColours, setPreviewColours] = useState<string[][]>([]);
  const [intervalRef, setIntervalRef] = useState<NodeJS.Timeout>();
  const [showPanel, setShowPanel] = useState<boolean>(false);
  const [state, dispatch] = useReducer<
    (state: ColourState, action: ColourAction) => ColourState,
    ColourState
  >(
    colourReducer,
    {
      changedPixels: [],
      colours: [],
    },
    colourInitialiser
  );

  const colorContext = useContext(ColorContext);

  useEffect(() => {
    window.scrollTo(
      GRID_WIDTH / 2 - window.innerWidth / 2,
      GRID_HEIGHT / 2 - window.innerHeight / 2
    );

    setPreviewColours(generateGrid());

    const ref = setInterval(() => {
      const coloursGrid: string[][] = generateGrid();
      setPreviewColours(coloursGrid);
    }, 10000);
    setIntervalRef(ref);
  }, []);

  const stopPreview = () => {
    if (intervalRef) {
      clearInterval(intervalRef);
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

  const handleConnect = () => {
    setShowPanel(true);
    stopPreview();
  };

  const handlePixelClick = useCallback(
    (rowIndex: number, colIndex: number) => {
      dispatch({
        colour: colorContext.color,
        rowIndex: rowIndex,
        colIndex: colIndex,
      });
    },
    [colorContext.color]
  );

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
        {showPanel === true ? (
          <PixelCanvas
            pixelSize={PIXEL_SIZE}
            colours={state.colours}
            onPixelClick={handlePixelClick}
          ></PixelCanvas>
        ) : (
          <PixelCanvas
            pixelSize={PIXEL_SIZE}
            colours={previewColours}
          ></PixelCanvas>
        )}
      </Container>
      {showPanel === true ? <StyledPanel></StyledPanel> : <></>}
    </>
  );
};

export default Grid;
