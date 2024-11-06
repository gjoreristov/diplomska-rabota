'use client';

import { useState } from 'react';
import { Computer } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Pencil } from 'lucide-react';
import { ComputerForm } from './computer-form';

interface EditComputerDialogProps {
  computer: Computer;
  onUpdate: (id: string, data: Partial<Computer>) => void;
}

export function EditComputerDialog({ computer, onUpdate }: EditComputerDialogProps) {
  const [open, setOpen] = useState(false);

  const handleUpdate = (data: Partial<Computer>) => {
    onUpdate(computer.id, data);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Computer</DialogTitle>
        </DialogHeader>
        <ComputerForm 
          onSubmit={handleUpdate}
          initialData={computer}
          submitLabel="Save Changes"
        />
      </DialogContent>
    </Dialog>
  );
}