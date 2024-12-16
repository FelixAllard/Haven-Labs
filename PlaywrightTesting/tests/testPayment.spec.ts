import { test, expect } from '@playwright/test';

test('testIfCanAccessPaymentPage', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByLabel('Toggle navigation').click();
  await page.getByRole('link', { name: 'Cart' }).click();
  await page.getByLabel('Close').click();
  await page.getByRole('button', { name: 'Create Draft Order' }).click();
  await expect(page.locator('span').filter({ hasText: 'Haven Lab' }).first()).toBeVisible();
  await expect(page.locator('#app')).toMatchAriaSnapshot(`
    - complementary:
      - heading "Order summary" [level=2]
      - heading "Shopping cart" [level=3]
      - table "Shopping cart":
        - rowgroup:
          - row "Product image Description Quantity Price":
            - columnheader "Product image"
            - columnheader "Description"
            - columnheader "Quantity"
            - columnheader "Price"
        - rowgroup:
          - row /Felix Quantity 2 Felix New Variant 2 \\$\\d+,\\d+\\.\\d+/:
            - cell "Felix Quantity 2":
              - img "Felix"
            - cell "Felix New Variant":
              - paragraph: Felix
              - paragraph: New Variant
            - cell "2"
            - cell /\\$\\d+,\\d+\\.\\d+/
      - heading "Cost summary" [level=3]
      - table "Cost summary":
        - rowgroup:
          - row "Item Value":
            - columnheader "Item"
            - columnheader "Value"
        - rowgroup:
          - row /Subtotal \\$\\d+,\\d+\\.\\d+/:
            - rowheader "Subtotal"
            - cell /\\$\\d+,\\d+\\.\\d+/
          - row "Shipping Enter shipping address":
            - rowheader "Shipping"
            - cell "Enter shipping address"
          - row /Total CAD \\$\\d+,\\d+\\.\\d+/:
            - rowheader "Total"
            - cell /CAD \\$\\d+,\\d+\\.\\d+/:
              - strong: /\\$\\d+,\\d+\\.\\d+/
    `);
  await page.getByPlaceholder('Email or mobile phone number').click();
  await page.getByPlaceholder('Email or mobile phone number').fill('xilef992@gmail.com');
  await page.getByPlaceholder('First name').click();
  await page.getByPlaceholder('First name').fill('Felix');
  await page.getByPlaceholder('Last name').click();
  await page.getByPlaceholder('Last name').fill('Allard');
  await page.getByPlaceholder('Address').click();
  await page.getByPlaceholder('Address').fill('6601 Louis-Hemon');
  await page.getByPlaceholder('City').click();
  await page.getByPlaceholder('City').fill('Montreal');
  await page.getByPlaceholder('Postal code').click();
  await page.getByPlaceholder('Postal code').fill('h2g 2l1');
  await page.locator('div').filter({ hasText: /^Credit card$/ }).first().click();
  await page.locator('body').press('Tab');
});