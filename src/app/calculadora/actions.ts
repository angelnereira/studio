"use server";

import { Resend } from 'resend';
import { CalculationResult } from '@/types/calculator';
import { formatPrice, formatTimeline } from '@/lib/calculator-logic';

const resend = new Resend(process.env.RESEND_API_KEY_SEND);

interface SendBudgetEmailParams {
  result: CalculationResult;
  recipientEmail: string;
  recipientName?: string;
}

export async function sendBudgetEmail({
  result,
  recipientEmail,
  recipientName,
}: SendBudgetEmailParams): Promise<{ success: boolean; error?: string }> {
  try {
    const { priceBreakdown, timeline, service, selectedAddOns, recommendations, currency } = result;

    const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Presupuesto de Proyecto</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 28px;">Presupuesto de Proyecto</h1>
    <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Ángel Nereira - Ingeniero de Software</p>
  </div>

  <div style="background: white; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
    ${recipientName ? `<p style="font-size: 16px;">Hola ${recipientName},</p>` : ''}

    <p style="font-size: 16px;">Gracias por tu interés en mis servicios. A continuación encontrarás el presupuesto estimado para tu proyecto:</p>

    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h2 style="color: #667eea; margin-top: 0; font-size: 32px; text-align: center;">
        ${formatPrice(priceBreakdown.total, currency)}
      </h2>
      <p style="text-align: center; color: #666; margin: 0;">
        ${service.name} • ${formatTimeline(timeline.adjustedWeeks)}
      </p>
    </div>

    <h3 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 8px;">Detalles del Proyecto</h3>
    <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
      <tr>
        <td style="padding: 8px 0; color: #666;"><strong>Servicio:</strong></td>
        <td style="padding: 8px 0;">${service.name}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #666;"><strong>Duración estimada:</strong></td>
        <td style="padding: 8px 0;">${formatTimeline(timeline.adjustedWeeks)}</td>
      </tr>
      ${timeline.startDate && timeline.estimatedEndDate
        ? `
      <tr>
        <td style="padding: 8px 0; color: #666;"><strong>Fecha de entrega:</strong></td>
        <td style="padding: 8px 0;">${new Date(timeline.estimatedEndDate).toLocaleDateString('es-PA', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}</td>
      </tr>
      `
        : ''
      }
    </table>

    <h3 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 8px; margin-top: 30px;">Desglose de Costos</h3>
    <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
      <tr style="background: #f8f9fa;">
        <td style="padding: 10px; font-weight: bold;">Concepto</td>
        <td style="padding: 10px; text-align: right; font-weight: bold;">Monto</td>
      </tr>
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #e0e0e0;">Precio base</td>
        <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; text-align: right;">
          ${formatPrice(priceBreakdown.basePrice, currency)}
        </td>
      </tr>
      ${priceBreakdown.complexityAdjustment !== 0
        ? `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #e0e0e0;">Ajuste por complejidad</td>
        <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; text-align: right; color: #667eea;">
          +${formatPrice(priceBreakdown.complexityAdjustment, currency)}
        </td>
      </tr>
      `
        : ''
      }
      ${priceBreakdown.urgencyAdjustment !== 0
        ? `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #e0e0e0;">Ajuste por urgencia</td>
        <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; text-align: right; color: #ff9800;">
          +${formatPrice(priceBreakdown.urgencyAdjustment, currency)}
        </td>
      </tr>
      `
        : ''
      }
      ${priceBreakdown.addOnsTotal > 0
        ? `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #e0e0e0;">
          Complementos (${selectedAddOns.length})
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; text-align: right; color: #667eea;">
          +${formatPrice(priceBreakdown.addOnsTotal, currency)}
        </td>
      </tr>
      `
        : ''
      }
      <tr style="background: #667eea; color: white;">
        <td style="padding: 15px; font-weight: bold; font-size: 18px;">TOTAL</td>
        <td style="padding: 15px; text-align: right; font-weight: bold; font-size: 18px;">
          ${formatPrice(priceBreakdown.total, currency)}
        </td>
      </tr>
    </table>

    ${selectedAddOns.length > 0
        ? `
    <h3 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 8px; margin-top: 30px;">
      Complementos Incluidos
    </h3>
    <ul style="list-style: none; padding: 0; margin: 15px 0;">
      ${selectedAddOns
          .map(
            (addOn) => `
        <li style="padding: 8px 0; border-bottom: 1px solid #e0e0e0; display: flex; justify-content: space-between;">
          <span>✓ ${addOn.name}</span>
          <span style="color: #667eea; font-weight: 600;">${formatPrice(addOn.price, currency)}</span>
        </li>
      `
          )
          .join('')}
    </ul>
    `
        : ''
      }

    ${recommendations.length > 0
        ? `
    <div style="background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 30px 0; border-left: 4px solid #2196f3;">
      <h3 style="color: #1976d2; margin-top: 0;">Recomendaciones</h3>
      <ul style="margin: 10px 0; padding-left: 20px; color: #0d47a1;">
        ${recommendations.map((rec) => `<li style="margin: 8px 0;">${rec}</li>`).join('')}
      </ul>
    </div>
    `
        : ''
      }

    <p style="font-size: 16px; margin-top: 30px;">
      Este presupuesto es una estimación basada en los parámetros seleccionados.
      El costo final puede variar según requisitos específicos adicionales que surjan durante el análisis detallado.
    </p>

    <p style="font-size: 16px;">
      Si tienes alguna pregunta o deseas discutir más detalles del proyecto, no dudes en contactarme.
    </p>

    <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e0e0e0; text-align: center;">
      <p style="margin: 5px 0; color: #666;">
        <strong>Ángel Nereira</strong><br>
        Ingeniero de Software<br>
        <a href="mailto:angelnereira15@gmail.com" style="color: #667eea; text-decoration: none;">angelnereira15@gmail.com</a><br>
        <a href="https://angelnereira.com" style="color: #667eea; text-decoration: none;">angelnereira.com</a>
      </p>
    </div>
  </div>

  <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
    <p>Presupuesto válido por 30 días desde la fecha de generación.</p>
    <p>Generado el ${new Date().toLocaleDateString('es-PA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}</p>
  </div>
</body>
</html>
    `;

    const emailResult = await resend.emails.send({
      from: 'Calculadora de Presupuestos <onboarding@resend.dev>',
      to: recipientEmail,
      subject: `Presupuesto de Proyecto: ${service.name}`,
      html: htmlContent,
      replyTo: 'angelnereira15@gmail.com',
    });

    if (emailResult.error) {
      console.error('Error sending email:', emailResult.error);
      return { success: false, error: emailResult.error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Error in sendBudgetEmail:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
    };
  }
}
