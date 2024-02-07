import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AboutUs from "./Page/AboutUs";
import Lipid from "./Page/Lipid";
import Upload from "./Page/Upload";
import { evaluateModel } from "./Slices/EvaluationSlice";

function App() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.evaluation.loading);

  useEffect(() => {
    if (!loading) {
      dispatch(evaluateModel());
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Lipid />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/about-us" element={<AboutUs />} />
    </Routes>
  );
}

export default App;
