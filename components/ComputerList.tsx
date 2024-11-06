"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { Computer } from "@/lib/types";
import SearchBar from "./SearchBar";

interface ComputerListProps {
  computers: Computer[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export default function ComputerList({ 
  computers, 
  searchQuery, 
  onSearchChange 
}: ComputerListProps) {
  return (
    <div className="space-y-4">
      <SearchBar value={searchQuery} onChange={onSearchChange} />
      
      {computers.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          {searchQuery ? "No computers found matching your search" : "No computers added yet"}
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>MAC Address</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Info</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {computers.map((computer) => (
                <TableRow key={computer.id}>
                  <TableCell className="font-medium">{computer.name}</TableCell>
                  <TableCell>{computer.ipAddress}</TableCell>
                  <TableCell>{computer.macAddress}</TableCell>
                  <TableCell>{computer.room}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={computer.status === "active" ? "default" : "secondary"}
                    >
                      {computer.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{computer.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}