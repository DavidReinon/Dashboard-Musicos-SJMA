import React from "react";

import { useSelection } from "@/src/contexts/selections/createSelectionContext";

const SubmitData: React.FC = () => {
    const { formData, musicians } = useSelection();

    // Aquí puedes usar 'formData' y 'musicians' para insertar los datos en la base de datos
    return (
        <div>
            <h1>Form Data</h1>
            <pre>{JSON.stringify(formData, null, 2)}</pre>
            <h1>Musicians</h1>
            <pre>{JSON.stringify(musicians, null, 2)}</pre>
        </div>
    );
};
