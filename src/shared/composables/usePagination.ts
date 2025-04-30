import { computed } from "vue";
import type {
    DataTablePagination,
    DataTableRef
} from "@/shared/types/pagination";


export default function usePagination(
    tableRef: DataTableRef
) {
    const pagination = computed<
        DataTablePagination | undefined
    >(() => tableRef.value?.pagination)

    const pageSize = computed<number>({
        get() {
            return pagination.value?.pageSize || 10
        },
        set(pageSize: number) {
            if (pagination.value) {
                pagination.value.pageSize = pageSize
            }
        }
    })

    const pageNumber = computed<number>({
        get() {
            return pagination.value?.page || 1
        },
        set(pageNumber: number) {
            if (pagination.value) {
                pagination.value.page = pageNumber
            }
        }
    })

    const pageCount = computed<number>({
        get() {
            return pagination.value?.pageCount || 1
        },
        set(pageCount: number) {
            if (pagination.value) {
                pagination.value.pageCount = pageCount
            }
        }
    })

    return {
        pageCount,
        pageSize,
        pageNumber
    }
}