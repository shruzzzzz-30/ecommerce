import Container from "@mui/material/Container";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { useLoading } from "../context/loading/LoadingContext";
import { LinearProgress, Box } from "@mui/material";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  const { isLoading } = useLoading();

  return (
    <>
      {/* Toast notifications */}
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />    //toast notification

      {/* Navbar */}          //calling navigation bar 
      <Navbar />    

      {/* Loading bar */}
      {isLoading && (
        <LinearProgress
          color="primary"
          sx={{
            height: 4,
            backgroundColor: "#e0e0e0",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#1976d2", 
            },
          }}
        />
      )}

      {/* Main container */}
      <Box
        component="main"
        sx={{
          minHeight: "calc(100vh - 64px)", 
          backgroundColor: "#f9f9f9",
          py: 5,
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            backgroundColor: "#fff",
            borderRadius: 3,
            boxShadow: 3,
            p: 3,
          }}
        >
          <Outlet />
        </Container>
      </Box>
    </>
  );
};

export default Layout;
