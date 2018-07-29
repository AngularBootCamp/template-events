import { browser, $, by, element } from 'protractor';

import { checkConsole, indexPath } from '../../e2e-kit';

const appPath = indexPath(__dirname);

// const message = $('[e2e=clock-message]');
// consider the above as an alternative to further decouple presentation
// from e2e mechanics
const message = $('b');
const workHours = $('.time-block + div');
const clockInButton = element(by.cssContainingText('button', 'Clock In'));
const clockOutButton = element(by.cssContainingText('button', 'Clock Out'));
const dayThree = by.css('.day-3');
const dayTwo = by.css('.day-2');

describe(appPath, async () => {

  beforeAll(async () => {
    await browser.waitForAngularEnabled(true);
    await browser.get(appPath);
  });

  it('should load without error', async () => {
    expect(await checkConsole()).toEqual('');
  });

  it('should instruct the user to clock in', async () => {
    expect(await message.getText()).toBe('Please Clock In');
  });

  it('should clock in', async () => {
    await clockInButton.click();
    expect(await message.getText()).toBe('Clocked in as employee');
  });

  it('should clock out', async () => {
    await clockOutButton.click();
    expect(await message.getText()).toBe('Have a nice day!');
  });

  it('should hover over schedule', async () => {
    await browser.actions()
      .mouseMove(browser.findElement(dayThree)) // moves mouse away
      .mouseMove(browser.findElement(dayTwo))
      .perform();

    expect(await workHours.getText()).toBe('9:00 - 3:00');
  });
});
