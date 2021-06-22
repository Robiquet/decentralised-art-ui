import styled from "styled-components";
import Pixel from "./Pixel";

const Row = styled.div`
  display: flex;
`;

const PixelCanvas = ({
  colours,
  pixelSize,
  onPixelClick
}: {
  colours: string[][];
  pixelSize: number;
  onPixelClick: (rowIndex:number,colIndex:number)=>void
}) => {

  const handlePixelClick = (rowIndex:number,colIndex:number) => {
    onPixelClick(rowIndex,colIndex)
  };

  const pixels = colours.map((row, rowIndex) => (
    <Row key={rowIndex}>
      {row.map((colour, colIndex) => (
        <Pixel
          colour={colour}
          pixelSize={pixelSize}
          key={`${rowIndex}_${colIndex}`}
          onClick={() => handlePixelClick(rowIndex, colIndex)}

        ></Pixel>
      ))}
    </Row>
  ));

  return <>{pixels}</>;
};

export default PixelCanvas;
