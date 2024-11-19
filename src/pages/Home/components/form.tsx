// App.js
import { JSX } from "preact";
import { useState } from 'preact/hooks';

import { Network, TatumSDK, Ethereum } from "@tatumio/tatum";

import './style.css';

import { API_KEY_V4 } from "../../../api/const";

function Form() {
  const [inputValue, setInputValue] = useState(""); // State to hold the input value
  const [labelText, setLabelText] = useState(""); // State to hold the label text

  const handleButtonClick = async () => {
      try {
          const tatum = await TatumSDK.init<Ethereum>({
              network: Network.ETHEREUM,
              apiKey: { v4: API_KEY_V4 },
              verbose: true,
          });
          const balance = await tatum.address.getBalance({
              addresses: [inputValue],
          });
          console.log(balance);
          const balanceData = balance.data.filter(
              (asset) => asset.asset === "ETH"
          )[0];

          setLabelText(`Balance: ${balanceData.balance}`);
      } catch (error) {
          console.error("Error fetching balance:", error);
          setLabelText("Error while fetching balance");
      }
  };

  const onInputChange: JSX.GenericEventHandler<HTMLInputElement> = (e) => {
      if (e.target instanceof HTMLInputElement) {
          setInputValue(e.target.value.trim());
      }
  }

  return (
    <div>
      <p>
        <input
          type="text"
          value={inputValue}
          onChange={onInputChange}
          class="form__input"
        />
      </p>
      <button onClick={handleButtonClick} class="form__button">
        Click Me
      </button>
      <p class="form__balance-label">
        {labelText}
      </p>
    </div>
  );
}

export default Form;
