import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const comicCount = 279;

function App() {
  const [number, setNumber] = useState(comicCount);
  const [metadata, setMetadata] = useState({});

  // Parse the URL at first load
  useEffect(() => {
    let newNumber = Number(window.location.pathname.slice(1)) || comicCount;
    openNumber(newNumber);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openNumber = async (newNumber) => {
    if (newNumber <= 0 || newNumber > comicCount) return false;
    try {
      const res = await fetch(`/comics/${newNumber}.json`);
      const json = await res.json();
      setMetadata(json);
    } catch (error) {
      console.log(error);
    }
    setNumber(newNumber);
    const href = `/${newNumber}`;
    window.history.pushState({}, window.title, href);
  };

  const Navbar = () => (
    <div className="nav">
      <div onClick={() => openNumber(1)}>{"|<"}</div>
      <div onClick={() => openNumber(number - 1)}>{"< Avant"}</div>
      <div
        onClick={() => {
          const randomNumber = Math.floor(Math.random() * comicCount) + 1;
          openNumber(randomNumber);
        }}
      >
        {"Aléatoire"}
      </div>
      <div onClick={() => openNumber(number + 1)}>{"Après >"}</div>
      <div onClick={() => openNumber(comicCount)}>{">|"}</div>
    </div>
  );

  return (
    <>
      <div className="box header">
        <img src="logo.png" alt="Logo" />
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
        <h2>{metadata.t || "Comic Introuvable"}</h2>
        <Navbar />
        <img src={`comics/${number}.jpg`} title={metadata.a} />
        <Navbar />
        <div>
          Le strip original : <a href="">https://xkcd.com/{number}/</a>
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
  </React.StrictMode>
);
