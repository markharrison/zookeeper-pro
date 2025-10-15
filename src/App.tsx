import { useState, useMemo } from 'react'
import { useKV } from '@github/spark/hooks'
import { Animal, ViewMode } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AnimalCard } from '@/components/AnimalCard'
import { AnimalDialog } from '@/components/AnimalDialog'
import { EmptyState } from '@/components/EmptyState'
import { Plus, MagnifyingGlass, Funnel } from '@phosphor-icons/react'
import { filterAnimals, sortAnimalsByFeedingUrgency, sortAnimalsByHealthUrgency, generateId } from '@/lib/animal-utils'
import { toast } from 'sonner'
import { Toaster } from '@/components/ui/sonner'

function App() {
  const [animals, setAnimals] = useKV<Animal[]>('zoo-animals', [])
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [habitatFilter, setHabitatFilter] = useState('all')
  const [healthFilter, setHealthFilter] = useState('all')

  const filteredAndSortedAnimals = useMemo(() => {
    const safeAnimals = animals || []
    let filtered = filterAnimals(safeAnimals, searchTerm, habitatFilter, healthFilter)
    
    if (viewMode === 'feeding') {
      filtered = sortAnimalsByFeedingUrgency(filtered)
    } else if (viewMode === 'health') {
      filtered = sortAnimalsByHealthUrgency(filtered)
    }
    
    return filtered
  }, [animals, searchTerm, habitatFilter, healthFilter, viewMode])

  const handleAddAnimal = () => {
    setSelectedAnimal(null)
    setIsDialogOpen(true)
  }

  const handleEditAnimal = (animal: Animal) => {
    setSelectedAnimal(animal)
    setIsDialogOpen(true)
  }

  const handleSaveAnimal = (animal: Animal) => {
    setAnimals((currentAnimals) => {
      const safeAnimals = currentAnimals || []
      if (animal.id && safeAnimals.find(a => a.id === animal.id)) {
        return safeAnimals.map(a => a.id === animal.id ? animal : a)
      } else {
        const newAnimal = { ...animal, id: generateId() }
        return [...safeAnimals, newAnimal]
      }
    })
    toast.success(animal.id ? 'Animal updated successfully' : 'Animal added successfully')
  }

  const handleDeleteAnimal = (id: string) => {
    setAnimals((currentAnimals) => (currentAnimals || []).filter(a => a.id !== id))
    toast.success('Animal removed from system')
  }

  const handleMarkFed = (id: string) => {
    setAnimals((currentAnimals) =>
      (currentAnimals || []).map(a =>
        a.id === id ? { ...a, lastFed: Date.now() } : a
      )
    )
    toast.success('Feeding recorded')
  }

  const hasAnimals = (animals || []).length > 0
  const hasResults = filteredAndSortedAnimals.length > 0

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      
      <header className="border-b border-border bg-card sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              My Animals
            </h1>
            {hasAnimals && (
              <Button onClick={handleAddAnimal} size="lg">
                <Plus className="mr-2" weight="bold" />
                Add Animal
              </Button>
            )}
          </div>
        </div>
      </header>

      {!hasAnimals ? (
        <EmptyState onAddAnimal={handleAddAnimal} />
      ) : (
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8 space-y-4">
            <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as ViewMode)}>
              <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3">
                <TabsTrigger value="all">All Animals</TabsTrigger>
                <TabsTrigger value="feeding">Feeding Schedule</TabsTrigger>
                <TabsTrigger value="health">Health Alerts</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <div className="relative flex-1">
                <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by name or species..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex gap-3">
                <Select value={habitatFilter} onValueChange={setHabitatFilter}>
                  <SelectTrigger className="w-[180px]">
                    <Funnel className="mr-2" />
                    <SelectValue placeholder="Habitat" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Habitats</SelectItem>
                    <SelectItem value="savanna">Savanna</SelectItem>
                    <SelectItem value="rainforest">Rainforest</SelectItem>
                    <SelectItem value="arctic">Arctic</SelectItem>
                    <SelectItem value="desert">Desert</SelectItem>
                    <SelectItem value="aquatic">Aquatic</SelectItem>
                    <SelectItem value="aviary">Aviary</SelectItem>
                    <SelectItem value="temperate">Temperate</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={healthFilter} onValueChange={setHealthFilter}>
                  <SelectTrigger className="w-[180px]">
                    <Funnel className="mr-2" />
                    <SelectValue placeholder="Health" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="healthy">Healthy</SelectItem>
                    <SelectItem value="attention">Needs Attention</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {hasResults ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedAnimals.map((animal) => (
                <AnimalCard
                  key={animal.id}
                  animal={animal}
                  onEdit={handleEditAnimal}
                  onDelete={handleDeleteAnimal}
                  onMarkFed={handleMarkFed}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No animals found matching your filters.
              </p>
              <Button
                variant="link"
                onClick={() => {
                  setSearchTerm('')
                  setHabitatFilter('all')
                  setHealthFilter('all')
                }}
                className="mt-4"
              >
                Clear filters
              </Button>
            </div>
          )}
        </main>
      )}

      <AnimalDialog
        animal={selectedAnimal}
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveAnimal}
      />
    </div>
  )
}

export default App