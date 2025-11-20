import { Route, Switch } from "wouter";
import Home from "./pages/home";
import Esempi from "./pages/Esempi";
import Categories from "./pages/categories";
import NotFound from "./pages/not-found";

function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/esempi" component={Esempi} />
      <Route path="/categories" component={Categories} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
