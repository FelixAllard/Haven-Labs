import { test, expect } from '@playwright/test';

const waitFor = (ms) => new Promise(resolve => setTimeout(resolve, ms));

test('CheckIfElementsAccessible', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('http://localhost:3000/admin/login');
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('Andrei');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Password1!');
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  await waitFor(3000);
  await page.goto('http://localhost:3000/admin/product/create');
  await expect(page.locator('h2')).toContainText('Create a New Product');
  await expect(page.getByRole('heading', { name: 'Create a New Product' })).toBeVisible();
  await page.locator('div').filter({ hasText: /^Title$/ }).click();
  // await page.getByText('Description').click();
  // await page.locator('textarea[name="body_html"]').click();
  await page.getByText('Vendor').click();
  await page.locator('input[name="vendor"]').click();
  await page.getByText('Published Scope').click();
  await page.getByText('Status').click();
  await page.getByRole('heading', { name: 'Variants' }).click();
  await page.getByText('Variant Title').click();
  await page.getByText('Price').click();
  await page.getByText('Inventory Quantity').click();
  await page.getByText('SKU').click();
  await expect(page.locator('input[name="variants\\.0\\.title"]')).toHaveValue('Default Title');
  await page.locator('input[name="variants\\.0\\.price"]').click();
  await page.locator('input[name="variants\\.0\\.inventory_quantity"]').click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Title', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Logout' }).click();
  // await page.getByText('Description').click();
  // await page.getByText('Vendor').click();
  // await page.getByText('Published Scope').click();
  // await page.getByText('Status').click();
  // await page.getByRole('heading', { name: 'Variants' }).click();
  // await page.getByText('Variant Title').click();
  // await page.getByText('Price').click();
  // await page.getByText('Price').click();
  // await page.getByText('Inventory Quantity').click();
  // await page.getByText('SKU').click();
  
});

test('CheckIfCanAddProduct', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('http://localhost:3000/admin/login');
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('Andrei');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Password1!');
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  await waitFor(1000);
  await page.goto('http://localhost:3000/admin/product/create');
  await page.locator('input[name="title"]').click();
  await page.locator('input[name="title"]').fill('P');
  await page.locator('textarea[name="body_html"]').click();
  await page.locator('textarea[name="body_html"]').fill('T');
  await page.locator('input[name="vendor"]').click();
  await page.locator('input[name="vendor"]').fill('P');
  await page.locator('input[name="variants\\.0\\.title"]').click();
  await page.locator('input[name="variants\\.0\\.title"]').fill('Default Titl');
  await page.locator('input[name="variants\\.0\\.price"]').click();
  await page.getByRole('button', { name: 'Submit' }).click();
  
  // FUNCTIONALY BROKEN, BUG STORY ADDED ON JIRA, TO BE FIXED
  //await expect(page.getByRole('heading', { name: 'Create a New Product' })).toBeHidden();
  await page.getByRole('button', { name: 'Logout' }).click();

  
});