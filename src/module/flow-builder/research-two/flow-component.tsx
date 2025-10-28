import { ReactFlow, Background, Controls, applyEdgeChanges, applyNodeChanges, addEdge} from "@xyflow/react";
import {useState, useCallback} from "react";

import '@xyflow/react/dist/style.css';
import { TextUpdaterNote } from "./component/text-updater-note";

// generate uid package
import { v4 as uuidv4 } from 'uuid';

let initialNodes = [
    {
        id: 'n1',
        position: { x: 0, y: 0 },
        data: { label: 'Node 1' },
        type: 'input',
    }, 
]

const nodeTypes = {
    textUpdater: TextUpdaterNote,
}

let nodeId: string = "";
// let edgeId: string = "";

let initialEdges: any[] = []

export default function FlowComponent() {

    // Handling Change Event
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);
    const onNodesChange = useCallback((changes: any) => setNodes((nodeSnapshot)=> applyNodeChanges(changes, nodeSnapshot)), [])
    const onEdgesChange = useCallback((changes: any) => setEdges((edgeSnapshot) => applyEdgeChanges(changes, edgeSnapshot)), [])

    // Handling Connect Event
    const onConnect = useCallback((params: any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),[],); 


    function addNode(event: any, node: any) {
        console.log('node click', node.id);
        if(nodeId == "") {
            nodeId = node.id;
        }

        let uniqueId = uuidv4();
        let targetNodeId = `node-${uniqueId}`;
        let edgeId = `edge-${uniqueId}`;

        const newNode = {
            id: targetNodeId,
            position: { x: node.position.x + 150, y: node.position.y + 100 },
            data: { label: `New Node ${targetNodeId}` },
            type: 'textUpdater',
        };

        const newEdge = {
            id: edgeId,
            source: node.id,
            target: targetNodeId,
            type: 'step',
            label: 'connect',
        };

        setNodes((previousNodes) => [...previousNodes, newNode]);
        setEdges((previousEdges) => [...previousEdges, newEdge]);

        nodeId = targetNodeId;

        console.log('added node:', nodes);
        console.log('added edge:', edges);

    }

    return (
        <div style={{ height: '100vh', width: '100vw',}}>
            <ReactFlow 
            // initial nodes and edges
            nodes={nodes} 
            edges={edges}
            // Handling Change Event
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            // Handling Connect Event
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            onNodeClick={addNode}>
                <Background/>
                <Controls/>
            </ReactFlow>
        </div>
    );
}