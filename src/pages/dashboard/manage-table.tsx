import React, { FC, useEffect, useState } from "react";
import {
  Draggable,
  DraggableItem,
  DropTarget,
} from "../../components/Draggable";
import { api } from "~/utils/api";

const ManageTable: FC = ({}) => {
  const { data: tables } = api.table.getTables.useQuery();
  const [boxes, setBoxes] = useState<DraggableItem[]>([]);
  const [droppedBoxes, setDroppedBoxes] = useState<DraggableItem[]>([]);

  useEffect(() => {
    console.log(tables);
    if (tables) {
      setBoxes(tables.map((table) => ({ id: table.id, content: table.name })));
    }
  }, [tables]);

  const handleDropToDroppedBoxes = (item: DraggableItem) => {
    const updatedItem = { ...item };
    setBoxes((prev) => prev.filter((box) => box.id !== item.id));
    setDroppedBoxes((prevDroppedBoxes: DraggableItem[]) => {
      const newArr = [updatedItem];
      prevDroppedBoxes.forEach((box) =>
        updatedItem.id !== box.id ? newArr.push(box) : ""
      );
      return newArr;
    });
  };
  const handleDropToPrevBoxes = (item: DraggableItem) => {
    const updatedItem = { ...item };
    setDroppedBoxes((prev) => prev.filter((box) => box.id !== item.id));
    setBoxes((prevDroppedBoxes) => {
      const newArr = [updatedItem];
      prevDroppedBoxes.forEach((box) =>
        updatedItem.id !== box.id ? newArr.push(box) : ""
      );
      return newArr;
    });
  };

  useEffect(() => {
    console.log(droppedBoxes);
  }, [droppedBoxes]);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Manage Table</h1>
      <div className="flex w-full justify-between">
        <div className="w-1/3 bg-slate-400 p-6">
          <DropTarget onDrop={handleDropToPrevBoxes}>
            <h1>Drag and Drop Example</h1>
            {boxes.map((box) => (
              <Draggable key={box.id} item={box} />
            ))}
          </DropTarget>
        </div>

        <div className="w-1/3 bg-slate-400 p-6">
          <DropTarget onDrop={handleDropToDroppedBoxes}>
            <div className="h-screen">
              <h2>Dropped Items:</h2>

              {droppedBoxes.map((item) => (
                <Draggable key={item.id} item={item} />
              ))}
            </div>
          </DropTarget>
        </div>
      </div>
    </div>
  );
};

export default ManageTable;
