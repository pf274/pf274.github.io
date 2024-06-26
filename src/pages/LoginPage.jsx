import { Button, TextField, Typography } from "@mui/material";
import { Page } from "../components/Page";
import { ResumeCard } from "../components/ResumeCard";
import { useState } from "react";
import { authenticate } from "../gistHelper";
import { useResumeContext } from "../contexts/ResumeContext";

export function LoginPage() {
  const { setPage, setAuthToken } = useResumeContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  function handleLogin() {
    const authToken = authenticate(username, password);
    if (authToken) {
      localStorage.setItem("authToken", authToken);
      setAuthToken(authToken);
      setPage("info");
    } else {
      setError(true);
    }
  }
  return (
    <Page>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
        <ResumeCard>
          <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
            <Typography sx={{ textAlign: "center" }} variant="h5">
              Login
            </Typography>
            <form style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
              <TextField
                id="username"
                name="username"
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                  setError(false);
                }}
                placeholder="Username"
                autoComplete="off"
              />
              <TextField
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError(false);
                }}
                placeholder="Password"
                autoComplete="off"
              />
            </form>
            {error && (
              <Typography sx={{ textAlign: "center" }} color="error">
                Invalid username or password
              </Typography>
            )}
            <Button onClick={handleLogin}>Login</Button>
          </div>
        </ResumeCard>
      </div>
    </Page>
  );
}
