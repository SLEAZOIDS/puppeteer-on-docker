var config = require('config');
console.log("NODE_ENV=%s", process.env.NODE_ENV);
console.log(JSON.stringify(config));

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });
  const page = await browser.newPage();
  await page.goto(config.url);

  // basic認証
  await page.setExtraHTTPHeaders({
    Authorization: `Basic ${new Buffer(`${config.basic_auth_user}:${config.basic_auth_password}`).toString('base64')}`
  });

  await console.log('access');
  await page.screenshot({path: 'png/access.png', fullPage: true});

  browser.close();
})();
