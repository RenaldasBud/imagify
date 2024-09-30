import React, { useState, useEffect } from "react";
const { VITE_APP_SOCKET_URL } = import.meta.env;
import { Box, Typography } from "@mui/material";
import useData from "../../hooks/useData";
import useStore from "../../hooks/useStore";
import useMouse from "../../hooks/useMouse";
import ControlledSwitch from "../switches/controlledSwitch";
import { ColorButtonSubmit } from "../buttons/loadingButtons";
import ControlledOpenSelect from "../dropDowns/controllerPicker";
import useWebSocket from "../../hooks/useWebSockets";

interface TwoDimensionalScalableVectorGraphicProps {
  handleReset: () => void;
}

const TwoDimensionalScalableVectorGraphic: React.FC<TwoDimensionalScalableVectorGraphicProps> = ({ handleReset }) => {
  const [svgId, setSvgId] = useState(0);
  const [activeSaveType, setActiveSaveType] = useState<string>("manual");
  const { svgProps, setRectProps, setPerimeter, perimeter, handleGetVersion, svgList, handleGetSvg } = useData();
  const { handleSaveSVG } = useStore(svgProps, handleGetSvg);
  const { socket, sendMessage, isConnected } = useWebSocket(VITE_APP_SOCKET_URL);
  const { handleMouseDown, handleMouseMove, handleMouseUp } = useMouse({
    setRectProps,
    svgProps,
    setPerimeter,
    socket,
    activeSaveType,
    handleSaveSVG,
    handleGetSvg,
    sendMessage,
    isConnected,
  });

  useEffect(() => {
    if (svgId) {
      handleGetSvg(svgId);
    }
  }, [svgId, handleGetSvg]);

  const handleChangeSaveType = (type: string) => {
    setActiveSaveType(type);
  };

  return (
    <Box component={"form"}>
      <Box sx={{ border: 1, width: { xs: "100%", md: "100%", height: 600 } }}>
        <svg
          data-testid="drawing-svg"
          id="drawing-svg"
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <rect
            x={Math.min(svgProps.startX, svgProps.startX + svgProps.width)}
            y={Math.min(svgProps.startY, svgProps.startY + svgProps.height)}
            width={Math.abs(svgProps.width)}
            height={Math.abs(svgProps.height)}
            className="fill-primary stroke-border stroke-2"
          />
        </svg>
      </Box>
      <Typography>Perimeter: {perimeter}</Typography>
      <Typography>Version: {svgProps?.versionId !== 0 ? svgProps?.versionId : "No Version Id"}</Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, padding: 2, bgcolor: "#f5f5f5", borderRadius: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, padding: 2, bgcolor: "#f5f5f5", borderRadius: 2 }}>
          <ControlledOpenSelect
            itemList={svgList.map(({ listId }) => ({
              id: listId,
              name: `SVG List ${listId}`,
            }))}
            setItem={setSvgId}
          />
          <ColorButtonSubmit sx={{ width: 200, height: 40, mt: 1 }} onClick={handleReset} variant="contained">
            Reset
          </ColorButtonSubmit>
          <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
            <ControlledSwitch
              type="onRelease"
              handleChangeSaveType={handleChangeSaveType}
              activeSaveType={activeSaveType}
              label="Save On Release"
            />
            <ControlledSwitch
              type="onChange"
              handleChangeSaveType={handleChangeSaveType}
              activeSaveType={activeSaveType}
              label="Save On Change"
            />
            <ControlledSwitch
              type="manual"
              handleChangeSaveType={handleChangeSaveType}
              activeSaveType={activeSaveType}
              label="Manual Save"
            />
          </Box>
        </Box>
        <Box sx={{ ml: 2, display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "space-between" }}>
          <ColorButtonSubmit
            onClick={() => handleSaveSVG({ listId: svgProps.listId, versionId: svgProps.versionId })}
            disabled={activeSaveType !== "manual"}
            variant="contained"
            sx={{ flex: "1 1 200px" }}
          >
            Save SVG
          </ColorButtonSubmit>
          <ColorButtonSubmit onClick={() => handleGetVersion("toggle")} variant="contained" sx={{ flex: "1 1 200px" }}>
            Toggle Version
          </ColorButtonSubmit>
          <ColorButtonSubmit onClick={() => handleGetVersion("newest")} variant="contained" sx={{ flex: "1 1 200px" }}>
            Newest Version
          </ColorButtonSubmit>
        </Box>
      </Box>
    </Box>
  );
};

export default TwoDimensionalScalableVectorGraphic;
