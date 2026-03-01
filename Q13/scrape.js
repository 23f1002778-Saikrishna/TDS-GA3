const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let total = 0;

  for (let seed = 10; seed <= 19; seed++) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    await page.goto(url, { waitUntil: 'networkidle' });

    const numbers = await page.evaluate(() => {
      const cells = document.querySelectorAll('table td');
      return Array.from(cells).map(td => Number(td.innerText.trim())).filter(n => !isNaN(n));
    });

    const pageSum = numbers.reduce((a, b) => a + b, 0);
    console.log(`seed=${seed}: ${numbers.length} numbers, sum=${pageSum}`);
    total += pageSum;
  }

  console.log(`TOTAL SUM: ${total}`);
  await browser.close();
})();
