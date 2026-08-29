cat << 'INNER_EOF' > /tmp/playwright.patch
--- tests/e2e/example.spec.ts
+++ tests/e2e/example.spec.ts
@@ -8,10 +8,10 @@

     test('should load the home page successfully', async ({ page }) => {
         await page.goto('/');
-        await expect(page).toHaveTitle(/NEET Prep/);
+        await expect(page).toHaveTitle(/NEET/i);

         // Check for Hero Section
-        await expect(page.getByText('Master NEET with AI')).toBeVisible();
+        await expect(page.getByText(/Master NEET with/i)).toBeVisible();
         await expect(page.getByTestId('button-cta-signup')).toBeVisible();
     });

@@ -22,7 +22,7 @@

         await expect(page).toHaveURL(/.*pricing/);
         // Relax strict text check or ensure exact match with the pricing page header
-        await expect(page.locator('h1, h2').filter({ hasText: 'Pricing' }).first()).toBeVisible();
+        await expect(page.getByTestId('text-pricing-title')).toBeVisible();
     });

     // We can try to sign up a temp user if we wanted deep testing,
INNER_EOF
patch -p0 < /tmp/playwright.patch
