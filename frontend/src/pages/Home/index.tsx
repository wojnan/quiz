import React from "react"
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
    console.log("Home component rendered") 

    const navigate = useNavigate();

    return (
        <div>
            <h1>Home Page</h1>
            <p> something about</p>
            <p>login to start</p>
            <button onClick={() => navigate("/login")}>
                Go to Login
            </button>

        </div>
    );
};


export default Home