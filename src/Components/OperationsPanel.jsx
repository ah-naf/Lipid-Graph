import { styled } from "@mui/material/styles";
import { TreeView } from "@mui/x-tree-view";
import { TreeItem, treeItemClasses } from "@mui/x-tree-view/TreeItem";
import { useDispatch, useSelector } from "react-redux";
import { changeOperationID } from "../Slices/LipidSlice";

const OperationsPanel = () => {
  const dispatch = useDispatch();
  const operationID = useSelector((state) => state.lipid.operationID);

  const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
    color: theme.palette.text.secondary,
    [`& .${treeItemClasses.content}`]: {
      color: "#3f3f46",
      borderRadius: theme.spacing(0.5),
      paddingRight: theme.spacing(1),
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      fontWeight: theme.typography.fontWeightMedium,
      textAlign: "center",
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
    // TODO: Disable this when you need to show the collapse or chevron icon
    [`& .${treeItemClasses.iconContainer}`]: {
      display: "none",
    },
  }));
  
  return (
    <div className="mt-6">
      <p className="font-medium text-gray-800/80 text-center underline">
        Operations
      </p>
      <div className="mt-2">
        <TreeView
          aria-label="controlled"
          selected={operationID}
          onNodeSelect={(e, b) => dispatch(changeOperationID(b))}
        >
          <StyledTreeItemRoot
            nodeId="1"
            label="Molecule Structure"
          ></StyledTreeItemRoot>
          <StyledTreeItemRoot
            nodeId="2"
            label="Predictions (Kappa)"
          ></StyledTreeItemRoot>
        </TreeView>
      </div>
    </div>
  );
};

export default OperationsPanel;
