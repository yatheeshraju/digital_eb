import React, { useState, useEffect, useRef } from "react";
import { Stage, Layer, Text, Rect, Group, Arrow } from "react-konva";

import { set } from "../utils/idb_utils";
import { CardImage } from "./CardImage";

function Viewer({ data, size }) {
  const [wallData, setwallData] = useState([]);
  const [scaleBy, setscaleBy] = useState(0);
  const stageRef = useRef();
  const handleDrag = (id) => {
    let tempwall = wallData.map((item) =>
      item.id === id ? { ...item, isDragging: true } : item
    );
    setwallData(tempwall);
  };
  const updatePos = (e, id) => {
    let tempwall = wallData.map((item) =>
      item.id === id
        ? { ...item, isDragging: false, x: e.target.x(), y: e.target.y() }
        : item
    );
    let tempitem = tempwall.filter((item) => item.id === id);
    set(...tempitem);
    setwallData(tempwall);
  };

  useEffect(() => {
    setwallData(data);
    setscaleBy(1.2);
  }, [data]);

  const zoomStage = (event) => {
    if (stageRef.current !== null) {
      const stage = stageRef.current;
      const oldScale = stage.scaleX();
      const { x: pointerX, y: pointerY } = stage.getPointerPosition();
      const mousePointTo = {
        x: (pointerX - stage.x()) / oldScale,
        y: (pointerY - stage.y()) / oldScale,
      };
      const newScale =
        event.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
      stage.scale({ x: newScale, y: newScale });
      const newPos = {
        x: pointerX - mousePointTo.x * newScale,
        y: pointerY - mousePointTo.y * newScale,
      };
      stage.position(newPos);
      stage.batchDraw();
      stage.width(size.width);
    }
  };

  const getPoints = (id, linkid) => {
    let from = [];
    let to = [];
    if (typeof linkid === "string") {
      linkid = parseInt(linkid);
      from = wallData.find((item) => item.id === id);
      to = wallData.find((item) => item.id === linkid);
      if (from && to) {
        return {
          valid: true,
          points: [from.x + 125, from.y + 300, to.x + 125, to.y],
        };
      }
    }
    return { valid: false, points: [0, 0, 0, 0] };
  };

  const b64toBlob = (b64Data, contentType = "") => {
    let sliceSize = 512;
    const byteCharacters = window.atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });

    const blobUrl = URL.createObjectURL(blob);
    return blobUrl;
  };

  return (
    <>
      <Stage
        style={{ backgroundColor: "#dad7cd" }}
        ref={stageRef}
        onWheel={zoomStage}
        width={size.width * scaleBy}
        height={size.height * scaleBy}
        draggable
      >
        <Layer imageSmoothingEnabled={false}>
          {wallData.map((item) => (
            <Group
              key={item.id}
              onDragStart={() => handleDrag(item.id)}
              onDragEnd={(e) => updatePos(e, item.id)}
              fill={item.isDragging ? "green" : "black"}
              x={item.x}
              y={item.y}
              draggable
            >
              <Rect
                width={300}
                height={300}
                fill="white"
                shadowEnabled={true}
                shadowOffsetY={5}
                shadowOffsetX={5}
                shadowBlur={20}
                shadowColor="#344e41"
              ></Rect>
              {item.image && (
                <CardImage
                  imgurl={b64toBlob(
                    item.image.split(",")[1],
                    item.image.split(",")[0].split(":")[1].split(";")[0]
                  )}
                />
              )}

              <Group>
                <Rect
                  width={300}
                  height={100}
                  fill="white"
                  offsetY={-200}
                ></Rect>
                <Text
                  align="center"
                  verticalAlign="middle"
                  width={300}
                  fontStyle="bold"
                  fontSize={18}
                  height={50}
                  key={"name_" + item.id}
                  text={item.name}
                  offsetY={-190}
                />

                <Text
                  align="left"
                  verticalAlign="top"
                  padding={10}
                  width={300}
                  height={100}
                  offsetY={-215}
                  key={"desc_" + item.id}
                  text={item.data}
                />
              </Group>
            </Group>
          ))}
          {wallData.map((item) =>
            item.link && getPoints(item.id, item.link).valid ? (
              <Arrow
                key={item.id}
                points={getPoints(item.id, item.link).points}
                fill="#344e41"
                stroke={"#344e41"}
              />
            ) : (
              ""
            )
          )}
        </Layer>
      </Stage>
    </>
  );
}

export default Viewer;
