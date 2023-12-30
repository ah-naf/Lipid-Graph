import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { jsontohtml } from "jsontohtml-render";
import * as React from "react";
import bendingFile from "../bending-modulus.xlsx";
import { parseCsv, parseExcel } from "../utility";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function Upload() {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [lipid_name, setLipidName] = React.useState([]);
  const [jsonData, setJsonData] = React.useState([]);

  const handleFileChange = async (evt) => {
    setLoading(true);
    const file = evt.target.files[0];
    const mainData = await parseExcel(bendingFile);

    let fileData;
    if (file.type.toLowerCase().includes("csv")) {
      fileData = await parseCsv(file);
    } else {
      fileData = await parseExcel(file);
    }
    // setData(fileData);
    const temp_key = Object.keys(fileData[0]);
    const temp_data = fileData.map((val) => "100% " + val[temp_key]);
    setLipidName(temp_data);

    // Find the matching value
    const matchingValues = mainData.filter((item) =>
      temp_data.includes(item["Lipid composition (molar)"])
    );

    setData(matchingValues);
    setJsonData(matchingValues.map((val) => jsontohtml(val)));

    setLoading(false);
  };
  return (
    <div className="min-h-screen grid place-content-center max-w-xl mx-auto">
      <div className="text-center space-x-4">
        <LoadingButton
          loading={loading}
          loadingIndicator="Uploading..."
          component={"label"}
          variant="contained"
          startIcon={<CloudUploadIcon />}
          onChange={handleFileChange}
        >
          Upload file
          <VisuallyHiddenInput type="file" />
        </LoadingButton>
        {!!data.length && (
          <Button
            color="error"
            onClick={() => {
              setData([]);
              setJsonData([]);
              setLipidName([]);
              window.location.reload();
            }}
          >
            Reset
          </Button>
        )}
      </div>

      {!!data.length && (
        <div className="mt-8 bg-[whitesmoke] p-4 rounded shadow-lg max-h-[500px] overflow-y-auto">
          {data.map((val, key) => (
            <Accordion key={key}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{val["Lipid composition (molar)"]}</Typography>
              </AccordionSummary>
              <AccordionDetails className="overflow-x-auto">
                <div
                  className="h-full w-full"
                  dangerouslySetInnerHTML={{ __html: jsonData[key] }}
                ></div>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      )}
    </div>
  );
}

export default Upload;
