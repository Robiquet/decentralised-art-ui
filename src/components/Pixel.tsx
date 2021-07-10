import { memo, useRef } from "react";
import styled from "styled-components";

interface StyledPixelProps {
  backgroundColour: string;
  pixelSize: number;
}

interface PixelProps {
  colour: string;
  pixelSize: number;
  colIndex: number;
  rowIndex: number;
  onClick: (rowIndex: number, colIndex: number) => void;
}

const StyledPixel = styled.div.attrs<StyledPixelProps>((props) => ({
  style: {
    background: props.backgroundColour,
    width: props.pixelSize,
    height: props.pixelSize,
  },
}))<StyledPixelProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  cursor: pointer;
  &:hover {
    border: 1px white solid;
    box-sizing: border-box;
  }
`;

const Pixel = (props: PixelProps) => {
  const el = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    props.onClick(props.rowIndex, props.colIndex);
  };

  return (
    <StyledPixel
      ref={el}
      onClick={handleClick}
      backgroundColour={props.colour === "" ? "black" : props.colour}
      pixelSize={props.pixelSize}
    ></StyledPixel>
  );
};

export default memo(Pixel);
