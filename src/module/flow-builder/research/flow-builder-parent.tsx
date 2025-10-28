import React, { useEffect, useState, useCallback } from 'react';
import { Download, Upload, RotateCcw, Plus } from 'lucide-react';
import FlowBuilderResearch, { type TreeNode } from './flow-builder-research';
import useFlowStore from './component-research/use-flow-store';


// Force dynamic rendering (Next.js 15+)
export const dynamic = 'force-dynamic';

export default function FlowBuilderParent() {
  const {
    nodes,
    selectedNode,
    addNode,
    updateNode,
    deleteNode,
    setSelectedNode,
    clearSelection,
    exportToJSON,
    importFromJSON,
    saveToLocalStorage,
    loadFromLocalStorage,
    findNodeById,
  } = useFlowStore();

  const [showForm, setShowForm] = useState(false);
  const [editingNode, setEditingNode] = useState<any | null>(null);

  // 🧠 Load from localStorage once on mount
  useEffect(() => {
    loadFromLocalStorage();
  }, [loadFromLocalStorage]);

  // 💾 Auto-save when nodes change
  useEffect(() => {
    if (nodes.length > 0) {
      saveToLocalStorage();
    }
  }, [nodes, saveToLocalStorage]);

  // ➕ Add child node
  // const handleAddChild = useCallback(
  //   (parentId: TreeNode) => {
  //     console.log('Adding child to parent ID:', parentId);
  //     const parentNode = findNodeById(parentId);
  //     if (!parentNode) return;

  //     const childPosition = {
  //       x: (parentNode.position?.x || 0) + 400,
  //       y: (parentNode.position?.y || 0) + (parentNode.children?.length || 0) * 100,
  //     };

  //     const newNode = addNode(parentId, {
  //       position: childPosition,
  //       type: 'default',
  //       label: `Child ${(parentNode.children?.length ?? 0) + 1 || 1}`,
  //     });

  //     setEditingNode(newNode);
  //     setShowForm(true);
  //   },
  //   [findNodeById, addNode]
  // );

const handleAddChild = useCallback(
  (parentNode: TreeNode) => {
    console.log('Adding child to parent:', parentNode);
    if (!parentNode) return;

    const childPosition = {
      x: (parentNode.position?.x ?? 0) + 400,
      y: (parentNode.position?.y ?? 0) + (parentNode.children?.length ?? 0) * 100,
    };

    const newNode = addNode(parentNode.id, {
      position: childPosition,
      type: 'default',
      label: `Child ${(parentNode.children?.length ?? 0) + 1 || 1}`,
    });

    setEditingNode(newNode);
    setShowForm(true);
  },
  [addNode]
);


  // ✏️ Edit node
  const handleEdit = useCallback((node: any) => {
    setEditingNode(node);
    setShowForm(true);
  }, []);

  // 🗑️ Delete node
  const handleDelete = useCallback(
    (nodeId: string) => {
      if (window.confirm('Are you sure you want to delete this node and all its children?')) {
        deleteNode(nodeId);
        if (selectedNode?.id === nodeId) clearSelection();
      }
    },
    [deleteNode, selectedNode, clearSelection]
  );

  // 🎯 Select node
  const handleSelect = useCallback(
    (node: any) => {
      setSelectedNode(node);
    },
    [setSelectedNode]
  );

  // 💾 Save edited node
  const handleSave = useCallback(
    (nodeId: string, updates: any) => {
      updateNode(nodeId, updates);
      setShowForm(false);
      setEditingNode(null);
    },
    [updateNode]
  );

  // 📤 Export JSON
  const handleExport = useCallback(() => {
    const json = exportToJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'whatsapp-flow-builder.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [exportToJSON]);

  // 📥 Import JSON
  const handleImport = useCallback(
    (jsonString: string | ArrayBuffer | null) => {
      if (typeof jsonString !== 'string') return;
      const success = importFromJSON(jsonString);
      alert(success ? 'Flow imported successfully!' : 'Failed to import flow. Please check the JSON format.');
    },
    [importFromJSON]
  );

  // 📂 Handle file import
  const handleFileImport = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => handleImport(e.target?.result || '');
      reader.readAsText(file);
    },
    [handleImport]
  );

  // ♻️ Reset all nodes
  const handleReset = useCallback(() => {
    if (window.confirm('Are you sure you want to reset the entire flow? This action cannot be undone.')) {
      localStorage.removeItem('whatsapp-flow-builder');
      window.location.reload();
    }
  }, []);

  // 🪄 Add root node
  const handleAddRootNode = useCallback(() => {
    const newNode = addNode("", {
      type: 'default',
      label: `Root Node ${nodes.length + 1}`,
      position: { x: 50, y: nodes.length * 200 },
    });

    setEditingNode(newNode);
    setShowForm(true);
  }, [addNode, nodes]);

  return (
    <div className="h-screen w-full bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-800">WhatsApp Flow Builder</h1>
              <div className="text-sm text-gray-500">
                {nodes.length} node{nodes.length !== 1 ? 's' : ''}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleAddRootNode}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Root Node
              </button>

              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export
              </button>

              <label className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors cursor-pointer">
                <Upload className="w-4 h-4" />
                Import
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileImport}
                  className="hidden"
                />
              </label>

              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Flow Builder */}
      <main className="flex-1 relative overflow-hidden">
        <FlowBuilderResearch
          nodes={nodes}
          selectedNode={selectedNode}
          onAddChild={handleAddChild}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSelect={handleSelect}
          onNodeUpdate={updateNode}
        />

        {/* Empty state overlay */}
        {nodes.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50/80">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">No nodes yet</h2>
              <p className="text-gray-500 mb-4">Click "Add Root Node" to get started</p>
            </div>
          </div>
        )}
      </main>

      {/* Sidebar Node Form */}
      {/* {showForm && editingNode && (
        <NodeForm
          node={editingNode}
          onSave={handleSave}
          onClose={() => {
            setShowForm(false);
            setEditingNode(null);
          }}
          onExport={handleExport}
          onImport={handleImport}
        />
      )} */}
    </div>
  );
}