import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DrawerMenu from "../../components/DrawerMenu";
import { wHistory, getWallet } from "../../api/api";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

type WalletType = {
  id: number;
  wallet_id: number;
  type: string;
  amount: number;
  description: string;
  created_at: string;
};

const Wallet: React.FC = () => {
  const [walletData, setWalletData] = useState<WalletType[]>([]);
  const [walletBalance, setWalletBalance] = useState<string | number | null>(null);
  const navigate = useNavigate();

  const WH = async (token: string) => {
    try {
      const dataWH = await wHistory(token);
      setWalletData(dataWH.transactionHistory || []);

      const balanceData = await getWallet(token);
      setWalletBalance(balanceData?.balance ?? 0);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    WH(token);
  }, []);

  return (
    <div>
      <DrawerMenu />
      <h1 style={{ color: "white" }}>Wallet</h1>
      <p> Wallet history</p>

      <TableContainer component={Paper} style={{ backgroundColor: "#202020" }}>
        <Table sx={{ minWidth: 650 }} aria-label="wallet table">
          <TableHead>
            <TableRow sx={{ borderBottom: "2px solid black" }}>
              <TableCell align="center" sx={{ color: "white", borderColor: "black" }}>
                Amount
              </TableCell>
              <TableCell align="center" sx={{ color: "white", borderColor: "black" }}>
                Description
              </TableCell>
              <TableCell align="center" sx={{ color: "white", borderColor: "black" }}>
                Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {walletData.map((item) => (
              <TableRow
                key={item.id}
                sx={{
                  borderBottom: "1px solid black",
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell
                  align="center"
                  sx={{
                    color: item.amount < 0 ? "red" : "lightgreen",
                    borderColor: "black",
                  }}
                >
                  {item.amount}
                </TableCell>
                <TableCell align="center" sx={{ color: "white", borderColor: "black" }}>
                  {item.description}
                </TableCell>
                <TableCell align="center" sx={{ color: "white", borderColor: "black" }}>
                  {new Date(item.created_at).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <p style={{ color: "white", marginTop: "1rem", textAlign: "right", paddingRight: 40}}> 
        Total amount : {" "}
        <span style={{ color: Number(walletBalance) < 0 ? "red" : "lightgreen" }}>
          {walletBalance}
        </span>
      </p>

      <button
        onClick={() => navigate("/home")}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#1976d2",
          color: "white",
          border: "none",
          borderRadius: "4px",
        }}
      >
        Go to Home
      </button>

        <button
        onClick={() => navigate("/home")}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#1976d2",
          color: "white",
          border: "none",
          borderRadius: "4px",
        }}
      >
        Add to wallet
      </button>
    </div>
  );
};

export default Wallet;