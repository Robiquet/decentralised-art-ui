import React from "react";
import "./App.scss";
import Grid from "./components/Grid";
import { StyleSheetManager } from "styled-components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHandPaper, faPen, faCompressAlt } from "@fortawesome/free-solid-svg-icons";
import ColorContext from "./context/selected-color";

library.add(faHandPaper, faPen, faCompressAlt);

function App() {
  return (
    <StyleSheetManager disableVendorPrefixes>
      <ColorContext.Provider
        value={{
          color: "#000000",
        }}
      >
        <Grid></Grid>
      </ColorContext.Provider>
    </StyleSheetManager>
  );
}

export default App;
