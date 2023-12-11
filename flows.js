require('dotenv').config();
const {
  clickText,
  signIntoIntegrationSite,
  signOut,
  login,
} = require('./shared');

const APPLICANT = 'APPLICANT';
const ADMIN = 'ADMIN';

async function findAGrant(page) {
  await signIntoIntegrationSite(page);
  await page.goto(process.env.BASE_URL);
  await clickText(page, 'Manage notifications and saved searches');
  await login(page, APPLICANT);
  await signOut(page);
}

async function applicant(page) {
  await signIntoIntegrationSite(page);
  await page.goto(process.env.APPLICANT_BASE_URL);
  await clickText(page, 'Sign in with GOV.UK One Login');
  await login(page, APPLICANT);
  await signOut(page);
}

async function admin(page) {
  await signIntoIntegrationSite(page);
  await page.goto(process.env.APPLICANT_BASE_URL);
  await clickText(page, 'Sign in with GOV.UK One Login');
  await login(page, ADMIN);
  await signOut(page);
}

module.exports = {
  findAGrant,
  admin,
  applicant,
};
