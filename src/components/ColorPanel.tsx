import { useState, useContext } from "react";
import { HexColorPicker } from "react-colorful";
import { useDebouncedCallback } from "use-debounce/lib";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ColorContext from "../context/selected-color";

type Tool = "pen" | "hand";

const ColorPanel = () => {
  const [color, setColor] = useState("#000000");
  const colorContext = useContext(ColorContext)

  const handleColorChange = useDebouncedCallback((color: string) => {
    colorContext.color = color;
    setColor(color);
  }, 300);

  
  return (
    <div className="bg-white w-64 h-80 sticky left-10 bottom-10 rounded flex flex-col items-center p-4 justify-around">
      <HexColorPicker color={color} onChange={handleColorChange} />
      <div>{colorContext.color}</div>
      <div className="flex">
        <button>
          <FontAwesomeIcon icon="pen" size="2x" />
        </button>
        <button className="ml-10">
          <FontAwesomeIcon icon="hand-paper" size="2x" />
        </button>
      </div>
    </div>
  );
};

export default ColorPanel;
