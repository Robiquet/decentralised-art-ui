import { useState, useContext } from "react";
import { HexColorPicker } from "react-colorful";
import { useDebouncedCallback } from "use-debounce/lib";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ColorContext from "../context/selected-color";

type Tool = "pen" | "hand";

const ColorPanel = () => {
  const [color, setColor] = useState("#000000");
  const [showPanel, setShowPanel] = useState(true);

  const colorContext = useContext(ColorContext);

  const handleColorChange = useDebouncedCallback((color: string) => {
    colorContext.color = color;
    setColor(color);
  }, 300);

  const handleShowPanelClick = () => {
    setShowPanel(true);
  };

  const handleHidePanelClick = () => {
    setShowPanel(false);
  };

  return (
    <>
      {showPanel === true ? (
        <div className="bg-white w-64 h-72 sticky left-2 bottom-2 rounded flex flex-col items-center justify-around">
          <button className="ml-auto pr-2">
            <FontAwesomeIcon
              onClick={handleHidePanelClick}
              className="ml-auto"
              icon="compress-alt"
              size="sm"
            />
          </button>
          <HexColorPicker color={color} onChange={handleColorChange} />
          {/* <div>{colorContext.color}</div> */}
          <div className="flex">
            <button>
              <FontAwesomeIcon icon="pen" size="lg" />
            </button>
            <button className="ml-10">
              <FontAwesomeIcon className="text-gray-400" icon="hand-paper" size="lg" />
            </button>
            <button className="ml-10">
              <FontAwesomeIcon className="text-gray-400" icon="eye-dropper" size="lg" />
            </button>
            <button className="ml-10">
              <FontAwesomeIcon className="text-gray-400" icon="save" size="lg" />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={handleShowPanelClick}
          className="bg-white p-2 rounded sticky left-2 bottom-2"
        >
          Show Panel
        </button>
      )}
    </>
  );
};

export default ColorPanel;
