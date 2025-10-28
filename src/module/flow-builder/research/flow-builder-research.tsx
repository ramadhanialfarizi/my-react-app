import { addEdge, Background, ConnectionLineType, Controls, Handle, MiniMap, Position, ReactFlow, useEdgesState, useNodesState, type Edge, type Node } from "@xyflow/react";
import NodeCard from "./component-research/node-card";
import { useCallback, useEffect, useMemo } from "react";
import type { InvalidData, NodeData } from "./component-research/use-flow-store";

const CustomNode = ({ data, selected } : any) => {
  const { node, onAddChild, onEdit, onDelete, onSelect } = data;
  
  return (
    <div>
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-blue-500 border-2 border-white"
      />
      <NodeCard
        node={node}
        onAddChild={onAddChild}
        onEdit={onEdit}
        onDelete={onDelete}
        isSelected={selected}
        onSelect={onSelect}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-blue-500 border-2 border-white"
      />
    </div>
  );
};

const nodeTypes = {
  customNodes: CustomNode,
}

export interface TreeNode {
  id: string;
  type?: string;
  position?: { x: number; y: number };
  children?: TreeNode[];
  [key: string]: any;
  label: string;
  data: NodeData;
  invalid_data: InvalidData;
}

type FlowEditorProps =  {
  nodes: TreeNode[];
  selectedNode?: TreeNode | null;
  onAddChild: (node: TreeNode) => void;
  onEdit: (node: TreeNode) => void;
  onDelete: (nodeId: string) => void;
  onSelect: (nodeId: string) => void;
  onNodeUpdate: (nodeId: string, updates: Partial<TreeNode>) => void;
}

type CustomNodeData = {
  node: TreeNode;
  onAddChild: (node: TreeNode) => void;
  onEdit: (node: TreeNode) => void;
  onDelete: (nodeId: string) => void;
  onSelect: (nodeId: string) => void;
};

const FlowBuilderResearch: React.FC<FlowEditorProps> = ({
  nodes, 
  selectedNode, 
  onAddChild, 
  onEdit, 
  onDelete, 
  onSelect, 
  onNodeUpdate 
}) => {
  const { flowNodes, flowEdges } = useMemo(() => {
    const flowNodes: Node<CustomNodeData>[] = [];
    const flowEdges: Edge[] = [];

    const processNode = (node: TreeNode, parentId: string | null = null, level = 0) => {
      // Tambahkan node ke daftar React Flow
      flowNodes.push({
        id: node.id,
        type: 'customNodes',
        position: node.position || {
          x: level * 350,
          y: flowNodes.length * 150,
        },
        data: {
          node,
          onAddChild,
          onEdit,
          onDelete,
          onSelect,
        },
        draggable: true,
      });

      // Buat edge antara parent dan node ini
      if (parentId) {
        flowEdges.push({
          id: `${parentId}-${node.id}`,
          source: parentId,
          target: node.id,
          type: 'smoothstep',
          animated: true,
          style: { stroke: '#3b82f6', strokeWidth: 2 },
        });
      }

      // Rekursif untuk anak-anak
      node.children?.forEach((child) => {
        processNode(child, node.id, level + 1);
      });
    };

    nodes.forEach((node) => processNode(node));

    return { flowNodes, flowEdges };
  }, [nodes, onAddChild, onEdit, onDelete, onSelect]);

   const [reactFlowNodes, setReactFlowNodes, onNodesChange] = useNodesState(flowNodes);
  const [reactFlowEdges, setReactFlowEdges, onEdgesChange] = useEdgesState(flowEdges);

  // 🔁 Update nodes & edges jika data berubah
  useEffect(() => {
    setReactFlowNodes(flowNodes);
    setReactFlowEdges(flowEdges);
  }, [flowNodes, flowEdges, setReactFlowNodes, setReactFlowEdges]);

  // 🔗 Handle node connection
  const onConnect = useCallback(
    (params: any) => setReactFlowEdges((eds) => addEdge(params, eds)),
    [setReactFlowEdges]
  );

  // 🧲 Handle node drag update
  const onNodeDragStop = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      onNodeUpdate(node.id, { position: node.position });
    },
    [onNodeUpdate]
  );

  return (
     <div className="w-full h-full" style={{ height: '100vh', width: '100vw',}}>
      <ReactFlow
        nodes={reactFlowNodes}
        edges={reactFlowEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDragStop={onNodeDragStop}
        nodeTypes={nodeTypes}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
        defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
        minZoom={0.3}
        maxZoom={2}
        style={{ background: '#f8fafc' }}
      >
        <Background color="#e2e8f0" gap={20} size={1} />
        <Controls
          className="bg-white shadow-lg border border-gray-200"
          showZoom
          showFitView
          showInteractive={false}
        />
        <MiniMap
          className="bg-white shadow-lg border border-gray-200"
          nodeColor={(node) => {
            const nodeType = node.data.type;
            switch (nodeType) {
              case 'start':
                return '#86efac';
              case 'user':
                return '#93c5fd';
              case 'bot':
                return '#c4b5fd';
              default:
                return '#e5e7eb';
            }
          }}
          maskColor="rgba(0, 0, 0, 0.1)"
        />
      </ReactFlow>
    </div>
  )
}

export default FlowBuilderResearch;