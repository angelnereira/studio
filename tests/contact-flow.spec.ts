import { test, expect } from '@playwright/test';

test.describe('Contact Form Submission', () => {
  test('should allow a client to submit the contact form', async ({ page }) => {
    await page.goto('/contact');
    
    // Select the "Cliente" tab
    await page.getByRole('tab', { name: 'Cliente' }).click();
    
    // Fill out the form
    await page.getByPlaceholder('Tu nombre').fill('Test Client');
    await page.getByPlaceholder('tu.email@ejemplo.com').fill('test.client@example.com');
    
    await page.getByLabel('Servicio de Interés').click();
    await page.getByText('Desarrollo Web').click();
    
    await page.getByLabel('Presupuesto Estimado').click();
    await page.getByText('$1,000 - $5,000').click();

    await page.getByPlaceholder('Describe tus necesidades, objetivos y cualquier detalle relevante.').fill('This is a test message for a new web development project inquiry.');
    
    // Submit the form
    await page.getByRole('button', { name: 'Enviar Propuesta' }).click();
    
    // Assert that the success message is visible
    const successToast = page.getByTestId('success-toast');
    await expect(successToast).toBeVisible({ timeout: 10000 });
    await expect(successToast).toContainText('¡Mensaje Enviado!');
    await expect(successToast).toContainText('Tu mensaje ha sido recibido. Gracias por contactarme.');
  });
});
