import { ref } from "vue";
import type { DataTableRef } from "@/shared/types/pagination";

export default function useTableRef() {
    const tableRef = ref<DataTableRef | null>(null);

    return {
        tableRef
    }
}