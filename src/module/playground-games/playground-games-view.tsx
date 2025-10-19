import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllEvent } from "../../services/services";
import { ENDPOINTS } from "../../services/endpoints";
import { Card, CardActionArea, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";

function PlaygroundGamesViews() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [event, setCharacters] = useState<Array<any>>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);

        async function fetchCharacters() {
           try {
            const data = await getAllEvent(ENDPOINTS.GET_ALLL_EVENTS);
            setCharacters(data);
            setLoading(false);
           } catch (error) {
            setError("Failed to fetch characters");
            setLoading(false);

            console.error("Error fetching characters:", error);
           }
        }

        fetchCharacters();
    }, []);

    function gobackToMainPage() {
        navigate(-1);
    }

    function goToDetailEvent(id: string) {
        console.log("Navigating to detail event with ID:", id);
    }


    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Playground Games View</h1>
             <button onClick={() => gobackToMainPage()}>
                back to main page
            </button>

            <div className="grid-container" style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "16px",
                padding: "20px",
            }}>
                {event.map((event) => (
                    <CardActionArea onClick={() => goToDetailEvent(event.id)} key={event.id}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardHeader
                            title={event.name}
                            subheader={event.beginTime}/>     
                            <CardMedia
                                component="img"
                                height="194"
                                image={event.imageLogo}
                                alt={event.name}
                                sx={{ height: 200, objectFit: "cover" }}
                            />
                            <CardContent>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {event.summary}
                                </Typography>
                            </CardContent>
                        </Card>
                    </CardActionArea>                        
                ))}
            </div>
        </div>
    );  
}

export default PlaygroundGamesViews;