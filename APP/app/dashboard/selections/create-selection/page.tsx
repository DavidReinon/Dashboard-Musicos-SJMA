"use client";

import React, { useState } from "react";
import { Input, DatePicker, TimeInput, Button } from "@nextui-org/react";
import {
    CalendarDate,
    Time,
} from "@internationalized/date"; //Libreria para manejar fechas y horas, la que devuelven los componentes de NextUI
import { useRouter } from "next/navigation";

const CreateSelectionScreen: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [date, setDate] = useState<CalendarDate | null>(null);
    const [time, setTime] = useState<Time | null>(null);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [numMusicians, setNumMusicians] = useState<number>(0);
    const [otherExpenses, setOtherExpenses] = useState<number>(0);
    const [repertoire, setRepertoire] = useState<string>("");
    const [dressCode, setDressCode] = useState<string>("");
    const [comments, setComments] = useState<string>("");
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Aquí puedes manejar la lógica de envío del formulario
        console.log({
            name,
            date,
            time,
            totalPrice,
            numMusicians,
            otherExpenses,
            repertoire,
            dressCode,
            comments,
        });
    };

    return (
        <>
            <h1 className="my-5 text-3xl font-bold text-left">
                Datos de la particion:
            </h1>
            <form onSubmit={handleSubmit} className="flex">
                <div className="flex-col mx-10">
                    <Input
                        isRequired
                        className="m-5"
                        label="Nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <DatePicker
                        isRequired
                        className="m-5"
                        label="Fecha"
                        value={date}
                        onChange={(value) => setDate(value)} // 'value' es del tipo DateValue
                    />
                    <TimeInput
                        isRequired
                        hourCycle={24}
                        className="m-5"
                        label="Hora"
                        value={time}
                        onChange={(value) => setTime(value)} // 'setTime' acepta valores de tipo TimeValue
                    />
                    <Input
                        isRequired
                    className="m-5"
                    type="number"
                    label="Precio Total"
                        value={totalPrice.toString()}
                        onChange={(e) => setTotalPrice(Number(e.target.value))}
                    />
                    <Input
                        isRequired
                        className="m-5"
                        type="number"
                        label="Número de Músicos"
                        value={numMusicians.toString()}
                        onChange={(e) =>
                            setNumMusicians(Number(e.target.value))
                        }
                    />
                </div>
                <div className="flex-col mx-10">
                    <Input
                        className="m-5"
                        type="number"
                        label="Otros Gastos"
                        value={otherExpenses.toString()}
                        onChange={(e) =>
                            setOtherExpenses(Number(e.target.value))
                        }
                    />
                    <Input
                        className="m-5"
                        label="Repertorio"
                        value={repertoire}
                        onChange={(e) => setRepertoire(e.target.value)}
                    />
                    <Input
                        className="m-5"
                        label="Vestimenta"
                        value={dressCode}
                        onChange={(e) => setDressCode(e.target.value)}
                    />
                    <Input
                        className="m-5"
                        label="Comentarios"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                    />
                    <Button
                        color="danger"
                        className="m-5"
                        onClick={() => router.back()}
                    >
                        Volver
                    </Button>
                    <Button color="primary" className="m-5" type="submit">
                        Siguiente
                    </Button>
                </div>
            </form>
        </>
    );
};

export default CreateSelectionScreen;
