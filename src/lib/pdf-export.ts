import jsPDF from 'jspdf';
import { CalculationResult } from '@/types/calculator';
import { formatPrice, formatTimeline } from './calculator-logic';

/**
 * Export calculation result to PDF
 */
export function exportToPDF(result: CalculationResult): void {
  const doc = new jsPDF();
  const { priceBreakdown, timeline, service, selectedAddOns, recommendations, currency, params } = result;

  // Page settings
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;
  let y = 20;

  // Header
  doc.setFillColor(79, 70, 229); // Primary color
  doc.rect(0, 0, pageWidth, 40, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('Presupuesto de Proyecto', margin, y + 8);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Ángel Nereira - Ingeniero de Software', margin, y + 16);
  doc.text('angelnereira.com', margin, y + 22);

  y = 55;
  doc.setTextColor(0, 0, 0);

  // Project Overview
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Resumen del Proyecto', margin, y);
  y += 10;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');

  const projectDetails = [
    { label: 'Servicio:', value: service.name },
    { label: 'Complejidad:', value: params.complexityLevel },
    { label: 'País/Región:', value: params.country },
    { label: 'Urgencia:', value: params.urgencyLevel },
    { label: 'Duración Estimada:', value: formatTimeline(timeline.adjustedWeeks) },
  ];

  projectDetails.forEach((detail) => {
    doc.setFont('helvetica', 'bold');
    doc.text(detail.label, margin, y);
    doc.setFont('helvetica', 'normal');
    doc.text(detail.value, margin + 45, y);
    y += 7;
  });

  y += 10;

  // Price Breakdown
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Desglose de Costos', margin, y);
  y += 10;

  doc.setFontSize(10);

  // Draw table header
  doc.setFillColor(240, 240, 240);
  doc.rect(margin, y - 5, contentWidth, 8, 'F');
  doc.setFont('helvetica', 'bold');
  doc.text('Concepto', margin + 2, y);
  doc.text('Monto', pageWidth - margin - 40, y);
  y += 10;

  doc.setFont('helvetica', 'normal');

  const priceItems = [
    { label: 'Precio base', amount: priceBreakdown.basePrice },
    ...(priceBreakdown.complexityAdjustment !== 0
      ? [{ label: 'Ajuste por complejidad', amount: priceBreakdown.complexityAdjustment }]
      : []),
    ...(priceBreakdown.countryAdjustment !== 0
      ? [{ label: 'Ajuste por ubicación', amount: priceBreakdown.countryAdjustment }]
      : []),
    ...(priceBreakdown.urgencyAdjustment !== 0
      ? [{ label: 'Ajuste por urgencia', amount: priceBreakdown.urgencyAdjustment }]
      : []),
    ...(priceBreakdown.clientTypeAdjustment !== 0
      ? [{ label: 'Ajuste por tipo de cliente', amount: priceBreakdown.clientTypeAdjustment }]
      : []),
    ...(priceBreakdown.addOnsTotal > 0
      ? [{ label: `Complementos (${selectedAddOns.length})`, amount: priceBreakdown.addOnsTotal }]
      : []),
  ];

  priceItems.forEach((item, index) => {
    const isEven = index % 2 === 0;
    if (isEven) {
      doc.setFillColor(250, 250, 250);
      doc.rect(margin, y - 5, contentWidth, 7, 'F');
    }

    doc.text(item.label, margin + 2, y);
    const amountText = formatPrice(item.amount, currency);
    const amountWidth = doc.getTextWidth(amountText);
    doc.text(amountText, pageWidth - margin - amountWidth - 2, y);
    y += 7;
  });

  // Total
  y += 3;
  doc.setFillColor(79, 70, 229);
  doc.rect(margin, y - 5, contentWidth, 10, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.text('TOTAL', margin + 2, y + 2);
  const totalText = formatPrice(priceBreakdown.total, currency);
  const totalWidth = doc.getTextWidth(totalText);
  doc.text(totalText, pageWidth - margin - totalWidth - 2, y + 2);

  y += 15;
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);

  // Add-ons detail (if any)
  if (selectedAddOns.length > 0) {
    doc.setFont('helvetica', 'bold');
    doc.text('Complementos Incluidos', margin, y);
    y += 8;

    doc.setFont('helvetica', 'normal');
    selectedAddOns.forEach((addOn) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }

      doc.text(`• ${addOn.name}`, margin + 2, y);
      doc.text(formatPrice(addOn.price, currency), pageWidth - margin - 30, y);
      y += 6;
    });

    y += 5;
  }

  // Timeline details
  if (y > 250) {
    doc.addPage();
    y = 20;
  }

  doc.setFont('helvetica', 'bold');
  doc.text('Timeline del Proyecto', margin, y);
  y += 8;

  doc.setFont('helvetica', 'normal');
  doc.text(`Duración estimada: ${formatTimeline(timeline.adjustedWeeks)}`, margin + 2, y);
  y += 6;

  if (timeline.startDate) {
    doc.text(
      `Fecha de inicio: ${new Date(timeline.startDate).toLocaleDateString('es-PA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}`,
      margin + 2,
      y
    );
    y += 6;
  }

  if (timeline.estimatedEndDate) {
    doc.text(
      `Fecha estimada de entrega: ${new Date(timeline.estimatedEndDate).toLocaleDateString('es-PA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}`,
      margin + 2,
      y
    );
    y += 6;
  }

  y += 10;

  // Recommendations
  if (recommendations.length > 0) {
    if (y > 240) {
      doc.addPage();
      y = 20;
    }

    doc.setFont('helvetica', 'bold');
    doc.text('Recomendaciones', margin, y);
    y += 8;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);

    recommendations.forEach((recommendation) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }

      const lines = doc.splitTextToSize(`• ${recommendation}`, contentWidth - 5);
      lines.forEach((line: string) => {
        doc.text(line, margin + 2, y);
        y += 5;
      });
    });
  }

  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.setFont('helvetica', 'normal');

    // Footer text
    const footerText = 'Este presupuesto es una estimación y puede variar según requisitos específicos. Válido por 30 días.';
    const footerLines = doc.splitTextToSize(footerText, contentWidth);
    let footerY = doc.internal.pageSize.getHeight() - 20;

    footerLines.forEach((line: string) => {
      const lineWidth = doc.getTextWidth(line);
      doc.text(line, (pageWidth - lineWidth) / 2, footerY);
      footerY += 4;
    });

    // Page number
    doc.text(
      `Página ${i} de ${pageCount}`,
      pageWidth / 2 - doc.getTextWidth(`Página ${i} de ${pageCount}`) / 2,
      doc.internal.pageSize.getHeight() - 10
    );

    // Date generated
    const dateGenerated = `Generado: ${new Date().toLocaleDateString('es-PA')}`;
    doc.text(dateGenerated, margin, doc.internal.pageSize.getHeight() - 10);
  }

  // Generate filename
  const filename = `presupuesto-${service.id}-${new Date().toISOString().split('T')[0]}.pdf`;

  // Save PDF
  doc.save(filename);
}
