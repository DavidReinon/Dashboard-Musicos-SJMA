"use client";

import React, { useState } from "react";
import {
    Input,
    DatePicker,
    TimeInput,
    Button,
    Textarea,
} from "@nextui-org/react";
import { CalendarDate, Time } from "@internationalized/date";
import { useRouter } from "next/navigation";
import DataTable from "@/src/components/DataTable";
import { supabaseClient } from "@/src/services/supabase";
import { useMount } from "react-use";
import { ToastType, useToast } from "@/src/components/ui/use-toast";

type Musician = Awaited<ReturnType<typeof getMusicianData>>[number];
type SelectionFormData = {
    name?: string;
    date?: CalendarDate;
    time?: Time;
    totalPrice?: string;
    numMusicians?: string;
    otherExpenses?: string;
    repertoire?: string;
    dressCode?: string;
    comments?: string;
};

const getMusicianData = async (toast: ToastType) => {
    const { data, error } = await supabaseClient
        .from("musician")
        .select(`id, display_name, instrument(id, display_name, order)`)
        .order("instrument(order)")
        .order("display_name");

    if (error) {
        toast({
            title: "Error.",
            description: "No se han podido cargar los ensayos...",
        });
        return [];
    }

    const parsedData = data.map((musician) => ({
        id: musician.id,
        display_name: musician.display_name,
        instrument: musician.instrument!.display_name,
        instrumentId: musician.instrument!.id,
    }));
    return parsedData;
};

const NewSelectionScreen: React.FC = () => {
    const router = useRouter();
    const { toast } = useToast();

    const [allMusicians, setAllMusicians] = useState<Musician[]>([]);
    const [formData, setFormData] = useState<SelectionFormData>({});
    const [musiciansSelection, setMusiciansSelection] = useState<string[]>([]);

    useMount(async () => setAllMusicians(await getMusicianData(toast)));

    const insertSelectionData = async (formData: SelectionFormData) => {
        const { data, error } = await supabaseClient
            .from("selection")
            .insert({
                display_name: formData.name!,
                time: formData.time!.toString(),
                date: formData.date!.toString(),
                total_price: Number(formData.totalPrice!),
                num_musicians: Number(formData.numMusicians!),
                other_expenses: Number(formData.otherExpenses!) || 0,
                repertoire: formData.repertoire,
                dress_code: formData.dressCode,
                comments: formData.comments,
            })
            .select("id")
            .single();

        if (error) {
            toast({
                title: "Error",
                description: "No se ha podido crear la partición...",
                variant: "destructive",
            });
            return;
        }

        return data.id;
    };

    const insertMusiciansSelection = async (selectionId: number) => {
        const musiciansSelectionData = musiciansSelection.map((musicianId) => {
            const musician = allMusicians.find((m) => m.id === musicianId);
            const instrumentId = musician!.instrumentId;

            return {
                selection_id: selectionId,
                musician_id: musicianId,
                selected: true,
                instrument: instrumentId,
            };
        });

        const { error } = await supabaseClient
            .from("musician_selection")
            .insert(musiciansSelectionData);

        if (error) {
            toast({
                title: "Error",
                description: "No se ha podido crear la selección de músicos...",
                variant: "destructive",
            });
            return;
        }

        toast({
            title: "Partición creada",
            description: "La particion ha sido creada con exito!",
        });
        setTimeout(() => {
            router.push("/dashboard/selections");
        }, 1000);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (
            !formData.name ||
            !formData.date ||
            !formData.time ||
            !formData.numMusicians ||
            !formData.totalPrice
        ) {
            toast({
                title: "Error",
                description: "Por favor, rellene todos los campos obligatorios",
                variant: "destructive",
            });
            return;
        }

        const id = await insertSelectionData(formData);
        if (!id) return;
        insertMusiciansSelection(id);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col">
                {/* //Primer container de textInputs del formulario */}
                <div className="flex m-0">
                    {/* //Inputs de la izquierda */}
                    <section className="flex-col mx-5">
                        <Input
                            isRequired
                            className="m-5"
                            label="Nombre"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    name: e.target.value,
                                }))
                            }
                        />
                        <DatePicker
                            isRequired
                            className="m-5"
                            label="Fecha"
                            value={formData.date}
                            onChange={(date) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    date,
                                }))
                            }
                        />
                        <TimeInput
                            isRequired
                            hourCycle={24}
                            className="m-5"
                            label="Hora"
                            value={formData.time}
                            onChange={(time) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    time,
                                }))
                            }
                        />
                        <div className="flex items-center m-0">
                            <Input
                                isRequired
                                className="ml-5"
                                type="number"
                                label="Precio Total"
                                value={formData.totalPrice}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        totalPrice: e.target.value,
                                    }))
                                }
                            />
                            <Input
                                className="ml-5"
                                type="number"
                                label="Otros Gastos"
                                value={formData.otherExpenses}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        otherExpenses: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <Input
                            isRequired
                            className="m-5"
                            type="number"
                            label="Número de Músicos"
                            value={formData.numMusicians}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    numMusicians: e.target.value,
                                }))
                            }
                        />
                    </section>
                    <section className="flex-col mx-10">
                        <Input
                            className="m-5"
                            label="Repertorio"
                            value={formData.repertoire}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    repertoire: e.target.value,
                                }))
                            }
                        />
                        <Textarea
                            label="Vestimenta"
                            className="m-5 max-w-xs"
                            value={formData.dressCode}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    dressCode: e.target.value,
                                }))
                            }
                        />
                        <Textarea
                            className="m-5 max-w-xs"
                            label="Comentarios"
                            value={formData.comments}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    comments: e.target.value,
                                }))
                            }
                        />
                    </section>
                </div>
                {/* Tabla de selección de músicos */}
                <div className="m-5">
                    <h1 className="my-5 text-3xl font-bold text-left">
                        Musicos:
                    </h1>
                    <DataTable
                        columns={[
                            { key: "display_name", label: "Nombre" },
                            { key: "instrument", label: "Instrumento" },
                        ]}
                        data={allMusicians}
                        title="Músicos"
                        selectionMode="multiple"
                        selectedKeys={musiciansSelection}
                        onSelectionChange={(selection) =>
                            setMusiciansSelection(
                                selection === "all"
                                    ? allMusicians.map(
                                          (musician) => musician.id
                                      )
                                    : (Array.from(selection) as string[])
                            )
                        }
                    />
                </div>
                <div className="flex m-5 justify-center">
                    <Button
                        color="danger"
                        className="m-5"
                        onClick={() => router.back()}
                    >
                        Volver
                    </Button>
                    <Button color="primary" className="m-5" type="submit">
                        Crear Partición
                    </Button>
                </div>
            </form>
        </>
    );
};

export default NewSelectionScreen;
