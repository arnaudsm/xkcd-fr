import puppeteer from "puppeteer";
import fs from "fs";
import axios from "axios";
import { pRateLimit } from "p-ratelimit";

// Scrape the old translations from the defunct xkcd.lapin.org

const outputDir = "../public/comics"

const limit = pRateLimit({
  interval: 60 * 1000,
  rate: 60,
  concurrency: 1,
});

const download_image = (url, image_path) =>
  axios({
    url,
    responseType: "stream",
  }).then(
    (response) =>
      new Promise((resolve, reject) => {
        response.data
          .pipe(fs.createWriteStream(image_path))
          .on("finish", () => resolve())
          .on("error", (e) => reject(e));
      })
  );

const main = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  page.setDefaultNavigationTimeout(60 * 1000);
  await page.setRequestInterception(true);

  // Skip images to load faster and save archive.org some bandwidth
  page.on("request", (req) => {
    if (req.resourceType() === "image") {
      req.abort();
    } else {
      req.continue();
    }
  });

  const getComic = async (number) => {
    try {
      const metaFile = `${outputDir}/${number}.json`;
      const imageFile = `${outputDir}/${number}.jpg`;

      if (fs.existsSync(metaFile) && fs.existsSync(imageFile)) return;

      const url = `https://web.archive.org/web/20200618173726/https://xkcd.lapin.org/index.php?number=${number}#strips`;
      await page.goto(url);
      const data = await page.evaluate(() => ({
        title: document.querySelector("#content>.bd>.c>.s h2").innerText,
        alt: document.querySelector("#content>.bd>.c>.s> div:not(.buttons) img")
          .alt,
        img_src: document.querySelector(
          "#content>.bd>.c>.s> div:not(.buttons) img"
        ).currentSrc,
      }));
      await download_image(data.img_src, imageFile);

      fs.writeFileSync(
        metaFile,
        JSON.stringify({ t: data.title, a: data.alt })
      );
      console.log("FINISHED", number);
    } catch (error) {
      console.log("ERROR at", number, error);
    }
  };

  const numbers = [...Array(981).keys()].map((x) => x + 1);
  for (const number of numbers) await limit(() => getComic(number));
  await browser.close();
};

main();
