import { useNavigate } from "react-router-dom";
import FlowComponent from "./component/flow-diagram";

function FlowBuilderComponent() {
    const navigate = useNavigate();

    function gobackToMainPage() {
        navigate(-1);
    }

    return (
        <div>
            <h1>Flow Builder View</h1>
            <button onClick={() => gobackToMainPage()}>
                back to main page
            </button>

            {/* <FlowComponent /> */}

            <FlowComponent/>
        </div>
    );    
}

export default FlowBuilderComponent;