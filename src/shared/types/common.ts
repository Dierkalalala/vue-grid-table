export interface ResponseData<T> {
    items: T[],
    item: T,
    totalPages: number,
    totalCount: number,
    pageSize: number
}

export interface PaginationPayload {
    pageNumber?: number,
    pageSize?: number,
}

export interface SearchablePayload {
    searchString?: string
}

export type SortOrder = 'ascend' | 'descend';

export type SortablePayload<T extends string> = {
    [K in T]?: {
        order: SortOrder
    }
}