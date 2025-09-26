// src/App.tsx

import React from 'react';
import GeoMap from './components/GeoMap';
import GeoCheckInForm from './components/GeoCheckInForm';
import NoteList from './components/NoteList'; // FIX: sửa '.src' -> './components'
// Sửa đường dẫn: thư mục đang đặt tên 'content'
import { NotesProvider, useNotes } from './content/NotesContext';
import './App.css'; // Nếu bạn có file CSS

// Component chứa giao diện và logic sử dụng Context
const AppContent: React.FC = () => {
    const { notes } = useNotes();
    
    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
            <h1>Geo-Notes 📍</h1>
            
            {/* 1. Form Check-in */}
            <GeoCheckInForm />

            {/* 2. Bản đồ */}
            <h2>2. Bản đồ ghi chú</h2>
            <GeoMap notes={notes} />
            
            {/* 3. Danh sách ghi chú */}
            <h2 style={{marginTop: '40px'}}>3. Danh sách các ghi chú ({notes.length} điểm)</h2>
            <NoteList notes={notes} />
        </div>
    );
}

// Bọc ứng dụng bằng NotesProvider (cần thiết cho Context)
const App: React.FC = () => (
    <NotesProvider>
        <AppContent />
    </NotesProvider>
);

export default App;