import { useState } from 'react';
import { PractitionerCard } from '@/components/PractitionerCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search, X } from 'lucide-react';
import { MOCK_PRACTITIONERS } from '@/data/mockData';
const ALL_MODALITIES = [...new Set(MOCK_PRACTITIONERS.flatMap(p => p.modalities))];
export function DiscoveryPage() {
  const [priceRange, setPriceRange] = useState([20, 150]);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight">Discover Practitioners</h1>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Find the right guide for your journey. Filter by modality, price, and more.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          {/* Filters Sidebar */}
          <aside className="w-full md:w-1/4 lg:w-1/5">
            <div className="sticky top-24 space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Filters</h2>
                <Button variant="ghost" size="sm" className="text-sm">
                  <X className="w-4 h-4 mr-1" /> Clear all
                </Button>
              </div>
              <div>
                <Label htmlFor="search" className="sr-only">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input id="search" placeholder="Search by name..." className="pl-10" />
                </div>
              </div>
              <Accordion type="multiple" defaultValue={['modalities', 'price']} className="w-full">
                <AccordionItem value="modalities">
                  <AccordionTrigger className="text-base font-medium">Modalities</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                      {ALL_MODALITIES.map(modality => (
                        <div key={modality} className="flex items-center space-x-2">
                          <Checkbox id={`modality-${modality}`} />
                          <Label htmlFor={`modality-${modality}`} className="font-normal">{modality}</Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="price">
                  <AccordionTrigger className="text-base font-medium">Price Range</AccordionTrigger>
                  <AccordionContent>
                    <div className="p-1">
                      <Slider
                        defaultValue={priceRange}
                        max={300}
                        step={10}
                        onValueChange={setPriceRange}
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-2">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </aside>
          {/* Results Grid */}
          <main className="w-full md:w-3/4 lg:w-4/5">
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">{MOCK_PRACTITIONERS.length} practitioners found</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {MOCK_PRACTITIONERS.map((practitioner) => (
                <PractitionerCard key={practitioner.id} practitioner={practitioner} />
              ))}
            </div>
            <div className="mt-12 flex justify-center">
              <Button variant="outline">Load More</Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}