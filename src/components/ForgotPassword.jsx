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
  import { Link } from "react-router-dom"
  
  export default function ForgotPassword() {
    const emailRef = useRef();
    const { resetPassword } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
  
      async function handleSubmit(e) {
          e.preventDefault()
  
          try {
              setError("")
              setMessage("")
              setLoading(true)
              await resetPassword(emailRef.current.value)
              setMessage("Check your inbox for futher instructions")
          } catch {
              setError("Failed to reset a password")
          }
  
          setLoading(false)
          
      }
  
    return (
      <>
        <Card variant="outlined" className="Signup">
          <CardContent>
            <Typography mb={2} variant="h2" component="h1">
              Password Reset
            </Typography>
            {error && <Alert severity="warning" style={{marginBottom: "1rem"}}>{error}</Alert> }
            {message && <Alert severity="success" style={{marginBottom: "1rem"}}>{message}</Alert>}
            <form className="SignupForm" onSubmit={handleSubmit}>
              <TextField
                label="Email"
                variant="outlined"
                type="email"
                inputRef={emailRef}
                fullWidth
                required
              />
              <Button type="submit" variant="contained" size="large" disabled={loading} fullWidth>
                Reset password
              </Button>
            </form>
          </CardContent>
        </Card>
        <Typography variant="caption" component="p" mt={1}>
        Do not have an account? <Link to="/signup">Sign Up</Link>
      </Typography>
      </>
    );
  }
  