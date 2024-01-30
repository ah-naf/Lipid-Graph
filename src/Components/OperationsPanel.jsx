import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { styled } from "@mui/material/styles";
import { TreeView } from "@mui/x-tree-view";
import { TreeItem, treeItemClasses } from "@mui/x-tree-view/TreeItem";
import { useDispatch, useSelector } from "react-redux";
import { changeOperationID } from "../Slices/LipidSlice";

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: "#3f3f46",
    borderRadius: theme.spacing(0.5),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,

    "&:hover": {
      backgroundColor: "#c7d2fe",
    },
    "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
      backgroundColor: `var(--tree-view-bg-color, ${"#6366f1"})`,
      color: "whitesmoke",
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: "inherit",
      color: "inherit",
    },
  },
}));

const OperationsPanel = () => {
  const dispatch = useDispatch();
  const operationID = useSelector((state) => state.lipid.operationID);
  const lipid = useSelector((state) => state.lipid.lipid);
  const loading = useSelector((state) => state.lipid.loading);

  const handleNodeSelect = async (b) => {
    dispatch(changeOperationID(b));
  };

  return (
    <div className="">
      <p className="font-medium mb-1 text-lg text-gray-800/80 text-center underline">
        Operations
      </p>
      <div className={`mt-2 ${loading && "pointer-events-none"}`}>
        <TreeView
          aria-label="controlled"
          selected={operationID}
          onNodeSelect={(e, b) => handleNodeSelect(b)}
          defaultExpandIcon={<ArrowRightIcon />}
          defaultCollapseIcon={<ArrowDropDownIcon />}
        >
          <StyledTreeItemRoot
            nodeId="prediction"
            label="Prediction"
          >
            <StyledTreeItemRoot nodeId="structure" label="Molecule Structure" />
          </StyledTreeItemRoot>
          <StyledTreeItemRoot nodeId="evaluation" label="Evaluation">
            <StyledTreeItemRoot nodeId="loss" label="Train-Test Loss" />
            <StyledTreeItemRoot nodeId="r2" label="R-squared" />
            <StyledTreeItemRoot
              nodeId="actualvspred"
              label="Actual vs Predicted"
            />
          </StyledTreeItemRoot>
        </TreeView>
      </div>
    </div>
  );
};

export default OperationsPanel;
