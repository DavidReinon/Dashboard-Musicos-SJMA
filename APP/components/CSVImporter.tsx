"use client";

import { useEffect, useState } from "react";
import csv from "csvtojson";

interface Musician {
    id: string;
    displayName: string;
    instrument: string;
}

interface Event {
    fecha: string;
    titulo: string;
    musiciansAttendance: string[];
}

const EVENT_START_ROW_INDEX = 3;
const MUSICIAN_START_COL_INDEX = 3;

const csvTry = `Fecha,Título,Tipo,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137
,,,Maria  Vila Barceló,Carlos Riera Andreu,Adrián Pardo,Aida Domingo,Aitana  Sanmartin Cruceira,Aitana Sanchis Rosaleñ,Alba Femenía,Almaa Lopez de Haro Cabanes,Carles Rosaleny,Carolina Destruels,Celia Perelló,Claudia Martínez,David  Romero Gisbert,David Ramon,Isabel Guillem Romero,M. J Postigo,Marisa Rico Orero,Nuria  Camarasa Baviera,Paula Lloria,Silvia Alemany Jiménez,Teresa Junquera Marin,Víctor Zhou,amparo soler,noemi gimeno,Naomi Navarro Olmos,Ángela Águila,Aitana Femenia Cosme,Alba García Fernández,Ana Martí,Anais,Andrea Vidal,Anna  Fibla,Antonio Hernando Leon,Belén Martínez,Elena Baviera Moreno,Helena Soria Rodrigo,Julià ROMEU Furió,Leticia Ferrer Corella,Lidia Ricarte Ferrer,Loli Pérez Arcís,Lucía Lloria Villanova,Maite Genoves,Marce Rosaleny G.,Maria del mar Losa martinez,Marin Marin,María Buendia,María Jose Lucas Marí,María José Hernández Hernández,Miguel Ángel Ricart Cabañero,Mónica Atienza,Noelia Marí Corraliza,Noemi Verdejo,Sara Lozano Peiró,Fran Comes chilet,Ana Mansilla,Isamar Capó García,Jesús  Puchades García,Joan Navarro Genoves,Julio Martí Crespo,Nuria Gómez León,Pau Serrano,Richard Navarro,Víctor Soria Rodrigo,Yeray Avila,Álvaro Cuenca,David Ricart,Manuel   Pedraza Méndez,Masi,Ana Comes,Carles Ricart,Carlos Gómez-Lobo Martínez,David Ruiz Raga,Empar Xinqi Albert i Peris,Encarna Romero,Francisco Camacho Verdeguer,Pedro Marín Puchades,Verónica  Sanchez Bretones,Borja Ruiz,Diego Parra Sancho,Carles Vila,Dani Reinón García,Fco javier Lujan lujan,Irene Parra Sancho,Javi Chulià,Joaquín De La Hoz Raga,Pau Ricart Ferrer,Ruben Marí,Tommy solera,Álvaro  Casasús Ruiz,Abraham Mora,David Sancho Vila,Diego  Arjona,Fran Soler,Gloria  Atienza,Gonzalo  Atienza,Hugo  Leon,Julio  Puchalt,Manuel  Gómez Gimeno,Pablo González,Ricardo Comes Benavent,Rosana Fernández,Gorka  Garcia de Torres,Jaume Hernández,Javi Deval,Marc  Ferrer,Carles Miguel Romeu,Manolo  Gómez Gómez,Marce Rosaleny Romero,Pedro Ricart cabañero,Tomas Gabriel Alemany Rosaleny,Albert Martínez,Alfons Vila Barceló,Andrea Sebastià Alcaide,Elena  Gómez Gimeno,Maria Perez Domenech,Nuria Sancho Vila,Pablo Perelló,Sofía Estrela Pascual,Alejandra Capó,Alex Ramon Bellver,Ana  Benavent Femnía,Asier García de Torres,Erik Cruz Alapont,Juan Carlos  Muñoz Sánchez,Leire Abarca,Luis  Del Rio Chulvi,Mario Fabuel Garcia,Miguel Barberá,Miguel Hervas,Miguel Ángel  Zaragozá Marí,Nayla Pérez,Sònia Guillem,Àlex Ramon
,,,Flautín,Dirección musical,Flauta,Flauta,Flauta,Flauta,Flauta,Flauta,Flauta,Flauta,Flauta,Flauta,Flauta,Flauta,Flauta,Flauta,Flauta,Flauta,Flauta,Flauta,Flauta,Flauta,Flauta,Flauta,Fagot,Fagot,Clarinete,Clarinete,Clarinete,Clarinete,Clarinete,Clarinete,Clarinete,Clarinete,Clarinete,Clarinete,Clarinete,Clarinete,Clarinete,Clarinete,Clarinete,Clarinete,Clarinete,Clarinete,Clarinete,Clarinete,Clarinete,Clarinete,Clarinete,Clarinete,Clarinete,Clarinete,Clarinete,Clarinete bajo,Saxofón alto,Saxofón alto,Saxofón alto,Saxofón alto,Saxofón alto,Saxofón alto,Saxofón alto,Saxofón alto,Saxofón alto,Saxofón alto,Saxofón alto,Saxofón tenor,Saxofón tenor,Saxofón barítono,Trompa,Trompa,Trompa,Trompa,Trompa,Trompa,Trompa,Trompa,Trompa,Fliscorno,Fliscorno,Trompeta,Trompeta,Trompeta,Trompeta,Trompeta,Trompeta,Trompeta,Trompeta,Trompeta,Trompeta,Trombón,Trombón,Trombón,Trombón,Trombón,Trombón,Trombón,Trombón,Trombón,Trombón,Trombón,Trombón,Bombardino,Bombardino,Bombardino,Bombardino,Tuba,Tuba,Tuba,Tuba,Tuba,Violonchelo,Violonchelo,Violonchelo,Violonchelo,Violonchelo,Violonchelo,Violonchelo,Violonchelo,Percusión,Percusión,Percusión,Percusión,Percusión,Percusión,Percusión,Percusión,Percusión,Percusión,Percusión,Percusión,Percusión,Percusión,Percusión
12/12/2023,Assaig General - Nadal,Ensayo,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,No convocado,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,No convocado,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente
15/12/2023,Assaig General - Nadal,Ensayo,Pendiente,Sí,Sí,Sí,Sí,Sí,Sí,No convocado,Pendiente,Pendiente,Sí,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Sí,Pendiente,Sí,Sí,Sí,Sí,Sí,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Sí,Pendiente,Sí,Pendiente,Pendiente,Sí,Sí,Pendiente,Sí,Pendiente,Pendiente,Pendiente,Pendiente,Sí,Pendiente,Pendiente,Pendiente,Sí,Sí,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Sí,Pendiente,Sí,Pendiente,Pendiente,Pendiente,Sí,Pendiente,Pendiente,Pendiente,Sí,Pendiente,Sí,Pendiente,Sí,Sí,Sí,Pendiente,Sí,Pendiente,Sí,Sí,Sí,Sí,Pendiente,Sí,Sí,Pendiente,Pendiente,Sí,Pendiente,Pendiente,Pendiente,Sí,Pendiente,Pendiente,Pendiente,Sí,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Sí,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Sí,Pendiente,Pendiente,Pendiente,Pendiente,No convocado,Pendiente,Sí,Sí,Sí,Sí,Sí,Sí,Pendiente,Sí,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Sí,Pendiente,Pendiente
19/12/2023,Assaig General - Nadal,Ensayo,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,No convocado,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,No convocado,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente,Pendiente
`;

