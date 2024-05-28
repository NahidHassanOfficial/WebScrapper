let puppeteer = require("puppeteer");

async function resultUrlScan(page) {
  await page.waitForNavigation({ waitUntil: "networkidle2" });

  let resultUrls = page.evaluate(function () {
    let anchorWithBreak = document.querySelectorAll("a:has(br)");
    let urls = [];
    for (let anchor of anchorWithBreak) {
      if (anchor.hasAttribute("href")) {
        let titleTag = anchor.querySelector("h3");
        let title = titleTag.innerText;
        let url = anchor.getAttribute("href");
        urls.push({ Title: title, Url: url });
      }
    }
    return urls;
  });
  return resultUrls;
}

async function webScrap(query) {
  let browser = await puppeteer.launch();
  let page = await browser.newPage();
  let url = `https://www.google.com/search?q=${query}`;

  await page.goto(url, { waitUntil: "networkidle2" });
  let resulUrls = await resultUrlScan(page);
  console.log(resulUrls);
  await browser.close();
}

webScrap("Bangladesh");
