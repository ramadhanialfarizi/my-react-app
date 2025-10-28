import { Handle, Position } from "@xyflow/react";
import { useCallback } from "react";

export function TextUpdaterNote() {
    const onChange = useCallback((evt : any) => {
        console.log(evt.target.value)
    }, [])

    return (
        <div className="text-updater-note">
            <div>
                <label htmlFor="text">Text:</label>
                <input type="text" name="text" onChange={onChange} className="nodrag"/>
                <Handle type="source" position={Position.Top}/>
                <Handle type="target" position={Position.Right} id="A"/>
                <Handle type="target" position={Position.Bottom} id="B"/>
            </div>
        </div>
    )
}