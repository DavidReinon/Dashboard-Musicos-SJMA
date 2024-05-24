"use client";

import React, { useState } from "react";
import DataTable from "@/src/components/DataTable";
import { supabaseClient } from "@/src/services/supabase";
import { useToast, type ToastType } from "@/src/components/ui/use-toast";
import { useMount } from "react-use";
import { Tables } from "@/src/types/supabase";
import { Spinner } from "@nextui-org/react";

type Instrument = Tables<"instrument">;

// Define las columnas fuera del componente
const columns = [
    {
        key: "display_name",
        label: "NOMBRE",
    },
    {
        key: "order",
        label: "ORDEN",
    },
];

const InstrumentsScreen = () => {
    const [instruments, setInstruments] = useState<Instrument[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useMount(async () => setInstruments(await getInstrumentData(toast)));

    const getInstrumentData = async (toast: ToastType): Promise<Instrument[]> => {
        const { data, error } = await supabaseClient
            .from("instrument")
            .select(`id, display_name, order`)
            .order("order");

        if (error) {
            toast({
                title: "Error.",
                description: "No se han podido cargar los instrumentos...",
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
                <DataTable title="Instrumentos" columns={columns} data={instruments} />
            )}
        </>
    );
};

export default InstrumentsScreen;