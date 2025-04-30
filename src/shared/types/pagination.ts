import type { PaginationProps } from 'naive-ui';
import type { ToRef } from "vue";

export interface DataTableExpose {
    pagination: DataTablePagination
}

export interface DataTablePagination extends PaginationProps {
    page: number;
    pageSize: number;
    pageCount: number;
    onReset: () => void;
}

export type DataTableRef = ToRef<DataTableExpose>