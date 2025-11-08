
import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const galleryItemSchema = z.object({
  id: z.number().optional(),
  imageUrl: z.string().url(),
  imageHint: z.string().min(2),
  title: z.string().min(2),
  caption: z.string().min(4),
});

export type GalleryItem = z.infer<typeof galleryItemSchema>;
