"use client";

import React, { useState } from "react";
import { supabaseClient } from "@/src/services/supabase";
import DataTable from "@/src/components/DataTable";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useToast, type ToastType } from "@/src/components/ui/use-toast";
import { useMount } from "react-use";
import { Tables } from "@/src/types/supabase";
import { Spinner } from "@nextui-org/react";

type Selection = Tables<"selection">;

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

const SelectionsScreen: React.FC = () => {
    const [selections, setSelections] = useState<Selection[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();
    const router = useRouter();

    useMount(async () => setSelections(await getSelectionData(toast)));

    const getSelectionData = async (toast: ToastType): Promise<Selection[]> => {
        const { data, error } = await supabaseClient
            .from("selection")
            .select("*")
            .order("date", { ascending: false });

        if (error) {
            toast({
                title: "Error.",
                description: "No se han podido cargar las selecciones...",
            });
            setLoading(false);
            return [];
        }

        setLoading(false);
        return data || [];
    };

    return (
        <>
            {loading ? (
                <Spinner size="lg" />
            ) : (
                <DataTable
                    header={
                        <div className="flex w-full justify-end">
                            <Button
                                color="primary"
                                size="lg"
                                radius="lg"
                                onClick={() =>
                                    router.push("selections/create-selection")
                                }
                            >
                                Nueva Particion
                            </Button>
                        </div>
                    }
                    title="Particiones"
                    columns={columns}
                    data={selections}
                />
            )}
        </>
    );
};

export default SelectionsScreen;