import styled from "styled-components";

interface StyledPixelProps {
  backgroundColour: string;
}

const StyledPixel = styled.div.attrs<StyledPixelProps>((props) => ({
  style: {
    background: props.backgroundColour, 
  },
}))<StyledPixelProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  flex-shrink: 0;
`;

const Pixel = (props: { colour: string }) => {
  return <StyledPixel backgroundColour={props.colour === '' ? 'black' : props.colour}></StyledPixel>;
};

export default Pixel;
