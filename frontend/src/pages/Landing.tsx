import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Landing() {
    const navigate = useNavigate();
    return (
        <div>
            <Navbar />
            <h1>Welcome!</h1>
        </div>
    );
}
