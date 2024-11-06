'use client';

import { useState, useEffect } from 'react';
import { Computer } from '@/lib/types';

export function useComputers() {
  const [computers, setComputers] = useState<Computer[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('computers');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('computers', JSON.stringify(computers));
  }, [computers]);

  const addComputer = (computer: Omit<Computer, 'id'>) => {
    const newComputer = {
      ...computer,
      id: crypto.randomUUID(),
    };
    setComputers([...computers, newComputer]);
  };

  const updateComputer = (id: string, data: Partial<Computer>) => {
    setComputers(computers.map(computer => 
      computer.id === id ? { ...computer, ...data } : computer
    ));
  };

  const deleteComputer = (id: string) => {
    setComputers(computers.filter(computer => computer.id !== id));
  };

  const filteredComputers = computers.filter((computer) => {
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
    updateComputer,
    deleteComputer,
    searchQuery,
    setSearchQuery,
  };
}