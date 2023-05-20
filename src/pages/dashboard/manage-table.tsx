import React, { FC, useEffect, useState } from "react";
import {
  Draggable,
  DraggableItem,
  DropTarget,
} from "../../components/Draggable";

interface IManageTableProps {}

interface DraggableProps {
  item: DraggableItem;
}

const ManageTable: FC<IManageTableProps> = ({}) => {
  const [boxes, setBoxes] = useState([
    { id: "1", content: "Box1" },
    { id: "2", content: "Box2" },
    { id: "3", content: "Box3" },
  ]);
  const [droppedBoxes, setDroppedBoxes] = useState<DraggableItem[]>([]);

  const handleDropToDroppedBoxes = (item: DraggableItem) => {
    const updatedItem = { ...item, dropped: true };
    setBoxes((prev) => prev.filter((box) => box.id !== item.id))
    setDroppedBoxes((prevDroppedBoxes) => [...prevDroppedBoxes, updatedItem]);
  };
  const handleDropToPrevBoxes = (item: DraggableItem) => {
    const updatedItem = { ...item, dropped: true };
    setDroppedBoxes((prev) => prev.filter((box) => box.id !== item.id))
    setBoxes((prevDroppedBoxes) => [...prevDroppedBoxes, updatedItem]);
  };

  useEffect(() => {
    console.log(droppedBoxes);
  }, [droppedBoxes]);

  return (
    <div>
      <DropTarget onDrop={handleDropToPrevBoxes}>
        <h1>Drag and Drop Example</h1>
        {boxes.map((box) => (
          <Draggable key={box.id} item={box} />
        ))}
      </DropTarget>

      <DropTarget onDrop={handleDropToDroppedBoxes}>
        <div className="h-screen">
          <h2>Dropped Items:</h2>

            {droppedBoxes.map((item) => (
              <Draggable key={item.id} item={item} />
            ))}

        </div>
      </DropTarget>
    </div>
  );
};

export default ManageTable;
