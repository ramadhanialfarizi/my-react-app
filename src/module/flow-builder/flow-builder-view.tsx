import { useNavigate } from "react-router-dom";
import FlowComponent from "./research-two/flow-component";
import FlowBuilderResearch from "./research/flow-builder-research";
import FlowBuilderParent from "./research/flow-builder-parent";

function FlowBuilderComponent() {
    const navigate = useNavigate();

    function gobackToMainPage() {
        navigate(-1);
    }

    return (
        <div>
            {/* <h1>Flow Builder View</h1>
            <button onClick={() => gobackToMainPage()}>
                back to main page
            </button> */}

            {/* <FlowComponent /> */}

            <FlowComponent/>

            {/* <FlowBuilderResearch/> */}

            {/* <FlowBuilderParent/> */}
        </div>
    );    
}

export default FlowBuilderComponent;