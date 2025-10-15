import { Animal, HealthStatus } from './types'

export function getRelativeTime(timestamp: number): string {
  const now = Date.now()
  const diff = now - timestamp
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  return `${days}d ago`
}

export function isFeedingOverdue(lastFed: number, intervalHours: number): boolean {
  const now = Date.now()
  const overdueThreshold = lastFed + (intervalHours * 3600000)
  return now > overdueThreshold
}

export function getHealthStatusColor(status: HealthStatus): string {
  switch (status) {
    case 'healthy':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'attention':
      return 'bg-amber-100 text-amber-800 border-amber-200'
    case 'critical':
      return 'bg-red-100 text-red-800 border-red-200'
  }
}

export function getHealthStatusLabel(status: HealthStatus): string {
  switch (status) {
    case 'healthy':
      return 'Healthy'
    case 'attention':
      return 'Needs Attention'
    case 'critical':
      return 'Critical'
  }
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

export function filterAnimals(
  animals: Animal[],
  searchTerm: string,
  habitatFilter: string,
  healthFilter: string
): Animal[] {
  return animals.filter(animal => {
    const matchesSearch = animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         animal.species.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesHabitat = habitatFilter === 'all' || animal.habitat === habitatFilter
    const matchesHealth = healthFilter === 'all' || animal.healthStatus === healthFilter
    
    return matchesSearch && matchesHabitat && matchesHealth
  })
}

export function sortAnimalsByFeedingUrgency(animals: Animal[]): Animal[] {
  return [...animals].sort((a, b) => {
    const aOverdue = isFeedingOverdue(a.lastFed, a.feedingInterval)
    const bOverdue = isFeedingOverdue(b.lastFed, b.feedingInterval)
    
    if (aOverdue && !bOverdue) return -1
    if (!aOverdue && bOverdue) return 1
    
    return a.lastFed - b.lastFed
  })
}

export function sortAnimalsByHealthUrgency(animals: Animal[]): Animal[] {
  const statusPriority: Record<HealthStatus, number> = {
    critical: 0,
    attention: 1,
    healthy: 2
  }
  
  return [...animals].sort((a, b) => {
    return statusPriority[a.healthStatus] - statusPriority[b.healthStatus]
  })
}
