import "./App.css";
import Layout from "./components/layout";
import Routes from "./routes/Routes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter basename="">
      <Layout>
        <Routes />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
