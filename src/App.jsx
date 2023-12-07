import { ArrowRight } from "@mui/icons-material";
import { Switch } from "@mui/material";
import React, { useState } from "react";
import ChartComponent from "./ChartComponent";
import MultipleSelectDropdown from "./Components/MultipleSelectDropdown";
import { graph_data } from "./utility";

const data = JSON.parse(graph_data);

function App() {
  const lipid_name = Object.keys(data);
  const [active_lipid, setActiveLipid] = useState([]);
  const [collapse, setCollapse] = useState(false);

  const handleSelectedColumns = (selectedLipids) => {
    const updatedActiveLipids = selectedLipids.map((lipidName) => {
      // Find the lipid object in the current state or create a new one
      const existingLipid = active_lipid.find((l) => l.name === lipidName) || {
        active: false,
        name: lipidName,
        value: 0,
      };
      return existingLipid;
    });
    setActiveLipid(updatedActiveLipids);
  };

  return (
    <div className="h-screen flex">
      <div
        className={`h-full relative w-[310px] border-r-2 shadow-xl p-4 bg-[whitesmoke] ${
          collapse && "max-w-[0] p-0"
        }`}
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
            <MultipleSelectDropdown
              columnNames={lipid_name}
              setSelectedColumns={handleSelectedColumns}
              defaultValue={active_lipid.map((val) => val.name)}
            />
            <div className="mt-6 space-y-4">
              {active_lipid.map((val, ind) => (
                <div key={ind} className="flex items-center gap-2">
                  <Switch
                    size="small"
                    checked={val.active}
                    onChange={(e) => {
                      let temp = [...active_lipid];
                      temp[ind].active = !temp[ind].active;
                      setActiveLipid([...temp]);
                    }}
                  />
                  <h1 className="font-medium text-gray-800">{val.name}</h1>
                  <input
                    type="number"
                    name=""
                    id=""
                    className="w-20 ml-auto bg-transparent border-2 shadow rounded-md px-2 py-0.5 outline-none border-gray-300"
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <ChartComponent active_lipid={active_lipid} />
    </div>
  );
}

export default App;
