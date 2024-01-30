import React, { useState } from "react";
import ChartComponent from "./ChartComponent";
import LipidInputForm from "./LipidInputForm";
import SelectCompositionType from "./SelectCompositionType";

function MoleculeStructure() {
  const data = undefined;
  const showTable = false;
  const [type, setType] = useState("single");
  const [lipidInput, setLipidInput] = useState([{ name: "", percantage: 100 }]);

  const handleInputChange = (index, field, value) => {
    // Deep copy the object to ensure we're not modifying a read-only reference
    const updatedInputs = lipidInput.map((input, idx) =>
      idx === index ? { ...input, [field]: value } : { ...input }
    );

    // Update the state with the new array
    setLipidInput(updatedInputs);
  };

  return (
    <div className="w-full h-full">
      <div className="max-w-[300px] mx-auto mt-4 border p-4 shadow rounded">
        <SelectCompositionType
          setLipidInput={setLipidInput}
          setType={setType}
          type={type}
        />
        <LipidInputForm
          handleInputChange={handleInputChange}
          lipidInput={lipidInput}
          type={type}
        />
        <button className="mt-2 bg-violet-500 w-full py-2 text-white rounded">Analyze</button>
      </div>
      {/* <ActualPredicted /> */}
      <div className="w-full h-full flex items-center">
        <ChartComponent
          graph_data={data && data.predicted && [data.predicted[lipid[0].name]]}
        />
        <div className={`${showTable ? "w-[600px] px-2" : "w-0"}`}>
          {/* <GraphTable /> */}
        </div>
      </div>
    </div>
  );
}

export default MoleculeStructure;
