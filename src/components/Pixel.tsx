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
  width: 100px;
  height: 100px;
  flex-shrink: 0;
  border: white 1px solid;
`;

const Pixel = (props: { colour: string }) => {
  return <StyledPixel backgroundColour={props.colour}></StyledPixel>;
};

export default Pixel;
