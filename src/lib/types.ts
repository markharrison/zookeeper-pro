export type HealthStatus = 'healthy' | 'attention' | 'critical'

export type Habitat = 'savanna' | 'rainforest' | 'arctic' | 'desert' | 'aquatic' | 'aviary' | 'temperate'

export interface Animal {
  id: string
  name: string
  species: string
  age: number
  habitat: Habitat
  diet: string
  healthStatus: HealthStatus
  medicalNotes: string
  lastFed: number
  feedingInterval: number
  imageUrl?: string
  createdAt: number
}

export type ViewMode = 'all' | 'feeding' | 'health'
