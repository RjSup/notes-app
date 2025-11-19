import { useNavigate } from "react-router-dom";

export default function Landing() {
    const navigate = useNavigate();
    return (
        <div>
            <h1>Welcome!</h1>
            <button onClick={() => navigate("/notes")}>Go to Notes</button>
        </div>
    );
}
