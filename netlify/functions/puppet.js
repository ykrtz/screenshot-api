import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';

chromium.setHeadlessMode = true;
chromium.setGraphicsMode = false;

export async function handler(event, context) {
  let address;
  try {
    // Extracting address from the POST request body
    address = JSON.parse(event.body).address;
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Bad request: No address provided" }),
    };
  }

  const url = `https://rugcheck.xyz/tokens/${address}`;

  try {
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: process.env.CHROME_EXECUTABLE_PATH || (await chromium.executablePath('/var/task/node_modules/@sparticuz/chromium/bin')),
    });

    const page = await browser.newPage();

    await page.goto(url);

    // Replace waitForSelector with a suitable one or a timeout
    await page.waitForSelector('body', { timeout: 5000 });

    // Taking a screenshot
    const screenshot = await page.screenshot({ encoding: 'base64' });

    await browser.close();

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'image/png' },
      body: screenshot,
      isBase64Encoded: true,
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
}
