export interface ProximityEvent {
    id: string;
    missDistance?: string;
    happenedAt?: string;
    asteroid: Asteroid;
}

export interface Asteroid {
    id: string;
    name?: string;
    nasaID?: string;
}
