import { useCallback } from "react";
import styled from "styled-components";
import Pixel from "./Pixel";

const Row = styled.div`
  display: flex;
`;

const PixelCanvas = ({
  colours,
  pixelSize,
  onPixelClick,
}: {
  colours: string[][];
  pixelSize: number;
  onPixelClick?: (rowIndex: number, colIndex: number) => void;
}) => {
  const handlePixelClick = useCallback((rowIndex: number, colIndex: number) => {
    if (onPixelClick) onPixelClick(rowIndex, colIndex);
  }, [onPixelClick]);

  const pixels = colours.map((row, rowIndex) => (
    <Row key={rowIndex}>
      {row.map((colour, colIndex) => (
        <Pixel
          colour={colour}
          pixelSize={pixelSize}
          rowIndex={rowIndex}
          colIndex={colIndex}
          key={`${rowIndex}_${colIndex}`}
          onClick={handlePixelClick}
        ></Pixel>
      ))}
    </Row>
  ));

  return <>{pixels}</>;
};

export default PixelCanvas;
