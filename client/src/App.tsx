import { Switch, Route } from "wouter";
import Quiz from "./pages/Quiz";

function App() {
  return (
    <Switch>
      <Route path="/" component={Quiz} />
    </Switch>
  );
}

export default App;