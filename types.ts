export type Enemy = {
    faction: string;
    id: number;
    image_url: string;
    max: number;
    mode: number;
    name: string;
    weightedaverage: number;
};

export type Weapon = {
    id: number;
    image_url: string;
    name: string;
    penetration: number;
};