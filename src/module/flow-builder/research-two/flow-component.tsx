import { ReactFlow, Background, Controls, applyEdgeChanges, applyNodeChanges, addEdge} from "@xyflow/react";
import {useState, useCallback} from "react";

import '@xyflow/react/dist/style.css';
import { TextUpdaterNote } from "./component/text-updater-note";

// generate uid package
import { v4 as uuidv4 } from 'uuid';
import CardNode from "./component/card-component";

let initialNodes = [
    // {
    //     id: 'n1',
    //     position: { x: 0, y: 0 },
    //     data: { label: 'Node 1' },
    //     type: 'input',
    // }, 
    {
        id: 'n1',
        fromId: "n0",
        position: { x: 0, y: 0 },
        data: { label: 'Node 1' },
        type: 'card',
    }, 
]

// const nodeTypes = {
//     textUpdater: TextUpdaterNote,
// }
const nodeTypes = {
   card: CardNode,
}

// let nodeId: string = "";
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

    function handleChange(event: any, nodeData: any) {
       const newValue = event.target.value
       console.log("value : ", newValue);
    }


    function addNode(event: any, node: any) {
        console.log('node id', node.id);

        const parentNode = nodes.find((n) => n.id === node.id);
        if (!parentNode) return;

        let uniqueId = uuidv4();
        let targetNodeId = `node-${uniqueId}`;
        let edgeId = `edge-${uniqueId}`;

        const newNode = {
            id: targetNodeId,
            fromId: parentNode.id,
            position: { x: parentNode.position.x + 150, y: parentNode.position.y + 100 },
            data: { label: `New Node ${targetNodeId}` },
            type: 'card',
        };

        const newEdge = {
            id: edgeId,
            source: parentNode.id,
            target: targetNodeId,
            type: 'step',
            label: 'connect',
        };

        setNodes((previousNodes) => [...previousNodes, newNode]);
        setEdges((previousEdges) => [...previousEdges, newEdge]);

        // nodeId = targetNodeId;

        console.log('added node:', nodes);
        console.log('added edge:', edges);

    }

    function deleteNode(event: any, node: any) {
        console.log('node id', node.id);

        setNodes((prevNodes) => {
            const parentNode = prevNodes.find((n) => n.id === node.id);
            if (!parentNode) return prevNodes;

            function removeNodeAndChildren(nodeId: string, nodesList: any[]): any[] {
            const remaining = nodesList.filter((n) => n.id !== nodeId);
            const childNodes = nodesList.filter((n) => n.fromId === nodeId);

            let result = [...remaining];
            for (const child of childNodes) {
                result = removeNodeAndChildren(child.id, result);
            }
            return result;
            }

            return removeNodeAndChildren(parentNode.id, prevNodes);
        });

        setEdges((prevEdges) =>
            prevEdges.filter(
            (e) => e.source !== node.id && e.target !== node.id
            )
        );

        console.log('added node:', nodes);
        console.log('added edge:', edges);
    }

    return (
        <div style={{ height: '100vh', width: '100vw',}}>
            <ReactFlow 
            // initial nodes and edges
            // nodes={nodes}
            nodes={nodes.map((n) => ({
                ...n,
                data: {
                ...n.data,
                onAdd: addNode,
                onDelete: deleteNode,
                onChange: handleChange,
                },
            }))} 
            edges={edges}
            // Handling Change Event
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            // Handling Connect Event
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            // onNodeClick={addNode}
            
            >
                <Background/>
                <Controls/>
            </ReactFlow>
        </div>
    );
}