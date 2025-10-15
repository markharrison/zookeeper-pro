import { Animal } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PencilSimple, Trash, Check, Warning, PawPrint, Clock } from '@phosphor-icons/react'
import { getRelativeTime, isFeedingOverdue, getHealthStatusColor, getHealthStatusLabel } from '@/lib/animal-utils'

interface AnimalCardProps {
  animal: Animal
  onEdit: (animal: Animal) => void
  onDelete: (id: string) => void
  onMarkFed: (id: string) => void
}

export function AnimalCard({ animal, onEdit, onDelete, onMarkFed }: AnimalCardProps) {
  const isOverdue = isFeedingOverdue(animal.lastFed, animal.feedingInterval)
  const healthColorClass = getHealthStatusColor(animal.healthStatus)
  const isCritical = animal.healthStatus === 'critical'

  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-150 hover:-translate-y-1 group">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <PawPrint className="text-primary shrink-0" weight="fill" />
              <h3 className="text-xl font-semibold text-foreground truncate">
                {animal.name}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{animal.species}</p>
          </div>
          
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onEdit(animal)}
              className="h-8 w-8"
            >
              <PencilSimple className="text-primary" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onDelete(animal.id)}
              className="h-8 w-8"
            >
              <Trash className="text-destructive" />
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="text-xs">
            {animal.habitat}
          </Badge>
          <Badge 
            className={`text-xs border ${healthColorClass} ${isCritical ? 'animate-pulse-soft' : ''}`}
          >
            {isCritical && <Warning weight="fill" className="mr-1" />}
            {getHealthStatusLabel(animal.healthStatus)}
          </Badge>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock />
            <span>Age: {animal.age} years</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className={isOverdue ? 'text-destructive' : 'text-muted-foreground'} />
            <span className={isOverdue ? 'text-destructive font-medium' : 'text-muted-foreground'}>
              Fed {getRelativeTime(animal.lastFed)}
              {isOverdue && ' (Overdue!)'}
            </span>
          </div>
        </div>

        <div className="pt-2 border-t border-border">
          <Button
            onClick={() => onMarkFed(animal.id)}
            className="w-full"
            variant={isOverdue ? 'default' : 'outline'}
          >
            <Check className="mr-2" />
            Mark as Fed
          </Button>
        </div>
      </div>
    </Card>
  )
}
