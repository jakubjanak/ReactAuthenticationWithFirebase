import { Card, Typography, Button, CardContent, Alert } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleClick() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <Card variant="outlined" style={{ padding: "1rem 1rem" }}>
        <CardContent>
          <Typography variant="h2" component="h1" mb={2}>
            Profile
          </Typography>
          {error && (
            <Alert severity="warning" style={{ marginBottom: "1rem" }}>
              {error}
            </Alert>
          )}
          <strong>Email: </strong>
          {currentUser.email}
          <Button variant="contained" style={{ marginTop: "0.5rem" }} fullWidth>
            <Link
              to="/update-profile"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Update
            </Link>
          </Button>
        </CardContent>
      </Card>
      <Button variant="text" size="large" onClick={handleClick}>
        Log Out
      </Button>
    </>
  );
}
