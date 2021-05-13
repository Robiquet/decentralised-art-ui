import styled from "styled-components";

interface StyledPixelProps {
  backgroundColour: string;
  pixelSize: number;
}

const StyledPixel = styled.div.attrs<StyledPixelProps>((props) => ({
  style: {
    background: props.backgroundColour, 
    width: props.pixelSize,
    height: props.pixelSize
  },
}))<StyledPixelProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1px;
  flex-shrink: 0;
  cursor: pointer;
`;

const Pixel = (props: { colour: string; pixelSize:number }) => {
  return <StyledPixel backgroundColour={props.colour === '' ? 'black' : props.colour} pixelSize={props.pixelSize}></StyledPixel>;
};

export default Pixel;
