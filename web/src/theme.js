import { createTheme } from "@mui/material";

const bbqTheme = createTheme({
  palette: {
    mode: "dark", // Enable dark mode
    primary: {
      main: "#d84315", // Burnt orange
      contrastText: "#ffffff", // White for text
    },
    secondary: {
      main: "#ffab40", // Warm yellow-orange accent
      contrastText: "#000000", // Black for contrast
    },
    background: {
      default: "#121212", // Dark charcoal
      paper: "#1e1e1e", // Slightly lighter charcoal
    },
    text: {
      primary: "#ffffff", // White text
      secondary: "#ffab40", // Yellow-orange for secondary text
    },
  },
  typography: {
    fontFamily: "'Raleway', 'Roboto', sans-serif", // Add a BBQ-inspired font
    h4: {
      fontWeight: 700,
      color: "#ffab40", // Warm accent for headings
    },
    body1: {
      color: "#ffffff", // Primary text color
    },
    button: {
      textTransform: "none", // Keep button text lowercase for a casual feel
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px", // Rounded buttons
          padding: "10px 20px", // Slightly larger padding for bold look
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.5)", // Subtle shadow
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e1e1e", // Slightly lighter charcoal
          padding: "20px",
          // borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.7)", // Subtle shadow
        },
      },
    },
  },
});

export default bbqTheme;
