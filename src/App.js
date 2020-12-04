import React from "react";
import SeriesTable from "./components/tabla";
import Container from "@material-ui/core/Container";

function App() {
  return (
    <Container fluid="true">
      <div style={{ marginLeft: "10px", marginRight: "10px" }}>
        <SeriesTable />
      </div>
    </Container>
  );
}

export default App;
