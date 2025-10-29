import { Handle, Position } from '@xyflow/react';
import React from 'react';

export default function CardNode({ id, data } : any) {
  const { label, onAdd, onDelete, value, onChange } = data;

  return (
    <div className="p-4 bg-white rounded-xl shadow-md border flex flex-col gap-2 min-w-[200px]">
      <input
        type="text"
        value={value || ''}
        onChange={(e) =>  onChange && onChange(e, { id, ...data })}
        placeholder="Enter text..."
        className="border rounded-md p-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <div className="flex justify-between gap-2">
        <button
          onClick={(e) => onAdd && onAdd(e, { id, ...data })}
          className="bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600"
        >
          Add
        </button>

        <button
          onClick={(e) => onDelete && onDelete(e, { id, ...data })}
          className="bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>

      {/* Optional: connector handles */}
        <Handle type="source" position={Position.Bottom} id="source"/>
        <Handle type="target" position={Position.Top} id="target"/>
    </div>
  );
}
