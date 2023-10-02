export interface ListfortressTournament {
    id: number;
    name: string;
    date: Date;
    format_id: number;
    tournament_type_id: number;
    created_at: string;
    updated_at: string;
    participants: ListfortressPlayer[];
    rounds: ListfortressRound[];
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

export interface ListfortressRound {
    scenario: string;
    roundtype_id: number;
    matches: ListfortressMatch[];
}

export interface ListfortressMatch {
    id: number;
    player1_id: number;
    player1_points: number,
    player2_id: number,
    player2_points: number,
    result: string,
    winner_id: number
}