import { useNavigate } from "react-router-dom";

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
        </div>
    );    
}

export default FlowBuilderComponent;