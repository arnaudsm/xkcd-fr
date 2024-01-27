![Logo XKCD](public/logo.png)
# XKCD en français 
Traduit par Sophie, Phiip et Antoine de [lapin.org](https://lapin.org), puis repris et hébergé par [Arnaudsm](https://arnaud.at).

Disponible sur [xkcd.arnaud.at](https://xkcd.arnaud.at)

N'hésitez pas à contribuer aux traductions à partir du numéro 500 !

# Contribuez à la traduction
Si vous ne connaissez pas bien GitHub et les technologies web, envoyez-moi vos traductions à [arnaud.desaintmeloir@gmail.com](arnaud.desaintmeloir@gmail.com).

500 comics ont été scrapés sur l'ancien site disparu de [lapin.org](https://lapin.org) avec [Wayback Machine](https://web.archive.org/). Le code est disponible dans [scraper/index.js]([./scraper/index.js])

Le format est le suivant : 
- `public/comics/[numero].jpg` pour la photo
- `scraper/metadata/[numero].json` pour les métadonnées de titre et alt-text.

Le format des meta-données est le suivant
```json
{"t":"Titre","a":"Sous-titre (balise title de l'image)"}
```

# Développement
- `npm` et `yarn` sont pré-requis
- `yarn` pour installer les dépendances
- `yarn dev` pour lancer le server local
