import React from "react";
import "./App.scss";
import Grid from "./components/Grid";
import { StyleSheetManager } from "styled-components";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHandPaper,
  faPen
} from "@fortawesome/free-solid-svg-icons";

library.add(faHandPaper, faPen);

function App() {
  return (
    <StyleSheetManager disableVendorPrefixes>
      <Grid></Grid>
    </StyleSheetManager>
  );
}

export default App;
