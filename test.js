const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Next.js website', function () {
  this.timeout(30000); // Increase timeout if necessary
  
  let driver;

  before(async function () {
    // Initialize the WebDriver
    driver = await new Builder().forBrowser('chrome').build();
  });

  it('should display search results for "Pizza"', async function () {
    try {
      // Open the Next.js website
      await driver.get('https://nextjs.org');

      // Find and interact with elements
      let searchBox = await driver.findElement(By.id('search-box'));
      await searchBox.sendKeys('Pizza', Key.RETURN);

      // Wait for search results to load
      await driver.wait(until.elementLocated(By.className('recipe')), 5000);

      // Assert that search results are displayed correctly
      let searchResults = await driver.findElements(By.className('recipe'));
      assert(searchResults.length > 0, 'No search results found');
    } catch (error) {
      console.error(error);
      throw error;
    }
  });

  after(async function () {
    // Close the WebDriver
    setTimeout(async () => {
      await driver.quit();
    }, 10000); // 10 seconds delay
  });
});
