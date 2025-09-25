import React, { useRef, useState, type FormEvent } from "react";
import { TextField, Button, Box, Typography, Alert, Paper } from "@mui/material";
import { useAuth } from "../context/auth/AuthContext";
import type { IRegisterForm } from "../types/Auth";
import Joi from "joi";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../context/loading/LoadingContext";

const RegisterPage = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [validationErrors, setValidationErrors] = useState<{ msg: string; path: string | number }[]>([]);
  const [generalErrors, setGeneralErrors] = useState<string[]>([]);

  const navigate = useNavigate();
  const { register } = useAuth();
  const { setIsLoading } = useLoading();

  const registerSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(100).required().messages({
      "string.min": "Name must have at least 3 characters",
      "string.max": "Name cannot exceed 100 characters",
      "string.empty": "Name is required",
    }),
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
      "string.email": "Please provide a valid email address",
      "string.empty": "Email is required",
    }),
    password: Joi.string().min(3).required().messages({
      "string.min": "Password must have at least 3 characters",
      "string.empty": "Password is required",
    }),
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!nameRef.current || !emailRef.current || !passwordRef.current) {
      setGeneralErrors(["Something went wrong when getting input values"]);
      return;
    }

    const formData: IRegisterForm = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    const { error } = registerSchema.validate(formData, { abortEarly: false });

    setValidationErrors([]);
    if (error?.details) {
      setValidationErrors(error.details.map((err) => ({ msg: err.message, path: err.path[0] })));
      return;
    }

    setIsLoading(true);
    const result = await register(formData);
    setIsLoading(false);

    if (result != null) {
      setGeneralErrors([...result]);
      return;
    }

    setGeneralErrors([]);
    navigate("/");
  };

  const foundErrorMsg = (path: string) => validationErrors.find((err) => err.path === path)?.msg;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        bgcolor: "#f5f5f5", // light grey background
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: { xs: 3, sm: 5 },
          maxWidth: 500,
          width: "100%",
          borderRadius: 3,
          bgcolor: "#ffffff", // white form card
        }}
      >
        {generalErrors.length > 0 && (
          <Alert severity="error" sx={{ width: "100%", mb: 2, border: "1px solid #FF8488" }}>
            <ul style={{ margin: 0, paddingLeft: "1.25rem" }}>
              {generalErrors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </Alert>
        )}

        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 3, textAlign: "center", color: "#37353E" }}>
          Register
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            inputRef={nameRef}
            label="Name"
            name="name"
            fullWidth
            variant="outlined"
            color="primary"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
          {foundErrorMsg("name") && (
            <Typography variant="body2" color="error" sx={{ pl: 1 }}>
              {foundErrorMsg("name")}
            </Typography>
          )}

          <TextField
            inputRef={emailRef}
            label="Email"
            type="email"
            name="email"
            fullWidth
            variant="outlined"
            color="primary"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
          />
          {foundErrorMsg("email") && (
            <Typography variant="body2" color="error" sx={{ pl: 1 }}>
              {foundErrorMsg("email")}
            </Typography>
          )}

          <TextField
            inputRef={passwordRef}
            label="Password"
            type="password"
            name="password"
            fullWidth
            variant="outlined"
            color="primary"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
          />
          {foundErrorMsg("password") && (
            <Typography variant="body2" color="error" sx={{ pl: 1 }}>
              {foundErrorMsg("password")}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 1,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              textTransform: "none",
              backgroundColor: "#1976d2",
              "&:hover": { backgroundColor: "#115293" },
            }}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default RegisterPage;
