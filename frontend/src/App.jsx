import { CSSReset, ColorModeProvider, ThemeProvider, theme } from "@chakra-ui/react";
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import router from "./routes/Router";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
        <RouterProvider router={router} />
        <ToastContainer />
      </ColorModeProvider>
    </ThemeProvider>
  );
}