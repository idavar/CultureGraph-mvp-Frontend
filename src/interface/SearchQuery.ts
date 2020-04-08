export interface SearchQuery {
	page: number;
    next?: string | null;
	previous?: string | null;
	search?: string | null;
	status?: string | null;
	is_active?: string | null;
	ordering?: string | null;
 }
