import React from "react"
import { useNavigate } from "react-router-dom"
import DrawerMenu from "../../components/DrawerMenu";
const Home: React.FC = () => {
    console.log("Home component rendered") 

    const navigate = useNavigate();

    return (
        <div>
            <DrawerMenu />
            <h1>Home Page</h1>
            <p> something about</p>
            <button onClick={() => navigate("/quiz")}>
                Go to Quiz
            </button>

        </div>
    );
};


export default Home