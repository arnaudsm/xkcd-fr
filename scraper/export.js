import fs from "fs";
import { metadataDir, jpgDir, totalComics } from "./index.js";

const jpgs = new Set(fs.readdirSync(jpgDir));
const metadatas = new Set(fs.readdirSync(metadataDir));

let comics = {};

for (let index = 0; index < totalComics; index++) {
  if (metadatas.has(`${index}.json`) && jpgs.has(`${index}.jpg`)) {
    const metadata = JSON.parse(
      fs.readFileSync(`${metadataDir}/${index}.json`),
    );
    comics[index] = [metadata.t, metadata.a];
  }
}

fs.writeFileSync(`../src/comics.json`, JSON.stringify(comics));
console.log("Master file written successfully");
console.log(Object.keys(comics).length, "comics");
