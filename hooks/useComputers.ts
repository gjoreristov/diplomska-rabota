"use client";

import { useState } from 'react';
import { Computer } from '@/lib/types';

export function useComputers() {
  const [computers, setComputers] = useState<Computer[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const addComputer = (computer: Omit<Computer, 'id' | 'status'>) => {
    const newComputer: Computer = {
      ...computer,
      id: Date.now(),
      status: 'active',
    };
    setComputers(prev => [...prev, newComputer]);
  };

  const filteredComputers = computers.filter(computer => {
    const searchLower = searchQuery.toLowerCase();
    return (
      computer.name.toLowerCase().includes(searchLower) ||
      computer.ipAddress.toLowerCase().includes(searchLower) ||
      computer.macAddress.toLowerCase().includes(searchLower) ||
      computer.room.toLowerCase().includes(searchLower) ||
      computer.description.toLowerCase().includes(searchLower)
    );
  });

  return {
    computers: filteredComputers,
    addComputer,
    searchQuery,
    setSearchQuery,
  };
}