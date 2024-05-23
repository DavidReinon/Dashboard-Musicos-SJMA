"use client";

import React, { useEffect, useState } from "react";
import { supabaseClient } from "@/src/services/supabase";
import DataTable from "@/src/components/DataTable";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

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
        label: "HORA",
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

type Selection = Awaited<ReturnType<typeof getSelectionData>>[number];

const getSelectionData = async () => {
    const { data, error } = await supabaseClient
        .from("selection")
        .select("*")
        .order("date", { ascending: false });
    if (error) {
        throw new Error();
    }
    return data;
};

//Selections = Particiones
const SelectionsScreen: React.FC = () => {
    const [selections, setSelections] = useState<Selection[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getSelectionData();
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
                title="Particiones"
                columns={columns}
                data={selections}
                emptyContent="No se han podido cargar las Particiones..."
            />
            <div className="flex justify-end my-5">
                <Button
                    color="primary"
                    size="lg"
                    radius="lg"
                    onClick={() => router.push("selections/create-selection")}
                >
                    Nueva Particion
                </Button>
            </div>
        </div>
    );
};

export default SelectionsScreen;
