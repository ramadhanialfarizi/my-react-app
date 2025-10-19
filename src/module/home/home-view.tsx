import { useNavigate } from "react-router-dom";

function HomeView() {
    const navigate = useNavigate();

    function gobackToMainPage() {
        navigate(-1);
    }

  return (
        <div>
            <h1>Home View</h1>
             <button onClick={() => gobackToMainPage()}>
                back to main page
            </button>
        </div>
    );
}

export default HomeView;