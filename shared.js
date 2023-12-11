const LOGIN_MAP = {
  INTEGRATION: {
    email: process.env.INTEGRATION_EMAIL,
    password: process.env.INTEGRATION_PASSWORD,
  },
  APPLICANT: {
    email: process.env.APPLICANT_EMAIL,
    password: process.env.APPLICANT_PASSWORD,
  },
  ADMIN: {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  },
};

async function clickText(page, text) {
  const selector = `text=${text}`;
  await page.waitForSelector(selector);
  await page.click(selector);
}

async function login(page, accountType) {
  await clickText(page, 'Continue to GOV.UK One Login');
  await clickText(page, 'Sign in');
  const { email, password } = LOGIN_MAP[accountType];
  await page.locator('[name="email"]').fill(email);
  await page.locator('Continue').click();
  await page.locator('[name="password"]').fill(password);
  await page.locator('Continue').click();
}

async function signOut(page) {
  await clickText(page, 'Sign out');
}

async function signIntoIntegrationSite(page) {
  require('dotenv').config();
  page.goto(process.env.BASE_URL);
  const { email, password } = LOGIN_MAP.INTEGRATION;

  page.goto(
    `https://${email}:${password}@${process.env.ONE_LOGIN_BASE_URL}/sign-in-or-create`,
  );
  page.goto(process.env.BASE_URL);
  page.locator('Reject analytics cookies').click();
}

module.exports = {
  clickText,
  signIntoIntegrationSite,
  signOut,
  login,
};
