import type {
    PaginationPayload,
    SearchablePayload,
    SortOrder
} from "@/shared/types/common";

export interface MockProduct {
    id: number
    name: string
    isNew: boolean
    price: number
}

export interface ProductDTO {
    id: number,
    name: string,
    isNew: 1 | 0,
    price: number,
    randomField: string
}

export interface ProductFetchPayload extends PaginationPayload, SearchablePayload {
    sortBy?: keyof ProductDTO
    sortOrder?: SortOrder
    filters?: Partial<Record<keyof ProductDTO, string | number>>
}

export interface ProductCache {
    result: ProductDTO[],
    totalPages: number
}