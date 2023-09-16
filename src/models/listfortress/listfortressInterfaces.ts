export interface ListfortressTournament {
    id: number;
    name: string;
    date: Date;
    format: number;
    type: number;
    created_at: string;
    updated_at: string;
    participants: ListfortressPlayer[];
}

export interface ListfortressPlayer {
    id: number;
    name: string;
    tournament_id: number;
    score: number;
    swiss_rank: number;
    top_cut_rank: number;
    mov: number;
    sos: number;
    dropped: boolean;
    list_json: string;
}

export interface ListfortressPilot {
  id: string;
  ship: string;
  upgrades: ListfortressUpgrade;
}

export interface ListfortressUpgrade {
    [upgradeType:string] : string[];
}