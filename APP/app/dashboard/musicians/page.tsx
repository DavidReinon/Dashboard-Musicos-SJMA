"use client";

import React, { useState } from "react";
import DataTable from "@/src/components/DataTable";
import { supabaseClient } from "@/src/services/supabase";
import { useToast, type ToastType } from "@/src/components/ui/use-toast";
import { useMount } from "react-use";
import { Tables } from "@/src/types/supabase";
import { Spinner } from "@nextui-org/react";

type Musician = {
    id: string;
    display_name: string;
    instrument: string;
};

// Define las columnas fuera del componente
const columns = [
    {
        key: "display_name",
        label: "NOMBRE",
    },
    {
        key: "instrument",
        label: "INSTRUMENTO",
    },
];

const MusiciansScreen = () => {
    const [musicians, setMusicians] = useState<Musician[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useMount(async () => setMusicians(await getMusicianData(toast)));

    const getMusicianData = async (toast: ToastType): Promise<Musician[]> => {
        const { data, error } = await supabaseClient
            .from("musician")
            .select(`id, display_name, instrument(display_name)`)
            .order("display_name");

        if (error) {
            toast({
                title: "Error.",
                description: "No se han podido cargar los músicos...",
            });
            setLoading(false);
            return [];
        }

        const adjustedData = data.map(
            (item: {
                id: string;
                display_name: string;
                instrument: { display_name: string } | null;
            }) => ({
                id: item.id,
                display_name: item.display_name,
                instrument: item.instrument?.display_name || "",
            })
        );

        setLoading(false);
        return adjustedData || [];
    };

    return (
        <>
            {loading ? (
                <Spinner size="lg" />
            ) : (
                <DataTable title="Musicos" columns={columns} data={musicians} />
            )}
        </>
    );
};

export default MusiciansScreen;
