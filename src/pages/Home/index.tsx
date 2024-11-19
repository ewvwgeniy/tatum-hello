import preactLogo from "../../assets/tatum.jpeg";
import Form from "./components/form";
import "./style.css";

export function Home() {
  return (
    <div class="home">
      <a href="https://preactjs.com" target="_blank" rel="noreferrer">
        <img src={preactLogo} alt="Preact logo" height="160" width="160" />
      </a>
      <h1>Tatum Hello</h1>
      <Form />
    </div>
  );
}
