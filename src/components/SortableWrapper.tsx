'use client';
import { useState } from 'react';
import axios from 'axios';
import { DndContext, closestCenter ,DragEndEvent} from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableItem = ({ id, title }: { id: string; title: string }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="p-4 border rounded bg-white mb-2 cursor-move">
      {title}
    </div>
  );
};

export default function SectionReorder({ onReorder }: { onReorder: (order: string[]) => void }) {
  const [items, setItems] = useState([
    { id: 'hero', title: 'Hero' },
    { id: 'about', title: 'About' },
    { id: 'feature', title: 'Feature' },
    { id: 'footer', title: 'Footer' },
  ]);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = items.findIndex(item => item.id === active.id);
      const newIndex = items.findIndex(item => item.id === over?.id);
      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);

      const order = newItems.map(item => item.id);
      onReorder(order);

      await axios.put('/api/reorder-section', { sectionOrder: order });
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
        {items.map(item => (
          <SortableItem key={item.id} id={item.id} title={item.title} />
        ))}
      </SortableContext>
    </DndContext>
  );
}
