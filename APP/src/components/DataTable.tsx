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

interface DataTableProps extends TableProps {
    columns: Column[];
    data: any[];
    title: string;
    emptyContent: string;
}

const DataTable: React.FC<DataTableProps> = ({
    columns,
    data,
    title,
    ...other
}) => {
    return (
        <div>
            <h1 className="my-5 text-3xl font-bold text-left">{title}:</h1>
            {data.length !== 0 ? (
                <Table
                    aria-label="Data table"
                    {...other}
                >
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn key={column.key}>
                                {column.label}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={data}>
                        {(item: any) => (
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
            ) : (
                <Spinner label="Loading..." color="primary" />
            )}
        </div>
    );
};

export default DataTable;
