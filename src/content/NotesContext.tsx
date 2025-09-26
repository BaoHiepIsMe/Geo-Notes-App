// src/content/NotesContext.tsx (đã chỉnh chú thích cho đúng thư mục hiện tại)

import { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';
import type { GeoNote } from '../type';

interface NotesContextProps {
  notes: GeoNote[];
  addNote: (note: GeoNote) => void;
}

const NotesContext = createContext<NotesContextProps | undefined>(undefined);

// Giả sử có dữ liệu mẫu để test
const initialNotes: GeoNote[] = [
  {
    id: '1',
    text: 'Vị trí trường Đại học CNTT & TT Việt-Hàn',
    latitude: 15.9818,
    longitude: 108.2526,
    timestamp: Date.now() - 3600000,
  },
];

export const NotesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<GeoNote[]>(initialNotes);

  const addNote = (note: GeoNote) => {
    // Thêm ghi chú mới vào đầu danh sách
    setNotes((prevNotes) => [note, ...prevNotes]);
  };

  return (
    <NotesContext.Provider value={{ notes, addNote }}>
      {children}
    </NotesContext.Provider>
  );
};

// Custom Hook để dễ dàng sử dụng Context
export const useNotes = () => {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};