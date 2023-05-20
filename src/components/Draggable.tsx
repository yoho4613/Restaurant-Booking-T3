import React, { ReactNode, useState } from 'react';

export interface DraggableItem {
  id: string;
  content: string;
}

interface DropTargetProps {
  onDrop: (item: DraggableItem) => void;
  children: ReactNode
}

export const DropTarget: React.FC<DropTargetProps> = ({ onDrop, children }) => {
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    console.log(event.target)
    const itemId = event.dataTransfer.getData('text/plain');
    const itemContent = event.dataTransfer.getData('text/html');
    const item: DraggableItem = { id: itemId, content: itemContent };
    onDrop(item);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div onDrop={handleDrop} onDragOver={handleDragOver}>
      {children}
    </div>
  );
};

interface DraggableProps {
  item: DraggableItem;
}

export const Draggable: React.FC<DraggableProps> = ({ item }) => {
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('text/plain', item.id);
    event.dataTransfer.setData('text/html', item.content);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div draggable onDragStart={handleDragStart}>
      {item.content}
    </div>
  );
};