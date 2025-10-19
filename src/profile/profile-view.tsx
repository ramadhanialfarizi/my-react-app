import { useLocation, useNavigate } from "react-router-dom";

function ProfileView() {
    const navigate = useNavigate();
    const location = useLocation();

    const data = location.state;
    
    function gobackToMainPage() {
        navigate(-1);
    }
    
    return (
        <div>
            <h1>You're Profile</h1>
            <p>Welcome {data?.username}</p>
            <p>Your live on {data?.city}</p>
            <p>this is your nation {data?.country}</p>
             <button onClick={() => gobackToMainPage()}>
                back to main page
            </button>
        </div>
    );
}

export default ProfileView;