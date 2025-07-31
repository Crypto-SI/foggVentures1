
'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { submitEnquiry, type ContactFormState } from '@/app/actions';
import { contactFormSchema, type ContactFormValues } from '@/lib/schemas';

import { Container } from '@/components/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';


const initialFormState: ContactFormState = {
  message: '',
  status: 'idle',
  errors: {},
  fieldValues: { name: '', email: '', subject: '', message: '' },
};

// Helper component for the submit button to use useFormStatus
function FormSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-lg py-3" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : 'Send Enquiry'}
    </Button>
  );
}

export function ContactSection() {
  const { toast } = useToast();
  const [state, formAction] = useActionState(submitEnquiry, initialFormState);
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    // defaultValues will be updated by form.reset in useEffect based on server state
    defaultValues: initialFormState.fieldValues, 
  });

  useEffect(() => {
    if (state.status === 'success') {
      toast({
        title: "Enquiry Sent!",
        description: state.message,
        variant: "default",
      });
      form.reset(state.fieldValues || initialFormState.fieldValues); // Reset form with cleared values or initial
    } else if (state.status === 'error') {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
      // Set form values back if there was an error to retain user input
      if (state.fieldValues) {
        form.reset(state.fieldValues);
      }
    }
  }, [state, toast, form]);

  return (
    <section id="contact" className="py-16 md:py-24 bg-background">
      <Container>
        <Card className="max-w-2xl mx-auto shadow-xl bg-card">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-3xl sm:text-4xl font-bold text-primary">
              Book a Consultation
            </CardTitle>
            <CardDescription className="mt-2 text-lg text-card-foreground/80">
              Reach out to discuss your specific needs and how we can assist you in Guyana.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-foreground">Full Name</Label>
                <Input
                  id="name"
                  {...form.register('name')}
                  className="mt-1"
                  placeholder="e.g. John Doe"
                  defaultValue={state.fieldValues?.name || ''} // Ensure field repopulates
                />
                {state.errors?.name && <p className="mt-1 text-sm text-destructive">{state.errors.name[0]}</p>}
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium text-foreground">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  {...form.register('email')}
                  className="mt-1"
                  placeholder="e.g. john.doe@example.com"
                  defaultValue={state.fieldValues?.email || ''} // Ensure field repopulates
                />
                {state.errors?.email && <p className="mt-1 text-sm text-destructive">{state.errors.email[0]}</p>}
              </div>

              <div>
                <Label htmlFor="subject" className="text-sm font-medium text-foreground">Subject</Label>
                <Input
                  id="subject"
                  {...form.register('subject')}
                  className="mt-1"
                  placeholder="e.g. Market Entry Query"
                  defaultValue={state.fieldValues?.subject || ''} // Ensure field repopulates
                />
                {state.errors?.subject && <p className="mt-1 text-sm text-destructive">{state.errors.subject[0]}</p>}
              </div>

              <div>
                <Label htmlFor="message" className="text-sm font-medium text-foreground">Message</Label>
                <Textarea
                  id="message"
                  {...form.register('message')}
                  rows={5}
                  className="mt-1"
                  placeholder="Please describe your enquiry in detail..."
                  defaultValue={state.fieldValues?.message || ''} // Ensure field repopulates
                />
                {state.errors?.message && <p className="mt-1 text-sm text-destructive">{state.errors.message[0]}</p>}
              </div>

              <FormSubmitButton />
            </form>
          </CardContent>
        </Card>
      </Container>
    </section>
  );
}
