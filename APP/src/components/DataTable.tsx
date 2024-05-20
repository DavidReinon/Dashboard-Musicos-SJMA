import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Spinner,
    getKeyValue,
} from "@nextui-org/react";

interface Column {
    key: string;
    label: string;
}

interface TableProps {
    columns: Column[];
    data: any[];
    title: string;
    emptyContent: string;
}

const DataTable: React.FC<TableProps> = ({ columns, data, title, emptyContent }) => {
    return (
        <div>
            <h1 className="my-5 text-3xl font-bold text-left">{title}:</h1>
            {data.length !== 0 ? (
                <Table aria-label="Data table">
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn key={column.key}>
                                {column.label}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody emptyContent={emptyContent} items={data}>
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
