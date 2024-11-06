'use client';

import { Computer } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Info, Wifi, Monitor } from 'lucide-react';
import { useEffect, useState } from 'react';
import { EditComputerDialog } from './edit-computer-dialog';
import { DeleteComputerDialog } from './delete-computer-dialog';

interface ComputerListProps {
  computers: Computer[];
  onUpdate: (id: string, data: Partial<Computer>) => void;
  onDelete: (id: string) => void;
}

export function ComputerList({ computers, onUpdate, onDelete }: ComputerListProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] text-center p-4">
        <Monitor className="h-12 w-12 text-muted-foreground/50 mb-4" />
        <p className="text-lg font-medium text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (computers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] text-center p-4">
        <Monitor className="h-12 w-12 text-muted-foreground/50 mb-4" />
        <p className="text-lg font-medium text-muted-foreground">No computers found</p>
        <p className="text-sm text-muted-foreground/70">Add your first computer to get started</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[600px] w-full rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>IP Address</TableHead>
            <TableHead>MAC Address</TableHead>
            <TableHead>Room</TableHead>
            <TableHead>Details</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {computers.map((computer) => (
            <TableRow key={computer.id}>
              <TableCell>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="flex items-center gap-2">
                        <Badge variant="success" className="gap-1">
                          <Wifi className="h-3 w-3" />
                          Online
                        </Badge>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      Last seen: {new Date().toLocaleString()}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell className="font-medium">{computer.name}</TableCell>
              <TableCell>
                <code className="px-2 py-1 bg-muted rounded-md text-sm">
                  {computer.ipAddress}
                </code>
              </TableCell>
              <TableCell>
                <code className="px-2 py-1 bg-muted rounded-md text-sm">
                  {computer.macAddress}
                </code>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{computer.room}</Badge>
              </TableCell>
              <TableCell>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-[200px] text-sm">{computer.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <EditComputerDialog
                    computer={computer}
                    onUpdate={onUpdate}
                  />
                  <DeleteComputerDialog
                    computerName={computer.name}
                    onDelete={() => onDelete(computer.id)}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}