// import { test, expect } from '@playwright/test';

// test('AppointmentGetAllAndCreate', async ({ page }) => {
//   await page.goto('http://localhost:3000/');
//   await page.getByRole('button', { name: 'Owner Login' }).click();
//   await page.getByLabel('Username').click();
//   await page.getByLabel('Username').fill('Andrei');
//   await page.getByLabel('Password').click();
//   await page.getByLabel('Password').fill('Password1!');
//   await page.getByRole('button', { name: 'Login', exact: true }).click();
//   await page.getByLabel('Toggle navigation').click();
//   await page.getByRole('link', { name: 'Appointments' }).click();
//   await page.getByLabel('Close').click();
//   await expect(page.getByRole('heading', { name: 'Appointments', exact: true })).toBeVisible();
//   await expect(page.getByRole('button', { name: 'New Appointment' })).toBeVisible();
//   await page.getByRole('button', { name: 'New Appointment' }).click();
//   await page.locator('div').filter({ hasText: /^Title$/ }).getByRole('textbox').click();
//   await page.locator('div').filter({ hasText: /^Title$/ }).getByRole('textbox').fill('Title');
//   await page.locator('div').filter({ hasText: /^Customer Name$/ }).getByRole('textbox').click();
//   await page.locator('div').filter({ hasText: /^Customer Name$/ }).getByRole('textbox').fill('cName');
//   await page.locator('input[type="email"]').click();
//   await page.locator('input[type="email"]').fill('cEmail');
//   await page.locator('input[type="datetime-local"]').click();
//   await page.locator('input[type="datetime-local"]').press('ArrowRight');
//   await page.locator('input[type="datetime-local"]').press('ArrowRight');
//   await page.locator('input[type="datetime-local"]').fill('2025-02-01T10:00');
//   await page.locator('textarea').click();
//   await page.locator('textarea').fill('Description');
//   await page.getByRole('combobox').selectOption('Cancelled');
//   await page.getByRole('button', { name: 'Create Appointment' }).click();
//   await expect(page.locator('.card-body > .btn').first()).toBeVisible();
//   await page.getByRole('button', { name: 'Logout' }).click();
// });

