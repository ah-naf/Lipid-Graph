import { ArrowRight } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EvaluationGraphTable from "../Components/EvaluationGraphTable.jsx";
import Header from "../Components/Header";
import OperationsPanel from "../Components/OperationsPanel";
import Prediction from "../Components/Prediction.jsx";
import { changeActiveLipid, changeOperationID } from "../Slices/LipidSlice";
// const data = JSON.parse(graph_data);
// console.log(JSON.stringify(data["APC"]))

function Lipid() {
  const [collapse, setCollapse] = useState(false);
  const [type, setType] = useState("single");
  const [lipidInput, setLipidInput] = useState([{ name: "", percentage: 100 }]);
  const dispatch = useDispatch();
  const operationID = useSelector((state) => state.lipid.operationID);
  const isLoading = useSelector((state) => state.lipid.loading);
  const data = useSelector((state) => state.lipid.data);
  const [graph_data, setGraphData] = useState([]);
  const showTable = useSelector((state) => state.lipid.showTable);

  useEffect(() => {
    if (data && data.predicted) {
      let temp = [];
      for (const val of lipidInput) {
        if (data.predicted[val.name]) temp.push(data.predicted[val.name]);
      }
      setGraphData(temp);
    } else setGraphData(undefined);
  }, [data, lipidInput]);

  useEffect(() => {
    dispatch(changeActiveLipid(lipidInput));
    dispatch(changeOperationID("0"));
  }, [lipidInput]);

  const handleInputChange = (index, field, value) => {
    // Deep copy the object to ensure we're not modifying a read-only reference
    const updatedInputs = lipidInput.map((input, idx) =>
      idx === index ? { ...input, [field]: value } : { ...input }
    );

    // Update the state with the new array
    setLipidInput(updatedInputs);
  };

  return (
    <div className="h-screen  relative overflow-hidden">
      <Header />
      <div className="flex h-full w-full">
        <div
          className={`relative border-r-2 min-w-[250px] shadow-xl p-4 bg-[whitesmoke] flex flex-col ${
            collapse && "min-w-[0] !p-0"
          }`}
          style={{ height: "calc(100vh - 68px)" }}
        >
          <span
            className={`absolute right-0 top-1/2 translate-x-1/2 bg-white shadow-lg border-2 cursor-pointer ${
              collapse && "!translate-x-full z-10"
            }`}
            onClick={() => setCollapse(!collapse)}
          >
            <ArrowRight />
          </span>
          {!collapse && (
            <>
              <OperationsPanel />

              <div className="absolute z-50 left-0 text-center bottom-0 border-t-2 w-full py-2">
                <Link
                  to={"/about-us"}
                  className="underline text-gray-700/90 text-sm font-medium hover:text-gray-900"
                >
                  About Us
                </Link>
              </div>
            </>
          )}
        </div>
        <div
          className="w-full flex-grow relative"
          style={{ height: "calc(100vh - 68px)" }}
        >
          <Toaster />
          {isLoading ? (
            <div className="w-full h-full flex flex-col items-center justify-center relative -top-12">
              <h3 className="font-medium mb-2">Fetching Data...</h3>
              <CircularProgress />
            </div>
          ) : (
            <div className="w-full h-full grid place-items-center overflow-y-auto px-2">
              {(operationID === "0" || operationID === "evaluation") && (
                <h1 className="font-medium text-3xl mt-10">
                  Select an operation
                </h1>
              )}
              {operationID === "prediction" && <Prediction />}

              {/* TODO: Send loss or r2 or actualvspred graph table */}
              {(operationID === "loss" ||
                operationID === "r2" ||
                operationID === "actualvspred") && (
                <EvaluationGraphTable graph={undefined} table={undefined} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Lipid;
