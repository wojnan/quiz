import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import DrawerMenu from "../../components/DrawerMenu";
import { wHistory } from "../../api/api";

const Wallet: React.FC = () => {
    console.log("Wallet component rendered") 
    const [walletData, setWalletData] = useState<any>();

    const navigate = useNavigate();
    const WH = async(token:string)=>{
        try{
            const dataWH = await wHistory(token);
            setWalletData(dataWH);
            console.log(dataWH);

        }
        catch(error){
            console.log(error);
        
        }
    }
    useEffect(()=> {
        const token = localStorage.getItem("token");
        if(!token) {
            return;
        }
        WH(token);
    
    },[])

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