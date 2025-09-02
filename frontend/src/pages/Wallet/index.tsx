import React from "react"
import { useNavigate } from "react-router-dom"
import DrawerMenu from "../../components/DrawerMenu";
const Wallet: React.FC = () => {
    console.log("Wallet component rendered") 

    const navigate = useNavigate();

    return (
        <div>
            <DrawerMenu />
            <h1>Wallet</h1>
            <p> something </p>
            <button onClick={() => navigate("/home")}>
                Go to Home
            </button>

        </div>
    );
};


export default Wallet