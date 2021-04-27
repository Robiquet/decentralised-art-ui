import { useEffect, useState } from "react";
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

const Pixel = () => {
  const [colour, setColour] = useState("black");

  useEffect(() => {
    setInterval(() => {
      const colour = generateRandomColour();
      console.log(colour);
      setColour(colour);
    }, 5000);
  }, []);

  const generateRandomColour = () => {
    var randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
  };

  return <StyledPixel backgroundColour={colour}></StyledPixel>;
};

export default Pixel;
