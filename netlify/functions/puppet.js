import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';

chromium.setHeadlessMode = true;
chromium.setGraphicsMode = false;

export async function handler(event, context) {
  // Get the URL from the event object
  const pageToScreenshot = event.queryStringParameters.page;

  try {
    // Ensure the URL starts with 'https://'
    if (!pageToScreenshot.startsWith('https://')) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'URL must start with https://' }),
      };
    }

    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: process.env.CHROME_EXECUTABLE_PATH || (await chromium.executablePath('/var/task/node_modules/@sparticuz/chromium/bin')),
    });

    const page = await browser.newPage();
    await page.goto(pageToScreenshot);

    // Set the viewport size
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
    });

    // Take a screenshot
    const file = await page.screenshot({
      type: 'png',
    });

    await browser.close();

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'image/png' },
      body: file.toString('base64'),
      isBase64Encoded: true,
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Something went wrong' }),
    };
  }
}
