import { Animal, HealthStatus, Habitat } from '@/lib/types'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState, useEffect } from 'react'

interface AnimalDialogProps {
  animal: Animal | null
  open: boolean
  onClose: () => void
  onSave: (animal: Animal) => void
}

const HABITATS: { value: Habitat; label: string }[] = [
  { value: 'savanna', label: 'Savanna' },
  { value: 'rainforest', label: 'Rainforest' },
  { value: 'arctic', label: 'Arctic' },
  { value: 'desert', label: 'Desert' },
  { value: 'aquatic', label: 'Aquatic' },
  { value: 'aviary', label: 'Aviary' },
  { value: 'temperate', label: 'Temperate' },
]

const HEALTH_STATUSES: { value: HealthStatus; label: string }[] = [
  { value: 'healthy', label: 'Healthy' },
  { value: 'attention', label: 'Needs Attention' },
  { value: 'critical', label: 'Critical' },
]

export function AnimalDialog({ animal, open, onClose, onSave }: AnimalDialogProps) {
  const [formData, setFormData] = useState<Partial<Animal>>({
    name: '',
    species: '',
    age: 0,
    habitat: 'savanna',
    diet: '',
    healthStatus: 'healthy',
    medicalNotes: '',
    feedingInterval: 12,
  })

  useEffect(() => {
    if (animal) {
      setFormData(animal)
    } else {
      setFormData({
        name: '',
        species: '',
        age: 0,
        habitat: 'savanna',
        diet: '',
        healthStatus: 'healthy',
        medicalNotes: '',
        feedingInterval: 12,
      })
    }
  }, [animal, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.species) {
      return
    }

    const animalData: Animal = {
      id: animal?.id || '',
      name: formData.name,
      species: formData.species,
      age: formData.age || 0,
      habitat: formData.habitat || 'savanna',
      diet: formData.diet || '',
      healthStatus: formData.healthStatus || 'healthy',
      medicalNotes: formData.medicalNotes || '',
      lastFed: animal?.lastFed || Date.now(),
      feedingInterval: formData.feedingInterval || 12,
      createdAt: animal?.createdAt || Date.now(),
    }

    onSave(animalData)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {animal ? 'Edit Animal' : 'Add New Animal'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Luna"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="species">Species *</Label>
              <Input
                id="species"
                value={formData.species}
                onChange={(e) => setFormData({ ...formData, species: e.target.value })}
                placeholder="e.g., Snow Leopard"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age (years)</Label>
              <Input
                id="age"
                type="number"
                min="0"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="habitat">Habitat</Label>
              <Select
                value={formData.habitat}
                onValueChange={(value) => setFormData({ ...formData, habitat: value as Habitat })}
              >
                <SelectTrigger id="habitat">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {HABITATS.map((h) => (
                    <SelectItem key={h.value} value={h.value}>
                      {h.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="feedingInterval">Feeding Interval (hours)</Label>
              <Input
                id="feedingInterval"
                type="number"
                min="1"
                value={formData.feedingInterval}
                onChange={(e) => setFormData({ ...formData, feedingInterval: parseInt(e.target.value) || 12 })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="healthStatus">Health Status</Label>
              <Select
                value={formData.healthStatus}
                onValueChange={(value) => setFormData({ ...formData, healthStatus: value as HealthStatus })}
              >
                <SelectTrigger id="healthStatus">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {HEALTH_STATUSES.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="diet">Diet</Label>
            <Input
              id="diet"
              value={formData.diet}
              onChange={(e) => setFormData({ ...formData, diet: e.target.value })}
              placeholder="e.g., Carnivore - raw meat, bones"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="medicalNotes">Medical Notes</Label>
            <Textarea
              id="medicalNotes"
              value={formData.medicalNotes}
              onChange={(e) => setFormData({ ...formData, medicalNotes: e.target.value })}
              placeholder="Any health concerns, medications, or observations..."
              rows={4}
            />
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {animal ? 'Save Changes' : 'Add Animal'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
