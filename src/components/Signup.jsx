import {
  Card,
  CardContent,
  Button,
  Typography,
  TextField,
  Alert
} from "@mui/material";
import "./Signup.css";
import { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            return setError("Passwords do not match")
        }

        try {
            setError("");
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            navigate("/");
        } catch {
            setError("Failed to create an account")
        }

        setLoading(false)
        
    }

  return (
    <>
      <Card variant="outlined" className="Signup">
        <CardContent>
          <Typography mb={2} variant="h2" component="h1">
            Sign Up
          </Typography>
          {error && <Alert severity="warning" style={{marginBottom: "1rem"}}>{error}</Alert> }
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
            <TextField
              label="Confirm Password"
              variant="outlined"
              type="password"
              inputRef={confirmPasswordRef}
              fullWidth
              required
            />
            <Button type="submit" variant="contained" size="large" disabled={loading} fullWidth>
              Sign Up
            </Button>
          </form>
        </CardContent>
      </Card>
      <Typography variant="caption" component="p" mt={1}>
              Already have an account? <Link to="/login">Login</Link>
        </Typography>
    </>
  );
}