const CSVImporter = () => {
    // const [data, setData] = useState<CsvData[] | null>(null);
    const [headers, setHeaders] = useState<string[] | null>(null);
    const [musicians, setMusicians] = useState<Musician[]>([]);
    //REVIEW: Preguntar si se puede hacer un array de eventos, donde cada evento tiene un array de musicos
    /*
    Informacion de los eventos, y aparte la asistencia de cada musisco al avento,
    el cual será otro array, por lo cual array de eventos donde en cada evento dentro,
    hay array de objetos donde cada objeto es un musico con su asistencia(attendance);

    */
    const [events, setEvents] = useState<Event[]>([]);

    const parseMusicians = async (
        rows: string[],
        csvClient = csv({ flatKeys: true, output: "csv", noheader: true })
    ) => {
        const csvData = rows
            .map((row) =>
                row.split(",").slice(MUSICIAN_START_COL_INDEX).join(",")
            )
            .join("\n");
        const musiciansCsv: string[][] = await csvClient.fromString(csvData);
        return musiciansCsv[0].map((_, i) => ({
            id: musiciansCsv[0][i],
            displayName: musiciansCsv[1][i],
            instrument: musiciansCsv[2][i],
        }));
    };

    const parseEvents = (
        rows: string[],
        csvClient = csv({ flatKeys: true, ignoreColumns: RegExp("Tipo") })
    ) => {
        const csvData = rows
            .map((row) =>
                row.split(",").slice(0, MUSICIAN_START_COL_INDEX).join(",")
            )
            .join("\n");
        return csvClient.fromString(csvData);
    };

    const parseCsv = async (csvString: string) => {
        const [header, ...rows] = csvString.split("\n");

        const musicianRows = rows.slice(0, EVENT_START_ROW_INDEX);
        const musicians = await parseMusicians([header, ...musicianRows]);

        const eventRows = rows.slice(EVENT_START_ROW_INDEX);
        const events = await parseEvents([header, ...eventRows]);
        console.log(events);
    };

    useEffect(() => {
        parseCsv(csvTry);
    }, []);

    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const fileData = await file.text();

        const data = await csv({ flatKeys: false }).fromString(fileData);
    };

    // const extractMusiciansData = () => {
    //     if (data && headers) {
    //         const musicianData: {
    //             id: string;
    //             display_name: string;
    //             instrument: string;
    //         }[] = [];
    //         const nameRow = data[0];
    //         const intrumentRow = data[1]; //Si no funciona => Object.create

    //         Object.entries(nameRow).forEach(([key, value]) => {
    //             //REVIEW: Preguntar si todos los IDS serán numeros, o si pueden contener letras
    //             //para hacer la comprobacion o no.
    //             const keyId = parseInt(key);
    //             if (!isNaN(keyId) && keyId >= 3) {
    //                 const musician: {
    //                     id: string;
    //                     display_name: string;
    //                     instrument: string;
    //                 } = {
    //                     id: key, // Usar el valor del encabezado como parte del id
    //                     display_name: value, // Obtener el valor del nombre del músico
    //                     instrument: intrumentRow[key], // Acceder al valor del instrumento basado en el key
    //                 };
    //                 musicianData.push(musician);
    //             }
    //         });

    //         setMusicians(musicianData);
    //     }
    // };

    // const extractEventsData = () => {
    //     if (data && headers) {
    //         const eventsData: {
    //             display_name: string;
    //             date: string;
    //         }[] = [];

    //         const musiciansAttendaceData: {
    //             musician_id: string;
    //             event_id: string;
    //             attendace: string;
    //         }[] = [];

    //         data.map((rowObject, indexRowObject) => {
    //             //Recorrecome cada fila del archivo CSV
    //             if (indexRowObject > 2) {
    //                 let fecha: string = "";
    //                 let titulo: string = "";
    //                 //Recorre cada columna de la fila
    //                 Object.entries(rowObject).forEach(([key, value]) => {
    //                     if (key === "Fecha") {
    //                         fecha = value;
    //                         return;
    //                     }
    //                     if (key === "Titulo") {
    //                         titulo = value;
    //                         return;
    //                     }
    //                     if (key === "Ensayo") {
    //                         return;
    //                     }

    //                     const musicianAttendace: {
    //                         musician_id: string;
    //                         //Comparando el titulo con la BD y sacando el id
    //                         event_id: string;
    //                         attendace: string;
    //                     } = {
    //                         musician_id: key,
    //                         event_id: "",
    //                         attendace: value,
    //                     };

    //                     // Add the musicianAttendace object to musiciansAttendaceData array
    //                     musiciansAttendaceData.push(musicianAttendace);
    //                 }); // Close the missing opening curly brace for Object.entries

    //                 const event: {
    //                     display_name: string;
    //                     date: string;
    //                 } = { display_name: titulo, date: fecha };
    //                 eventsData.push(event);
    //             }
    //         }); // Close the missing opening curly brace for data.map
    //         setEvents(eventsData);
    //     }
    // };

    return (
        <div>
            {/* Input para seleccionar un archivo */}
            <input type="file" onChange={handleFileChange} accept=".csv" />
            <div className="flex-1 my-10">
                {/* Mostrar los encabezados del archivo CSV */}
                {/* {data && (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Instrument</th>
                            </tr>
                        </thead>
                        <tbody>
                            {musicians.map((musician) => (
                                <tr key={musician.id}>
                                    <td>{musician.id}</td>
                                    <td>{musician.display_name}</td>
                                    <td>{musician.instrument}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )} */}
            </div>
        </div>
    );
};

export default CSVImporter;
