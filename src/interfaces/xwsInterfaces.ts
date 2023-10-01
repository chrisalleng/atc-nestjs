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
    limited: number;
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

export interface XWSUpgradeSchema {
    xws: string;
    name: string;
    cost: XWSUpgradeCost;
    standard: boolean;
    sides: XWSUpgradeSide[];
}

export interface XWSUpgradeSide {
    slots: string[];
    image: string;
    artwork: string;
}

export interface XWSUpgradeCost {
    value: number;
}