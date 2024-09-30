import { useState } from "react";

interface SvgProps {
  startX: number;
  startY: number;
  width: number;
  height: number;
  listId: number;
  versionId: number;
}
interface ParameterProps {
  listId: number;
  versionId: number;
}

interface HookProps {
  setRectProps: React.Dispatch<React.SetStateAction<SvgProps>>;
  svgProps: SvgProps;
  setPerimeter: React.Dispatch<React.SetStateAction<number>>;
  activeSaveType: string;
  socket: WebSocket | null;
  handleSaveSVG: (params: ParameterProps) => void;
  handleGetSvg: (id: number) => void;
  sendMessage: (message: string) => void;
  isConnected: boolean;
}

export default function useMouse({ setRectProps, svgProps, setPerimeter, socket, activeSaveType, handleSaveSVG, handleGetSvg }: HookProps) {
  const [isDrawing, setIsDrawing] = useState(false);

  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    const { offsetX, offsetY } = e.nativeEvent;

    if (
      offsetX >= svgProps.startX &&
      offsetX <= svgProps.startX + svgProps.width &&
      offsetY >= svgProps.startY &&
      offsetY <= svgProps.startY + svgProps.height
    ) {
      setIsDrawing(true);
      return;
    }
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = e.nativeEvent;

    const width = offsetX - svgProps.startX;
    const height = offsetY - svgProps.startY;

    const adjustedWidth = svgProps.width !== 0 ? width : Math.max(1, width);
    const adjustedHeight = svgProps.height !== 0 ? height : Math.max(1, height);

    const newPerimeter = 2 * (Math.abs(adjustedWidth) + Math.abs(adjustedHeight));

    setRectProps((prevProps) => ({
      ...prevProps,
      width: adjustedWidth,
      height: adjustedHeight,
    }));

    setPerimeter(newPerimeter);

    if (activeSaveType === "onChange") {
      liveSave(svgProps.listId, svgProps.versionId, adjustedWidth, adjustedHeight);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    if (activeSaveType === "onRelease") {
      handleSaveSVG({ listId: svgProps.listId, versionId: svgProps.versionId });
    } else if (activeSaveType === "onChange" || activeSaveType === "onRelease") {
      handleGetSvg(svgProps.listId);
    }
  };

  const liveSave = async (ListId: number, VersionId: number, Width: number, Height: number) => {
    const liveSaveData = {
      ListId,
      VersionId,
      Width,
      Height,
    };

    try {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(liveSaveData));
      } else {
        console.error("WebSocket is not open.");
      }
    } catch (error) {
      console.error("Error during live save:", error);
    }
  };

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    liveSave,
  };
}
