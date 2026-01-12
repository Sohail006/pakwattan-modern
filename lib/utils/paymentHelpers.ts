/**
 * Payment helper functions for formatting and displaying payment-related information
 */

/**
 * Format payment method name to a user-friendly display name
 * @param paymentMethod - Raw payment method string
 * @returns Formatted payment method name
 */
export function formatPaymentMethod(paymentMethod: string): string {
  const methodMap: Record<string, string> = {
    'EasyPaisa': 'EasyPaisa',
    'BankAccount': 'Bank Account',
    'ByHandOnTestDate': 'By Hand on Test Date',
    'By Hand on Test Date': 'By Hand on Test Date',
  }
  
  return methodMap[paymentMethod] || paymentMethod
}

/**
 * Get payment status display text based on payment status and method
 * @param paymentStatus - Payment status string ("Paid" | "Unpaid" | "Pending")
 * @param paymentMethod - Payment method string
 * @returns Formatted payment status display text
 */
export function getPaymentStatusDisplay(paymentStatus?: string, paymentMethod?: string): string {
  // If payment status is explicitly "Unpaid", show "Unpaid"
  if (paymentStatus?.toLowerCase() === 'unpaid') {
    return 'Unpaid'
  }
  
  // If payment method is "By Hand on Test Date", show "Pending"
  if (paymentMethod === 'By Hand on Test Date' || paymentMethod === 'ByHandOnTestDate') {
    return 'Pending'
  }
  
  // If payment method exists (EasyPaisa or Bank Account), show the method name
  // This assumes that if a payment method is selected, payment is made via that method
  if (paymentMethod) {
    const formattedMethod = formatPaymentMethod(paymentMethod)
    // Only show method name if it's not "By Hand on Test Date" (already handled above)
    if (formattedMethod !== 'By Hand on Test Date' && formattedMethod !== 'Unpaid') {
      return formattedMethod
    }
  }
  
  // If payment status is "Paid" but no method, show "Paid"
  if (paymentStatus?.toLowerCase() === 'paid') {
    return 'Paid'
  }
  
  // If payment status is "Pending", show "Pending"
  if (paymentStatus?.toLowerCase() === 'pending') {
    return 'Pending'
  }
  
  // Default: Unpaid
  return 'Unpaid'
}

/**
 * Get receipt status display text based on receipt URL and verification status
 * @param receiptUrl - Receipt image URL (optional)
 * @param verificationStatus - Receipt verification status ("Pending" | "Verified" | "Rejected")
 * @param paymentMethod - Payment method string
 * @returns Formatted receipt status display text
 */
export function getReceiptStatusDisplay(
  receiptUrl?: string | null,
  verificationStatus?: string | null,
  paymentMethod?: string
): string {
  // If payment method is "By Hand on Test Date", receipt is not required
  if (paymentMethod === 'ByHandOnTestDate' || paymentMethod === '2') {
    return 'N/A'
  }

  // If verified
  if (verificationStatus?.toLowerCase() === 'verified') {
    return 'Verified'
  }

  // If rejected
  if (verificationStatus?.toLowerCase() === 'rejected') {
    return 'Rejected'
  }

  // If uploaded but pending verification
  if (receiptUrl) {
    return 'Pending'
  }

  // If missing (required but not uploaded)
  return 'Missing'
}
