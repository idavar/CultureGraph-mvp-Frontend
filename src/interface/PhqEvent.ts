export interface PhqEvent {
    aviation_rank: number | null;
    category: string;
    country: string;
    description:  string;
    duration: number;
    end: string;
    entities: Array<string>;
    first_seen: string;
    id: string;
    labels: Array<string>;
    local_rank: string | null;
    location: Array<string>;
    rank: number;
    relevance: string | null;
    scope: string;
    start: string;
    state: string;
    timezone: string;
    title: string;
    updated: string;
}
