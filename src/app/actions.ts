
'use server';

import { z } from 'zod';
import { contactFormSchema, type ContactFormValues } from '@/lib/schemas';

// ContactFormValues is imported but also defined via infer here,
// this is fine and common pattern if the schema is also used here.
// If ContactFormValues were only needed for export, it would be imported from '@/lib/schemas'

export interface ContactFormState {
  message: string;
  status: 'success' | 'error' | 'idle';
  errors?: Partial<Record<keyof ContactFormValues, string[]>>;
  fieldValues?: ContactFormValues;
}

export async function submitEnquiry(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const rawFormData = {
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  };

  const validatedFields = contactFormSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      message: 'Validation failed. Please check your input.',
      status: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
      fieldValues: rawFormData as ContactFormValues, // send back current values
    };
  }

  // Simulate sending data (e.g., to an email service or database)
  console.log('Enquiry submitted:', validatedFields.data);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // In a real application, you would handle potential errors during submission here.
  // For now, we assume success.

  return {
    message: 'Thank you for your enquiry! We will get back to you soon.',
    status: 'success',
    fieldValues: { name: '', email: '', subject: '', message: '' } // Clear form on success
  };
}
