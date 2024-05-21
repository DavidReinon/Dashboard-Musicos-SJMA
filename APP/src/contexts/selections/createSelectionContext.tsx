import { createContext, useContext, useState } from 'react';

interface SelectionContextData {
  formData: any; // Reemplaza 'any' con el tipo de tus datos del formulario
  musicians: any[]; // Reemplaza 'any' con el tipo de tus músicos
  setFormData: (data: any) => void;
  setMusicians: (musicians: any[]) => void;
}

const SelectionContext = createContext<SelectionContextData | undefined>(undefined);

export const useSelection = () => {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error('useSelection must be used within a SelectionProvider');
  }
  return context;
};

export const SelectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [formData, setFormData] = useState<any>(null); // Reemplaza 'any' con el tipo de tus datos del formulario
    const [musicians, setMusicians] = useState<any[]>([]); // Reemplaza 'any' con el tipo de tus músicos

    return (
        <SelectionContext.Provider value={{ formData, musicians, setFormData, setMusicians }}>
            {children}
        </SelectionContext.Provider>
    );
};