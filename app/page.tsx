'use client';

import { ComputerForm } from '@/components/computer-form';
import { ComputerList } from '@/components/computer-list';
import { SearchBar } from '@/components/search-bar';
import { useComputers } from '@/hooks/use-computers';
import { Monitor, Database, LayoutGrid, Plus } from 'lucide-react';
import { Toaster } from '@/components/ui/sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useState } from 'react';

export default function Home() {
  const { computers, addComputer, updateComputer, deleteComputer, searchQuery, setSearchQuery } = useComputers();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat">
      <div className="min-h-screen backdrop-blur-xl bg-background/80">
        <div className="container mx-auto py-8 px-4 space-y-8">
          <div className="flex items-center gap-6 border-b pb-6">
            <div className="p-4 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl">
              <Monitor className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Computer Inventory
              </h1>
              <p className="text-muted-foreground text-lg">
                Manage and track your computer assets efficiently
              </p>
            </div>
            {mounted && (
              <div className="ml-auto flex items-center gap-3 bg-gradient-to-r from-primary/10 to-purple-600/10 px-6 py-3 rounded-xl">
                <Database className="h-5 w-5 text-primary" />
                <span className="text-base font-medium">
                  {computers.length} {computers.length === 1 ? 'Computer' : 'Computers'}
                </span>
              </div>
            )}
          </div>

          <Tabs defaultValue="list" className="space-y-6">
            <TabsList className="grid w-full max-w-[400px] grid-cols-2 p-1 bg-gradient-to-r from-primary/20 to-purple-600/20">
              <TabsTrigger value="list" className="flex items-center gap-2">
                <LayoutGrid className="h-4 w-4" />
                View Inventory
              </TabsTrigger>
              <TabsTrigger value="add" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Computer
              </TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="space-y-6">
              <Card className="border-0 bg-white/50 backdrop-blur-xl shadow-xl">
                <CardContent className="pt-6">
                  <SearchBar value={searchQuery} onChange={setSearchQuery} />
                  <div className="h-4" />
                  {mounted && (
                    <ComputerList 
                      computers={computers}
                      onUpdate={updateComputer}
                      onDelete={deleteComputer}
                    />
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="add">
              <Card className="border-0 bg-white/50 backdrop-blur-xl shadow-xl">
                <CardContent className="pt-6">
                  <ComputerForm onSubmit={addComputer} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Toaster position="top-right" />
    </main>
  );
}