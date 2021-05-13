import Pixel from "./Pixel";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
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

interface ColorPickerProps {
  left: number | undefined;
  top: number | undefined;
}
const ColorPickerContainer = styled.div<ColorPickerProps>`
  position: absolute;
  left: ${(props) => props.left + "px"};
  top: ${(props) => props.top + "px"}; ;
`;

const Grid = () => {
  const [colours, setColours] = useState<string[][]>([]);
  const [intervalRef, setIntervalRef] = useState<NodeJS.Timeout>();
  const [color, setColor] = useState("#000000");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [colorPickerProps, setColorPickerProps] = useState<ColorPickerProps>();
  const colorPickerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (colorPickerRef?.current?.contains(event.target) === false) {
        setShowColorPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [colorPickerRef]);

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
    stopPreview();
  };

  const handlePixelClick = (details: any, row:number, col:number) => {
    console.log(details);
    setColorPickerProps({
      left: details.xPos + window.scrollX + PIXEL_SIZE,
      top: details.yPos + window.scrollY + PIXEL_SIZE,
    });

    setShowColorPicker(true);
  };

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
          onClick={(a:any)=>handlePixelClick(a, rowIndex, colIndex)}
        ></Pixel>
      ))}
    </Row>
  ));

  return (
    <>
      {showColorPicker ? (
        <ColorPickerContainer
          left={colorPickerProps?.left}
          top={colorPickerProps?.top}
          ref={colorPickerRef}
        >
          <HexColorPicker color={color} onChange={setColor} />;
        </ColorPickerContainer>
      ) : (
        <></>
      )}

      <ConnectWallet onConnect={handleConnect}></ConnectWallet>
      <Container height={GRID_HEIGHT} width={GRID_WIDTH}>
        {numbers}
      </Container>
    </>
  );
};

export default Grid;
