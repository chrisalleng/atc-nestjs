export interface XWSShipSchema {
    name: string;
    xws: string;
    pilots: XWSPilotSchema[];
    faction: string;
}

export interface XWSPilotSchema {
    xws: string;
    name: string;
    caption: string;
    initiative: number;
    limited: boolean;
    image: string;
    artwork: string;
    standard: boolean;
    cost: number;
    loadout: number;
    standardLoadout: string[];
}

export interface XWSShipSchema {
    xws: string;
    name: string;
    size: string;
    icon: string;
    faction: string;
}