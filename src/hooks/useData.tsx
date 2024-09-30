import { useState, useEffect, useCallback } from "react";
import { api } from "../components/api/api";

interface Version {
  id: number;
  width: number;
  height: number;
  x: number;
  y: number;
}

interface SvgData {
  listId: number;
  currentVersion: Version;
  previousVersions: Version[];
  versions: Version[];
}

export default function useData() {
  const [svgProps, setRectProps] = useState({
    startX: 0,
    startY: 0,
    width: 0,
    height: 0,
    listId: 0,
    versionId: 0,
  });
  const [svgData, setSvgData] = useState<SvgData | null>(null);
  const [perimeter, setPerimeter] = useState(0);
  const [svgList, setSvgList] = useState([]);
  const [currentVersionIndex, setCurrentVersionIndex] = useState(0);

  const handleGetSvg = useCallback(async (id: number) => {
    try {
      const apiUrl = `/api/svg/${id}`;
      const response = await api(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

      const { versions, listId } = response;
      const currentVersion = versions[0];

      setRectProps({
        startX: currentVersion.x,
        startY: currentVersion.y,
        width: currentVersion.width,
        height: currentVersion.height,
        listId: listId,
        versionId: currentVersion.id,
      });
      setSvgData(response);
      setPerimeter((currentVersion.width + currentVersion.height) * 2);
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  const handleGetSvgs = useCallback(async () => {
    try {
      const apiUrl = `/api/svg`;
      const response = await api(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

      setSvgList(response);
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  useEffect(() => {
    if (svgList?.length === 0) handleGetSvgs();
  }, [handleGetSvgs, svgList?.length]);

  const handleGetVersion = async (action: "toggle" | "newest") => {
    if (!svgData) return;

    const { listId, versions } = svgData;

    try {
      if (action === "toggle") {
        const nextIndex = (currentVersionIndex + 1) % versions.length;
        setCurrentVersionIndex(nextIndex);

        const currentVersion = versions[nextIndex];

        setRectProps({
          listId: listId,
          width: currentVersion.width,
          height: currentVersion.height,
          startX: currentVersion.x,
          startY: currentVersion.y,
          versionId: currentVersion.id,
        });

        setSvgData(svgData);
        setPerimeter((currentVersion.width + currentVersion.height) * 2);
      } else {
        const newestSvgData = await api(`/api/svg/version`, {
          method: "POST",
          body: {
            listId,
            action: "newest",
          },
        });

        const currentVersion = newestSvgData.versions[0];
        setRectProps({
          listId: newestSvgData.listId,
          width: currentVersion.width,
          height: currentVersion.height,
          startX: currentVersion.x,
          startY: currentVersion.y,
          versionId: currentVersion.id,
        });

        setSvgData(newestSvgData);
        setPerimeter((currentVersion.width + currentVersion.height) * 2);
      }
    } catch (error) {
      console.error("Error getting version:", error);
    }
  };

  return {
    svgProps,
    setRectProps,
    setPerimeter,
    perimeter,
    handleGetVersion,
    handleGetSvg,
    svgList,
  };
}
