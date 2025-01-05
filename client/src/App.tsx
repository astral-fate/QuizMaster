import { Switch, Route } from "wouter";
import Quiz from "./pages/Quiz";

// Get the base path from the environment or use "/" for local development
const base = import.meta.env.BASE_URL || "/";

function App() {
  // Use the base path in the route
  return (
    <Switch base={base}>
      <Route path="/" component={Quiz} />
    </Switch>
  );
}

export default App;