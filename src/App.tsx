import styled, { ThemeProvider } from "styled-components";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { generateTheme } from "./theme";
import { Mode } from "./types";

function App() {
  const mode = useSelector((state: RootState) => state.mode) as Mode;
  const currentTheme = generateTheme(mode);

  return (
    <ThemeProvider theme={currentTheme}>
      <Root>
        <RouterProvider router={router} />
      </Root>
    </ThemeProvider>
  );
}

const Root = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: ${(p) => p.theme.primary};
  transition: background-color 0.3s, transform 0.3s;
`;

export default App;
