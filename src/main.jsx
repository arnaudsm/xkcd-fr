/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import comics from "./comics";

const numbers = Object.keys(comics);
const defaultNumber = 470;

function App() {
  const [number, setNumber] = useState(defaultNumber);
  const [title, subTitle] = comics[number] || [];
  const previousNumber =
    numbers[numbers.indexOf(number?.toString()) - 1] || numbers.at(-1);
  const nextNumber =
    numbers[numbers.indexOf(number?.toString()) + 1] || numbers.at(-1);

  const onLoad = () => {
    const path = window.location.pathname;
    let newNumber = defaultNumber;
    if (!["/", ""].includes(path) && !isNaN(Number(path.slice(1)))) {
      newNumber = Number(path.slice(1));
    }
    openNumber(newNumber, { noStatePush: true });
  };

  useEffect(() => {
    // Parse the URL at first load
    onLoad();

    // Handle history changes
    window.addEventListener("popstate", onLoad);
    return () => {
      window.removeEventListener("popstate", onLoad);
    };
  }, []);

  const openNumber = async (newNumber, { noStatePush } = {}) => {
    setNumber(newNumber);
    if (noStatePush) return;
    window.history.pushState({}, window.title, `/${newNumber}`);
  };

  const Navbar = () => (
    <div className="nav">
      <div onClick={() => openNumber(numbers[0])}>{"|<"}</div>
      <div onClick={() => openNumber(previousNumber)}>{"< Avant"}</div>
      <div
        onClick={() => {
          const randomNumber =
            numbers[Math.floor(Math.random() * numbers.length)];
          openNumber(randomNumber);
        }}
      >
        {"Aléatoire"}
      </div>
      <div onClick={() => openNumber(nextNumber)}>{"Après >"}</div>
      <div onClick={() => openNumber(numbers.at(-1))}>{">|"}</div>
    </div>
  );

  return (
    <>
      <div className="box header">
        <a href="/">
          <img src="logo.png" alt="Logo" />
        </a>
        <div>
          <div className="slogan">
            Webcomic sarcastique qui parle de romance, de maths et de langage,
            par Randall Munroe.
          </div>
          <div>
            Traduit de <a href="https://xkcd.com">xkcd.com</a>
          </div>
        </div>
      </div>
      <div className="box comic">
        <h2>{title || "Comic Introuvable"}</h2>
        <Navbar />
        <img src={`comics/${number}.jpg`} title={subTitle} />
        {!title && (
          <div>
            {"Aidez-nous à le traduire sur "}
            <a href="https://github.com/arnaudsm/xkcd-fr">github</a>
          </div>
        )}
        <Navbar />
        <div>
          {"Le strip original : "}
          <a href={`https://xkcd.com/${number}/`}>https://xkcd.com/{number}/</a>
        </div>
      </div>

      <div className="box">
        <div className="footer">
          <div>
            {"Traduit par Sophie, Phiip et Antoine de "}
            <a href="https://www.lapin.org/">Lapin.org</a>,<br />
            puis repris et hébergé par <a href="https://arnaud.at">Arnaudsm</a>.
          </div>
          <div>
            {"Contribuez à sa traduction sur "}
            <a href="https://github.com/arnaudsm/xkcd-fr">github</a> !
          </div>
          <div className="footnote">
            {`xkcd.com est optimisé pour Netscape 4.0 ou inférieur sur un Pentium 3±1 émulé en Javascript sur un Apple IIGS à une résolution d'écran de 1024x1. Veuillez activer vos bloqueurs de publicités, désactiver le séchage à haute température, et retirer votre appareil du Mode Avion pour le mettre en Mode Bateau. Pour des raisons de sécurité, veuillez laisser le verrouillage majuscule activé pendant la navigation.`}
          </div>
          <br />
          <div>
            {"Ce travail est proposé sous une licence "}
            <a href="https://creativecommons.org/licenses/by-nc/2.5/">
              {"Créative Commons Attribution-NonCommercial 2.5"}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
