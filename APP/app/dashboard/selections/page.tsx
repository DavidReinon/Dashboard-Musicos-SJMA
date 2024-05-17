"use client";

import React, { useEffect, useState } from "react";
import { fetchSelectionsTable } from "@/src/services/supabaseDBQuerys";
import DataTable from "@/src/components/DataTable";

const columns = [
    {
        key: "display_name",
        label: "NOMBRE",
    },
    {
        key: "date",
        label: "FECHA",
    },
    {
        key: "time",
        label: "TIEMPO",
    },
    {
        key: "total_price",
        label: "PRECIO TOTAL",
    },
    {
        key: "num_musicians",
        label: "NUMERO DE MUSICOS",
    },
    {
        key: "other_expenses",
        label: "OTROS GASTOS",
    },
    {
        key: "repertoire",
        label: "REPERTORIO",
    },
    {
        key: "dress_code",
        label: "VESTIMENTA",
    },
    {
        key: "comments",
        label: "COMENTARIOS",
    },
    {
        key: "price_per_musician",
        label: "PRECIO POR MUSICO",
    },
];

type SelectionData = {
    display_name: string;
    date: Date;
    time: string;
    total_price: number;
    num_musicians: number;
    other_expenses?: number;
    repertoire?: string;
    dress_code?: string;
    comments?: string;
    price_per_musician?: number;
};

const selectionsScreen = () => {
    const [selections, setSelections] = useState<SelectionData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchSelectionsTable();
                setSelections(data);
            } catch (error) {
                console.error("Error fetching selections data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <DataTable
                columns={columns}
                data={selections}
                emptyContent="No se han podido cargar las Particiones..."
            />
        </div>
    );
};

export default selectionsScreen;