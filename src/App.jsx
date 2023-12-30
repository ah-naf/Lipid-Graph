import React from "react";
import { Route, Routes } from "react-router-dom";
import Lipid from "./Page/Lipid";
import Upload from "./Page/Upload";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Lipid />} />
      <Route path="/upload" element={<Upload />} />
    </Routes>
  );
}

export default App;
