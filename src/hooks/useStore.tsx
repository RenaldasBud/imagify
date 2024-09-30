import { api } from "../components/api/api";

interface SvgProps {
  width: number;
  height: number;
}

interface ParameterProps {
  listId: number;
  versionId: number;
}

export default function useStore(svgProps: SvgProps, handleGetSvg: (id: number) => void) {
  const handleSaveSVG = async ({ listId, versionId }: ParameterProps) => {
    const newWidth = Math.abs(svgProps.width);
    const newHeight = Math.abs(svgProps.height);

    const newDimensions = {
      height: newHeight,
      width: newWidth,
      listId: listId,
      versionId: versionId,
    };
    const apiUrl = `/api/svg/store-dimensions`;

    try {
      await api(apiUrl, {
        body: newDimensions,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      await handleGetSvg(listId);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return {
    handleSaveSVG,
  };
}
