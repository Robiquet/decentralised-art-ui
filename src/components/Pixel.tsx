import styled from "styled-components";

const StyledPixel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #282828;
  width: 100px;
  height: 100px;
  flex-shrink: 0;
  border: white 1px solid;
`;

const Pixel = () => {
  return <StyledPixel></StyledPixel>;
};

export default Pixel;
