import styled from "styled-components";
import ReactDOM from "react-dom";
import { useRef } from "react";
import { isConstructorDeclaration } from "typescript";

interface StyledPixelProps {
  backgroundColour: string;
  pixelSize: number;
}

interface PixelProps {
  colour: string;
  pixelSize: number;
  onClick: Function
}

interface PixelPosition {
  xPos: number;
  yPos: number;
  width: number;
  height: number;
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
    const rect = el?.current?.getBoundingClientRect();
    const pixelPosition = {
      xPos: rect?.x,
      yPos: rect?.y,
      width: rect?.x,
      height: rect?.x
    }
    props.onClick(pixelPosition)
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

export default Pixel;
