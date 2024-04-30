"use client";

import { useEffect, useState } from "react";
import Papa from "papaparse";

const CSVImporter: React.FC = () => {
    const [data, setData] = useState<string[][] | null>(null);
    const [headers, setHeaders] = useState<string[] | null>(null);
    const [musicians, setMusicians] = useState<
        Array<{ id: string; name: string }>
    >([]);

    useEffect(() => {
        musiciansFilter();
    }, [data]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Utilizar FileReader para leer el archivo como texto
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target?.result) {
                // Parsear el texto del archivo usando Papa Parse
                Papa.parse<string[]>(e.target.result.toString(), {
                    complete: (result: Papa.ParseResult<string[]>) => {
                        // Los datos se encontrarán en result.data
                        setData(result.data);
                        // Los encabezados se encontrarán en result.meta.fields
                        setHeaders(result.meta.fields ?? null);
                    },
                    header: true, // Indica que el archivo CSV tiene una fila de encabezado
                    delimiter: ";", // Establece el delimitador correcto para tu CSV
                });
            }
        };
        reader.readAsText(file);
    };

    const eventsFilter = () => {
        if (data && headers) {
            const eventData: { fecha: string; titulo: string; tipo: string; datos: string[] }[] = [];
    
            // Obtener las filas con los datos de fecha, título y tipo
            const fechaRow = data[0];
            const tituloRow = data[1];
            const tipoRow = data[2];
    
            headers.forEach((header: string, headerIndex: number) => {
                if (headerIndex >= 3) {
                    // A partir del cuarto valor del encabezado (el primero es 5)
                    const evento: { fecha: string; titulo: string; tipo: string; datos: string[] } = {
                        fecha: fechaRow[headerIndex] as string,
                        titulo: tituloRow[headerIndex] as string,
                        tipo: tipoRow[headerIndex] as string,
                        datos: [],
                    };
    
                    // Obtener los datos adicionales del evento
                    for (let i = 3; i < data.length; i++) {
                        evento.datos.push(data[i][headerIndex] as string);
                    }
    
                    eventData.push(evento);
                }
            });
    
            setEvents(eventData);
        }
    };
    
    
    const eventsFilter = () => {
        if (data && headers) {
            const eventData: { id: string; name: string }[] = [];
            const nameRow = data[2]; // Obtener la fila con los nombres de los músicos

            headers.forEach((header: string, headerIndex: number) => {
                if (headerIndex >= 3) {
                    // A partir del cuarto valor del encabezado (el primero es 5)
                    const event: { id: string; name: string } = {
                        id: header, // Usar el valor del encabezado como parte del id
                        name: nameRow[header as unknown as number], // Obtener el nombre del músico de la misma columna
                    };
                    eventData.push(event);
                }
            });

            setMusicians(eventData);
        }
    }
        

    return (
        <div>
            {/* Input para seleccionar un archivo */}
            <input type="file" onChange={handleFileChange} accept=".csv" />
            <div className="flex-1 my-10">
                {/* Mostrar los datos del archivo CSV */}
                {musicians.map((musician, index) => (
                    <div key={index}>
                        <strong>{musician.id}</strong>
                        <p>{musician.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CSVImporter;