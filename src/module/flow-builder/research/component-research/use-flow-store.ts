import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import type { TreeNode } from '../flow-builder-research';

// =======================
// 🧩 Types
// =======================

export interface NodeData {
  expected_type: string;
  expected_id: string | null;
  job_valid_type: string;
  job_valid_request: string;
}

export interface InvalidData {
  job_invalid_type: string;
  job_invalid_request: string;
}

export interface Position {
  x: number;
  y: number;
}

// export interface TreeNode {
//   id: string;
//   type: string;
//   label: string;
//   position: Position;
//   data: NodeData;
//   invalid_data: InvalidData;
//   children: TreeNode[];
// }

// =======================
// 🧠 Store Type Definition
// =======================
interface FlowStoreState {
  nodes: TreeNode[];
  selectedNode: TreeNode | null;

  // Actions
  addNode: (parentId: string, nodeData?: Partial<TreeNode>) => TreeNode;
  updateNode: (nodeId: string, updates: Partial<TreeNode>) => void;
  deleteNode: (nodeId: string) => void;

  setSelectedNode: (node: TreeNode | null) => void;
  clearSelection: () => void;

  // JSON Export/Import
  exportToJSON: () => string;
  importFromJSON: (jsonString: string) => boolean;

  // LocalStorage
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => boolean;

  // Helpers
  findNodeById: (nodeId: string) => TreeNode | null;
  getAllNodes: () => TreeNode[];
}

// =======================
// 🏗️ Store Implementation
// =======================
const useFlowStore = create<FlowStoreState>((set, get) => ({
  nodes: [
    {
      id: 'node-1',
      type: 'start',
      label: 'Mulai Proses',
      position: { x: 50, y: 100 },
      data: {
        expected_type: 'META',
        expected_id: null,
        job_valid_type: 'META',
        job_valid_request: '',
      },
      invalid_data: {
        job_invalid_type: 'META',
        job_invalid_request: '',
      },
      children: [],
    },
  ],

  selectedNode: null,

  // =======================
  // ➕ Add Node
  // =======================
  addNode: (parentId, nodeData = {}) => {
    const newNode: TreeNode = {
      id: uuidv4(),
      type: nodeData.type ?? 'default',
      label: nodeData.label ?? 'Node Baru',
      position: {
        x: nodeData.position?.x ?? Math.random() * 400 + 100,
        y: nodeData.position?.y ?? Math.random() * 300 + 100,
      },
      data: {
        expected_type: 'META',
        expected_id: null,
        job_valid_type: 'META',
        job_valid_request: '',
        ...nodeData.data,
      },
      invalid_data: {
        job_invalid_type: 'META',
        job_invalid_request: '',
        ...nodeData.invalid_data,
      },
      children: [],
    };

    set((state) => {
      const updateNodeChildren = (nodes: TreeNode[]): TreeNode[] => {
        return nodes.map((node) => {
          if (node.id === parentId) {
            return {
              ...node,
              children: [...node.children??[], newNode],
            };
          }
          return {
            ...node,
            children: updateNodeChildren(node.children ?? []),
          };
        });
      };

      return {
        nodes: updateNodeChildren(state.nodes),
      };
    });

    return newNode;
  },

  // =======================
  // ✏️ Update Node
  // =======================
  updateNode: (nodeId, updates) => {
    set((state) => {
      const updateNodeRecursive = (nodes: TreeNode[]): TreeNode[] => {
        return nodes.map((node) => {
          if (node.id === nodeId) {
            return { ...node, ...updates };
          }
          return {
            ...node,
            children: updateNodeRecursive(node.children ?? []),
          };
        });
      };

      return {
        nodes: updateNodeRecursive(state.nodes),
      };
    });
  },

  // =======================
  // ❌ Delete Node
  // =======================
  deleteNode: (nodeId) => {
    set((state) => {
      const deleteNodeRecursive = (nodes: TreeNode[]): TreeNode[] => {
        return nodes
          .filter((node) => node.id !== nodeId)
          .map((node) => ({
            ...node,
            children: deleteNodeRecursive(node.children ?? []),
          }));
      };

      return {
        nodes: deleteNodeRecursive(state.nodes),
        selectedNode:
          state.selectedNode?.id === nodeId ? null : state.selectedNode,
      };
    });
  },

  // =======================
  // 🎯 Selection
  // =======================
  setSelectedNode: (node) => set({ selectedNode: node }),
  clearSelection: () => set({ selectedNode: null }),

  // =======================
  // 📤 Export / Import
  // =======================
  exportToJSON: () => {
    const { nodes } = get();
    return JSON.stringify(nodes, null, 2);
  },

  importFromJSON: (jsonString) => {
    try {
      const nodes: TreeNode[] = JSON.parse(jsonString);
      set({ nodes });
      return true;
    } catch (error) {
      console.error('Failed to import JSON:', error);
      return false;
    }
  },

  // =======================
  // 💾 LocalStorage
  // =======================
  saveToLocalStorage: () => {
    const { nodes } = get();
    localStorage.setItem('whatsapp-flow-builder', JSON.stringify(nodes));
  },

  loadFromLocalStorage: () => {
    try {
      const saved = localStorage.getItem('whatsapp-flow-builder');
      if (saved) {
        const nodes: TreeNode[] = JSON.parse(saved);
        set({ nodes });
        return true;
      }
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
    }
    return false;
  },

  // =======================
  // 🧭 Helper Functions
  // =======================
  findNodeById: (nodeId) => {
    const { nodes } = get();
    const findRecursive = (nodeList: TreeNode[]): TreeNode | null => {
      for (const node of nodeList) {
        if (node.id === nodeId) return node;
        const found = findRecursive(node.children ?? []);
        if (found) return found;
      }
      return null;
    };
    return findRecursive(nodes);
  },

  getAllNodes: () => {
    const { nodes } = get();
    const getAllRecursive = (nodeList: TreeNode[]): TreeNode[] => {
      let allNodes: TreeNode[] = [];
      for (const node of nodeList) {
        allNodes.push(node);
        allNodes = allNodes.concat(getAllRecursive(node.children ?? []));
      }
      return allNodes;
    };
    return getAllRecursive(nodes);
  },
}));

export default useFlowStore;
