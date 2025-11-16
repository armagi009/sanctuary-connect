import { useState, useMemo } from 'react';
import { PractitionerCard } from '@/components/PractitionerCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search, X, Frown } from 'lucide-react';
import { MOCK_PRACTITIONERS } from '@/data/mockData';
const ALL_MODALITIES = [...new Set(MOCK_PRACTITIONERS.flatMap(p => p.modalities))].sort();
const MAX_PRICE = 300; // Assuming max price for slider
export function DiscoveryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModalities, setSelectedModalities] = useState<Set<string>>(new Set());
  const [priceRange, setPriceRange] = useState([0, MAX_PRICE]);
  const handleModalityChange = (modality: string, checked: boolean) => {
    setSelectedModalities(prev => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(modality);
      } else {
        newSet.delete(modality);
      }
      return newSet;
    });
  };
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedModalities(new Set());
    setPriceRange([0, MAX_PRICE]);
  };
  const filteredPractitioners = useMemo(() => {
    return MOCK_PRACTITIONERS.filter(p => {
      const nameMatch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const modalityMatch = selectedModalities.size === 0 || p.modalities.some(m => selectedModalities.has(m));
      // This is a mock filter as price is not on practitioner object.
      // We'll just let this pass for now. A real implementation would check session prices.
      const priceMatch = true;
      return nameMatch && modalityMatch && priceMatch;
    });
  }, [searchQuery, selectedModalities]);
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
                <Button variant="ghost" size="sm" className="text-sm" onClick={clearFilters}>
                  <X className="w-4 h-4 mr-1" /> Clear all
                </Button>
              </div>
              <div>
                <Label htmlFor="search" className="sr-only">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search by name..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <Accordion type="multiple" defaultValue={['modalities']} className="w-full">
                <AccordionItem value="modalities">
                  <AccordionTrigger className="text-base font-medium">Modalities</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                      {ALL_MODALITIES.map(modality => (
                        <div key={modality} className="flex items-center space-x-2">
                          <Checkbox
                            id={`modality-${modality}`}
                            checked={selectedModalities.has(modality)}
                            onCheckedChange={(checked) => handleModalityChange(modality, !!checked)}
                          />
                          <Label htmlFor={`modality-${modality}`} className="font-normal cursor-pointer">{modality}</Label>
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
                        value={priceRange}
                        max={MAX_PRICE}
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
              <p className="text-sm text-muted-foreground">{filteredPractitioners.length} practitioners found</p>
            </div>
            {filteredPractitioners.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPractitioners.map((practitioner) => (
                  <PractitionerCard key={practitioner.id} practitioner={practitioner} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center text-muted-foreground py-24 border-2 border-dashed rounded-lg">
                <Frown className="w-16 h-16 mb-4" />
                <h3 className="text-xl font-semibold">No Practitioners Found</h3>
                <p className="mt-2 max-w-xs">Try adjusting your filters or clearing them to see all available practitioners.</p>
                <Button variant="outline" className="mt-6" onClick={clearFilters}>Clear Filters</Button>
              </div>
            )}
            {/* <div className="mt-12 flex justify-center">
              <Button variant="outline">Load More</Button>
            </div> */}
          </main>
        </div>
      </div>
    </div>
  );
}