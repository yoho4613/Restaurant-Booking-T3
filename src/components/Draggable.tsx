import React, { ReactNode, useState } from "react";

export interface DraggableItem {
  id: string;
  content: string;
}

interface DropTargetProps {
  onDrop: (item: DraggableItem) => void;
  children: ReactNode;
}

export const DropTarget: React.FC<DropTargetProps> = ({ onDrop, children }) => {
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const itemId = event.dataTransfer.getData("text/plain");
    const itemContent = event.dataTransfer.getData("text/html");

    const parser = new DOMParser();
    const parsedContent = parser.parseFromString(itemContent, "text/html")
      .documentElement.textContent;

    const item: DraggableItem = { id: itemId, content: parsedContent! };
    const dropIndex = Array.from(event.currentTarget.children).indexOf(event.target as HTMLElement);
  
    onDrop(item);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className="w-full h-full" onDrop={handleDrop} onDragOver={handleDragOver}>
      {children}
    </div>
  );
};

interface DraggableProps {
  item: DraggableItem;
}

export const Draggable: React.FC<DraggableProps> = ({ item }) => {
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("text/plain", item.id);
    event.dataTransfer.setData("text/html", item.content);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <span className="inline-block bg-white px-4 py-2 my-2" draggable onDragStart={handleDragStart}>
      {item.content}
    </span>
  );
};
