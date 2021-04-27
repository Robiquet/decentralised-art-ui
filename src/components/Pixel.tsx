import styled from "styled-components";

// interface StyledPixelProps {
//   backgroundColour: string
// }

const StyledPixel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props: { backgroundColour: string }) =>
    props.backgroundColour};
  width: 100px;
  height: 100px;
  flex-shrink: 0;
  border: white 1px solid;
  /* background-color: red;
  animation-name: example;
  animation-duration: 4s;

  @keyframes example {
  from {background-color: red;}
  to {background-color: ${(props: { backgroundColour: string }) =>
    props.backgroundColour}}
} */
`;

const Pixel = (props: {colour:string}) => {


  return <StyledPixel backgroundColour={props.colour}></StyledPixel>;
};

export default Pixel;
