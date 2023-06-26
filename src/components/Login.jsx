import {
  Card,
  CardContent,
  Button,
  Typography,
  TextField,
  Alert,
} from "@mui/material";
import "./Signup.css";
import { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  return (
    <>
      <Card variant="outlined" className="Signup">
        <CardContent>
          <Typography mb={2} variant="h2" component="h1">
            Log In
          </Typography>
          {error && (
            <Alert severity="warning" style={{ marginBottom: "1rem" }}>
              {error}
            </Alert>
          )}
          <form className="SignupForm" onSubmit={handleSubmit}>
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              inputRef={emailRef}
              fullWidth
              required
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              inputRef={passwordRef}
              fullWidth
              required
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              fullWidth
            >
              Log In
            </Button>
          </form>
          <Typography variant="caption" component="p" mt={1}>
            Forgot a password? <Link to="/forgot-password">Reset</Link>
          </Typography>
        </CardContent>
      </Card>
      <Typography variant="caption" component="p" mt={1}>
        Do not have an account? <Link to="/signup">Sign Up</Link>
      </Typography>
    </>
  );
}
