// 'use client';

// import React, { useCallback, useMemo, useEffect } from 'react';
// import {
//   ReactFlow,
//   Background,
//   Controls,
//   MiniMap,
//   useNodesState,
//   useEdgesState,
//   addEdge,
//   ConnectionLineType,
//   Handle,
//   Position,
//   type NodeProps,
// } from '@xyflow/react';
// import '@xyflow/react/dist/style.css';
// import NodeCard from './component-research/node-card';
// import type { TreeNode } from './flow-builder-research';
// import type { InvalidData, NodeData } from './component-research/use-flow-store';

// // Custom Node Component for React Flow
// const CustomNode = ({ data, selected } : NodeProps) => {
//   const { node, onAddChild, onEdit, onDelete, onSelect } = data;
  
//   return (
//     <div>
//       <Handle
//         type="target"
//         position={Position.Top}
//         className="w-3 h-3 bg-blue-500 border-2 border-white"
//       />
//       <NodeCard
//         node={node}
//         onAddChild={onAddChild}
//         onEdit={onEdit}
//         onDelete={onDelete}
//         isSelected={selected}
//         onSelect={onSelect}
//       />
//       <Handle
//         type="source"
//         position={Position.Bottom}
//         className="w-3 h-3 bg-blue-500 border-2 border-white"
//       />
//     </div>
//   );
// };

// // Node types for React Flow
// const nodeTypes = {
//   custom: CustomNode,
// };

// export interface TreeNode {
//   id: string;
//   type?: string;
//   position?: { x: number; y: number };
//   children?: TreeNode[];
//   [key: string]: any;
//   label: string;
//   data: NodeData;
//   invalid_data: InvalidData;
// }

// interface FlowEditorProps {
//   nodes: TreeNode[];
//   selectedNode: TreeNode | null;
//   onAddChild: (parentNode: TreeNode) => void;
//   onEdit: (node: TreeNode) => void;
//   onDelete: (nodeId: string) => void;
//   onSelect: (node: TreeNode) => void;
//   onNodeUpdate: (nodeId: string, updates: Partial<TreeNode>) => void;
// }

// const FlowEditor : React.FC<FlowEditorProps> = ({ 
//   nodes, 
//   selectedNode, 
//   onAddChild, 
//   onEdit, 
//   onDelete, 
//   onSelect, 
//   onNodeUpdate 
// }) => {
//   // Convert our node structure to React Flow format
//   const { flowNodes, flowEdges } = useMemo(() => {
//     const flowNodes = [];
//     const flowEdges = [];
    
//     const processNode = (node, parentId = null, level = 0) => {
//       // Add node to React Flow nodes
//       flowNodes.push({
//         id: node.id,
//         type: 'custom',
//         position: node.position || { 
//           x: level * 350, 
//           y: flowNodes.length * 150 
//         },
//         data: {
//           node,
//           onAddChild,
//           onEdit,
//           onDelete,
//           onSelect
//         },
//         draggable: true,
//       });
      
//       // Create edge from parent to this node
//       if (parentId) {
//         flowEdges.push({
//           id: `${parentId}-${node.id}`,
//           source: parentId,
//           target: node.id,
//           type: 'smoothstep',
//           animated: true,
//           style: { stroke: '#3b82f6', strokeWidth: 2 },
//         });
//       }
      
//       // Process children
//       node.children.forEach((child, index) => {
//         processNode(child, node.id, level + 1);
//       });
//     };
    
//     nodes.forEach(node => processNode(node));
    
//     return { flowNodes, flowEdges };
//   }, [nodes, onAddChild, onEdit, onDelete, onSelect]);

//   const [reactFlowNodes, setReactFlowNodes, onNodesChange] = useNodesState(flowNodes);
//   const [reactFlowEdges, setReactFlowEdges, onEdgesChange] = useEdgesState(flowEdges);

//   // Update React Flow when our nodes change
//   useEffect(() => {
//     setReactFlowNodes(flowNodes);
//     setReactFlowEdges(flowEdges);
//   }, [flowNodes, flowEdges, setReactFlowNodes, setReactFlowEdges]);

//   const onConnect = useCallback(
//     (params) => setReactFlowEdges((eds) => addEdge(params, eds)),
//     [setReactFlowEdges]
//   );

//   const onNodeDragStop = useCallback(
//     (event, node) => {
//       // Update node position in our store
//       onNodeUpdate(node.id, { position: node.position });
//     },
//     [onNodeUpdate]
//   );

//   return (
//     <div className="w-full h-full">
//       <ReactFlow
//         nodes={reactFlowNodes}
//         edges={reactFlowEdges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onConnect={onConnect}
//         onNodeDragStop={onNodeDragStop}
//         nodeTypes={nodeTypes}
//         connectionLineType={ConnectionLineType.SmoothStep}
//         fitView
//         defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
//         minZoom={0.3}
//         maxZoom={2}
//         style={{ background: '#f8fafc' }}
//       >
//         <Background 
//           color="#e2e8f0" 
//           gap={20} 
//           size={1}
//         />
//         <Controls 
//           className="bg-white shadow-lg border border-gray-200"
//           showZoom={true}
//           showFitView={true}
//           showInteractive={false}
//         />
//         <MiniMap 
//           className="bg-white shadow-lg border border-gray-200"
//           nodeColor={(node) => {
//             const nodeType = node.data.node.type;
//             switch (nodeType) {
//               case 'start': return '#86efac';
//               case 'user': return '#93c5fd';
//               case 'bot': return '#c4b5fd';
//               default: return '#e5e7eb';
//             }
//           }}
//           maskColor="rgba(0, 0, 0, 0.1)"
//         />
//       </ReactFlow>
//     </div>
//   );
// };

// export default FlowEditor;