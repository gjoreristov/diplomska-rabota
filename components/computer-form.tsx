'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { Computer } from '@/lib/types';

const formSchema = z.object({
  name: z.string().min(1, 'Computer name is required'),
  ipAddress: z
    .string()
    .min(1, 'IP address is required')
    .regex(
      /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
      'Invalid IP address format'
    ),
  macAddress: z
    .string()
    .min(1, 'MAC address is required')
    .regex(
      /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/,
      'Invalid MAC address format (XX:XX:XX:XX:XX:XX)'
    ),
  description: z.string(),
  room: z.string().min(1, 'Room is required'),
});

interface ComputerFormProps {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  initialData?: Computer;
  submitLabel?: string;
}

export function ComputerForm({ onSubmit, initialData, submitLabel = 'Add Computer' }: ComputerFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      ipAddress: initialData?.ipAddress || '',
      macAddress: initialData?.macAddress || '',
      description: initialData?.description || '',
      room: initialData?.room || '',
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      onSubmit(data);
      if (!initialData) {
        form.reset();
      }
      toast.success(initialData ? 'Computer updated successfully' : 'Computer added successfully', {
        description: `${data.name} has been ${initialData ? 'updated' : 'added'} to the inventory.`,
      });
    } catch (error) {
      toast.error(initialData ? 'Failed to update computer' : 'Failed to add computer', {
        description: 'Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 w-full max-w-lg mx-auto"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Computer Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter computer name" {...field} />
              </FormControl>
              <FormDescription>
                Choose a unique identifier for this computer
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="ipAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>IP Address</FormLabel>
                <FormControl>
                  <Input placeholder="192.168.1.1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="macAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>MAC Address</FormLabel>
                <FormControl>
                  <Input placeholder="00:1A:2B:3C:4D:5E" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="room"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room</FormLabel>
              <FormControl>
                <Input placeholder="Enter room number or name" {...field} />
              </FormControl>
              <FormDescription>
                Specify the location of this computer
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter computer description"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Add any additional details about this computer
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {initialData ? 'Saving Changes...' : 'Adding Computer...'}
            </>
          ) : (
            submitLabel
          )}
        </Button>
      </form>
    </Form>
  );
}