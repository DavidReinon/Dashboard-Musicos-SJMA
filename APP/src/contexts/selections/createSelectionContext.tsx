import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";

interface SelectionContextData {
    formData: any; // Reemplaza 'any' con el tipo de tus datos del formulario
    musiciansSelection: string[];
    setFormData: (data: any) => void;
    setMusiciansSelection: Dispatch<SetStateAction<string[]>>;
}


const SelectionContext = createContext<SelectionContextData | undefined>(
  undefined
);

export const SelectionProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [formData, setFormData] = useState<any>(null);
    const [musiciansSelection, setMusiciansSelection] = useState<string[]>([]);

    return (
        <SelectionContext.Provider
            value={{
                formData,
                setFormData,
                musiciansSelection,
                setMusiciansSelection,
            }}
        >
            {children}
        </SelectionContext.Provider>
    );
};

export const useSelection = () => {
  const context = useContext(SelectionContext);
  if (!context) {
      throw new Error("useSelection must be used within a SelectionProvider");
  }
  return context;
};