import {
    Table,
    TableHeader,
    TableColumn,
    TableProps,
    TableBody,
    TableRow,
    TableCell,
    Spinner,
    getKeyValue,
} from "@nextui-org/react";
import { ComponentProps } from "react";

interface Column {
    key: string;
    label: string;
}

interface DataTableProps<T extends { id: string | number }> extends TableProps {
    header?: React.ReactNode;
    columns: Column[];
    data: T[];
}

function DataTable<T extends { id: string | number }>({
    header,
    columns,
    data,
    ...other
}: DataTableProps<T>) {
    return (
        <div className="flex flex-col gap-y-4">
            {header || null}
            <div className="overflow-x-auto max-w-screen-md">
                <Table aria-label="Data table" {...other}>
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn key={column.key}>
                                {column.label}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={data}>
                        {(item) => (
                            <TableRow key={item.id}>
                                {(columnKey) => (
                                    <TableCell>
                                        {getKeyValue(item, columnKey) || "-"}
                                    </TableCell>
                                )}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default DataTable;
