import SubmittedProducts from "../components/dashboard/SubmittedProducts";
import { useAuth } from "../context/AuthContext";
import { useState, useContext } from "react";

function Dashboard() {
  const { user } = useAuth();
  return <h1></h1>;
}

export default Dashboard;
