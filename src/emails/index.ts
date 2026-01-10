// Email Templates Index
// Export all email templates for easy access

export { default as WelcomeEmail } from './welcome-template';
export { default as ServiceInquiryEmail } from './service-inquiry-template';
export { default as PromotionEmail } from './promotion-template';
export { default as QuoteFollowupEmail } from './quote-followup-template';
export { default as NewsletterEmail } from './newsletter-template';
export { default as ProjectCompleteEmail } from './project-complete-template';
export { default as ServiceShowcaseEmail } from './services-showcase-template';
export { default as BaseEmail, brandColors, tailwindConfig, Logo, EmailFooter } from './base-template';

/**
 * Email Templates Overview:
 * 
 * 1. WelcomeEmail - Sent when a new contact/client is added
 *    Props: name, previewText
 * 
 * 2. ServiceInquiryEmail - Confirmation when someone inquires about a service
 *    Props: clientName, serviceName, serviceSlug, packageName, previewText
 * 
 * 3. PromotionEmail - Marketing email with discounts and offers
 *    Props: clientName, promotionTitle, discountPercentage, originalPrice, 
 *           discountedPrice, serviceName, serviceSlug, expirationDate, promoCode, previewText
 * 
 * 4. QuoteFollowupEmail - Follow-up for leads who requested quotes
 *    Props: clientName, serviceName, packageName, estimatedPrice, daysSinceQuote, quoteId, previewText
 * 
 * 5. NewsletterEmail - Monthly newsletter with articles and featured service
 *    Props: subscriberName, edition, headline, introText, articles[], featuredService, previewText
 * 
 * 6. ProjectCompleteEmail - Sent when a project is delivered
 *    Props: clientName, projectName, projectUrl, completionDate, deliverables[], supportPlan, previewText
 * 
 * 7. ServiceShowcaseEmail - Overview of all services available
 *    Props: clientName, previewText
 * 
 * 8. BaseEmail - Base template with shared components (Logo, Footer)
 *    Props: previewText, children
 */
