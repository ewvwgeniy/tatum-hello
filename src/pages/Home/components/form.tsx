// App.js
import { JSX } from "preact";
import { useState } from 'preact/hooks';

import { Network, TatumSDK, Ethereum } from "@tatumio/tatum";

import './style.css';

function Form() {
  const [inputValue, setInputValue] = useState(""); // State to hold the input value
  const [labelText, setLabelText] = useState(""); // State to hold the label text

  const handleButtonClick = async () => {
    const tatum = await TatumSDK.init<Ethereum>({
      network: Network.ETHEREUM,
      apiKey: { v4: "t-65ddbb2bb792d6001be685d9-442dd087e58442acac87f5f9" },
      verbose: true,
    });
    const balance = await tatum.address.getBalance({
      addresses: [inputValue],
    });
    const balanceData = balance.data.filter(
      (asset) => asset.asset === "ETH"
    )[0];

    setLabelText(`Balance: ${balanceData.balance}`);
  };

  const onInputChange: JSX.GenericEventHandler<HTMLInputElement> = (e) => {
      if (e.target instanceof HTMLInputElement) {
          setInputValue(e.target.value);
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
