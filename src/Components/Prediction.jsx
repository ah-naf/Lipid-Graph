import { Input, Radio, Space } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import toast, { Toaster } from "react-hot-toast";

const { Group: RadioGroup, Button: RadioButton } = Radio;

// Input component for Lipid Composition with optional percentage
const CompositionInput = ({
  id,
  showPercentage,
  name,
  percentage,
  onCompositionChange,
}) => (
  <div className="flex items-center gap-4">
    <div className="w-full">
      <label className="text-gray-800">
        Lipid Composition Name{showPercentage ? `-${id}` : ""}
      </label>
      <Input
        value={name}
        onChange={(e) =>
          onCompositionChange(`comp${id}`, "name", e.target.value)
        }
      />
    </div>
    {showPercentage && (
      <div>
        <label className="text-gray-800">Percentage</label>
        <Input
          value={`${percentage}`}
          onChange={(e) =>
            onCompositionChange(
              `comp${id}`,
              "percentage",
              parseInt(e.target.value) || 0
            )
          }
          type="number"
          suffix="%"
        />
      </div>
    )}
  </div>
);

// Input component for file upload or custom data entry
const BeadsBondsInput = ({ label, inputType, setInputType }) => (
  <div className="mt-4">
    <label htmlFor="" className="text-gray-800">
      {label}
    </label>
    <div className="flex mt-2 gap-4 items-center">
      <RadioGroup
        defaultValue={inputType}
        onChange={(e) => setInputType(e.target.value)}
        buttonStyle="solid"
      >
        <Space direction="vertical">
          <RadioButton value={"upload"}>Upload</RadioButton>
          <RadioButton value={"custom"}>Custom</RadioButton>
        </Space>
      </RadioGroup>
      {inputType === "upload" ? (
        <FileUploader
          name="file"
          types={["txt"]}
          onDrop={(e) => console.log(e)}
          onChange={(e) => console.log(e)}
          classes="dndFile"
        />
      ) : (
        <TextArea placeholder="Input Data (Separated by comma)" />
      )}
    </div>
  </div>
);

// Main prediction component
function Prediction() {
  const [type, setType] = useState("single");
  const [data, setData] = useState({
    "Number of Water": "",
    Salt: "",
    Temperature: "",
    Pressure: "",
    "Number of Lipid Per Layer": "",
    "Membrane Thickness": "",
    "Kappa KT(q^-4 + b)": "",
    "Kappa Binning (KT)": "",
    "Kappa Gamma / Binning": "",
    "Kappa BW DCF": "",
    "Kappa RSF": "",
  });
  const [adjacencyInputType, setAdjacencyInputType] = useState("upload");
  const [nodeFeatureInputType, setNodeFeatureInputType] = useState("upload");
  const [compositions, setCompositions] = useState({
    comp1: { name: "", percentage: 100 },
  });

  const handleCompositionChange = (id, field, value) => {
    setCompositions((prevCompositions) => {
      // If changing percentage in 'multiple' mode
      if (field === "percentage" && type === "multiple") {
        // Calculate the total percentage including the current change
        const totalPercentage =
          id === "comp1"
            ? value + prevCompositions.comp2.percentage
            : prevCompositions.comp1.percentage + value;

        // Check if total percentage exceeds 100%
        if (totalPercentage > 100) {
          // Optionally: provide feedback to user that the total percentage cannot exceed 100%
          toast.error("Total percentage cannot exceed 100%");
          return prevCompositions;
        }
      }

      // Update normally for all other cases
      return {
        ...prevCompositions,
        [id]: { ...prevCompositions[id], [field]: value },
      };
    });
  };

  const handleInputChange = (e, key) => {
    setData({ ...data, [key]: e.target.value });
  };

  return (
    <div className="w-full h-full p-4 ">
      <Toaster />
      <div className="text-center mb-8">
        <RadioGroup
          name="radiogroup"
          size="large"
          defaultValue={type}
          onChange={(e) => {
            setType(e.target.value);
            if (e.target.value === "single") {
              setCompositions({
                comp1: { name: "", percentage: 100 },
              });
            } else {
              setCompositions({
                comp1: { name: "", percentage: 0 },
                comp2: { name: "", percentage: 0 },
              });
            }
          }}
          buttonStyle="solid"
        >
          <RadioButton value={"single"}>Single Composition</RadioButton>
          <RadioButton value={"multiple"}>Multiple Composition</RadioButton>
        </RadioGroup>
      </div>
      {type === "single" ? (
        <CompositionInput
          id={1}
          name={compositions.comp1.name}
          percentage={compositions.comp1.percentage}
          onCompositionChange={handleCompositionChange}
        />
      ) : (
        <>
          <CompositionInput
            id={1}
            showPercentage
            name={compositions.comp1.name}
            percentage={compositions.comp1.percentage}
            onCompositionChange={handleCompositionChange}
          />
          <CompositionInput
            id={2}
            showPercentage
            name={compositions.comp2.name}
            percentage={compositions.comp2.percentage}
            onCompositionChange={handleCompositionChange}
          />
        </>
      )}
      <BeadsBondsInput
        label="Beads-Bonds Structure (Adjacency Matrix)"
        inputType={adjacencyInputType}
        setInputType={setAdjacencyInputType}
      />
      <BeadsBondsInput
        label="Beads-Bonds Structure (Node Feature Matrix)"
        inputType={nodeFeatureInputType}
        setInputType={setNodeFeatureInputType}
      />
      <div className="grid grid-cols-2 gap-4 mt-6">
        {Object.keys(data).map((key) => (
          <div key={key}>
            <label htmlFor="" className="text-gray-800">
              {key.replace(/([A-Z])/g, " $1").trim()}
            </label>
            <Input
              size="large"
              className="mt-1"
              value={data[key]}
              onChange={(e) => handleInputChange(e, key)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Prediction;
