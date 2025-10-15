import { PawPrint } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'

interface EmptyStateProps {
  onAddAnimal: () => void
}

export function EmptyState({ onAddAnimal }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="rounded-full bg-muted p-8 mb-6">
        <PawPrint size={64} weight="fill" className="text-primary" />
      </div>
      <h2 className="text-3xl font-bold text-foreground mb-3">
        Welcome to Your Zoo
      </h2>
      <p className="text-muted-foreground text-lg mb-8 max-w-md">
        Start managing your animals by adding your first animal to the system.
        Track their health, feeding schedules, and care requirements all in one place.
      </p>
      <Button onClick={onAddAnimal} size="lg">
        <PawPrint className="mr-2" weight="fill" />
        Add Your First Animal
      </Button>
    </div>
  )
}
