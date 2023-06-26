import {
  Card,
  CardContent,
  Button,
  Typography,
  TextField,
  Link as MuiLink,
} from "@mui/material";
import "./Signup.css";
import { useRef } from "react";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  return (
    <>
      <Card variant="outlined" className="Signup">
        <CardContent>
          <Typography mb={2} variant="h2" component="h1">
            Sign Up
          </Typography>
          <form className="SignupForm">
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              ref={emailRef}
              fullWidth
              required
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              ref={passwordRef}
              fullWidth
              required
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              type="password"
              ref={confirmPasswordRef}
              fullWidth
              required
            />
            <Button type="submit" variant="contained" size="large" fullWidth>
              Sign Up
            </Button>
            <Typography variant="caption" component="p">
              Already have an account? <MuiLink href="#">Login</MuiLink>
            </Typography>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
