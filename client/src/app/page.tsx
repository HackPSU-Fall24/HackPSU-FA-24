// src/pages/index.tsx

import ThemeContainer from "./contexts/theme/ThemeContainer";
import Login from "./Login";

export default function Home() {
  return (
    <ThemeContainer>
      <Login />
    </ThemeContainer>
  );
}
