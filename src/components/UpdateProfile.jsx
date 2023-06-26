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
  
  export default function UpdateProfile() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const { currentUser, updateEmail, updatePassword } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
  
      function handleSubmit(e) {
          e.preventDefault()
  
          if (passwordRef.current.value !== confirmPasswordRef.current.value) {
              return setError("Passwords do not match")
          }

          const promises = []

          setLoading(true)
          setError("")

          if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value));
          }
          if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value));
          }

          Promise.all(promises).then(() => {
            navigate("/")
          }).catch (() => {
            setError("Failed to update account")
          }).finally(() => {
            setLoading(false)
          })
          
      }
  
    return (
      <>
        <Card variant="outlined" className="Signup">
          <CardContent>
            <Typography mb={2} variant="h2" component="h1">
              Update profile
            </Typography>
            {error && <Alert severity="warning" style={{marginBottom: "1rem"}}>{error}</Alert> }
            <form className="SignupForm">
              <TextField
                label="Email"
                variant="outlined"
                type="email"
                inputRef={emailRef}
                defaultValue={currentUser.email}
                fullWidth
                required
              />
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                inputRef={passwordRef}
                fullWidth
                helperText="Leave blank if you don't wanna change it"
              />
              <TextField
                label="Confirm Password"
                variant="outlined"
                type="password"
                inputRef={confirmPasswordRef}
                fullWidth
                helperText="Leave blank if you don't wanna change it"
              />
              <Button type="submit" variant="contained" size="large" onClick={handleSubmit} disabled={loading} fullWidth>
                Update
              </Button>
            </form>
          </CardContent>
        </Card>
        <Typography variant="caption" component="p" mt={1}>
            <Link to="/">Cancel</Link>
          </Typography>
      </>
    );
  }
  