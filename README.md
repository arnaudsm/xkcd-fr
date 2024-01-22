![Logo XKCD](public/logo.png)
# XKCD en français 
Traduit par Sophie, Phiip et Antoine de [lapin.org](https://lapin.org), puis repris et hébergé par [Arnaudsm](https://arnaud.at).

Disponible sur [xkcd.arnaud.at](https://xkcd.arnaud.at)

N'hésitez pas à contribuer aux traductions à partir du numéro 500 !

# Format
Les 500 premiers comics ont été scrapés sur [lapin.org](https://lapin.org) avec [Wayback Machine](https://web.archive.org/). Le code est visible dans [scraper/index.js]([./scraper/index.js])

Le format est le suivant : 
- `public/comics/[numero].jpg` pour la photo
- `public/comics/[numero].json` pour les métadonnées de titre et alt-text.

# Développement
- `npm` et `yarn` sont pré-requis
- `yarn` pour installer les dépendances
- `yarn dev` pour lancer le server local
