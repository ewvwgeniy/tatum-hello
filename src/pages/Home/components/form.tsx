import { JSX } from "preact";
import { useState } from 'preact/hooks';

import { Network, TatumSDK, Ethereum } from "@tatumio/tatum";

import './style.css';

import { API_KEY_V4 } from "../../../api/const";

function Form() {
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [balance, setBalance] = useState("");

    const handleButtonClick = async () => {
        setLoading(true);
        setError(null);
        setBalance(null);
        try {
            const tatum = await TatumSDK.init<Ethereum>({
                network: Network.ETHEREUM,
                apiKey: { v4: API_KEY_V4 },
            });
            const bal = await tatum.address.getBalance({
                addresses: [address],
            });

            if (!bal?.data?.[0]) {
                const err = bal?.error.message[0];
                setError(err.toString() || "Unknown error");
            } else {
                const balanceData = bal.data.filter(
                    (asset) => asset.asset === "ETH"
                )[0];
                setBalance(balanceData.balance);
            }
            await tatum.destroy();
        } catch (e) {
            setError(JSON.stringify(e));
        }

        setLoading(false);
    }

  const onInputChange: JSX.GenericEventHandler<HTMLInputElement> = (e) => {
      if (e.target instanceof HTMLInputElement) {
          setAddress(e.target.value.trim());
      }
  }

  return (
    <div>
      <p>
        <input
          type="text"
          value={address}
          onInput={onInputChange}
          class="form__input"
        />
      </p>
      <button onClick={handleButtonClick} class="form__button">
        Click Me
      </button>
      <p class={`form__balance-label ${error && "form__balance-label_error"}`}>
          {loading && "Loading..."}
          {balance && `Balance: ${balance} ETH`}
          {error && <>{error}</>}
      </p>
    </div>
  );
}

export default Form;
