import { ReactFlow, Background, Controls, applyEdgeChanges, applyNodeChanges, addEdge} from "@xyflow/react";
import {useState, useCallback} from "react";

import '@xyflow/react/dist/style.css';
import { TextUpdaterNote } from "./component/text-updater-note";

const initialNodes = [
    {
        id: 'n1',
        position: { x: 0, y: 0 },
        data: { label: 'Node 1' },
        type: 'input',
    }, 
    {
        id: 'n2',
        position: { x: 100, y: 100 },
        data: { label: 'Node 2' },
    },
    {
        id: 'n3',
        type: 'textUpdater',
        position: { x: 100, y: 200 },
        data: { value: 123 },
    }
]

const nodeTypes = {
    textUpdater: TextUpdaterNote,
}

const initialEdges = [
    {
        id: 'n1-n2',
        source: 'n1',
        target: 'n2',
        type: 'step',
        label: 'connect',
    },
    {
        id: 'n2-n3',
        source: 'n2',
        target: 'n3',
        type: 'step',
        label: 'connect',
    },
]

export default function FlowComponent() {

    // Handling Change Event
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);
    const onNodesChange = useCallback((changes: any) => setNodes((nodeSnapshot)=> applyNodeChanges(changes, nodeSnapshot)), [])
    const onEdgesChange = useCallback((changes: any) => setEdges((edgeSnapshot) => applyEdgeChanges(changes, edgeSnapshot)), [])

    // Handling Connect Event
    const onConnect = useCallback((params: any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),[],); 

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
            fitView>
                <Background/>
                <Controls/>
            </ReactFlow>
        </div>
    );
}