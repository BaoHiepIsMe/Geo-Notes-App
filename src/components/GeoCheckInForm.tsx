// src/components/GeoCheckInForm.tsx

import React, { useState } from 'react';
import { Geolocation } from '@capacitor/geolocation';
import { useNotes } from '../content/NotesContext';
import type { GeoNote } from '../type';
import type { Position } from '@capacitor/geolocation'; // TYPE ONLY

const GeoCheckInForm: React.FC = () => {
  const [noteText, setNoteText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { addNote } = useNotes();

  const handleCheckIn = async () => {
    if (!noteText.trim()) {
      alert('Vui lòng nhập nội dung ghi chú.');
      return;
    }

    setIsLoading(true);
    try {
      // 1. Lấy vị trí GPS từ Capacitor
      const position: Position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000,
      });

      const newNote: GeoNote = {
        id: Date.now().toString(),
        text: noteText.trim(),
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        timestamp: Date.now(),
      };

      // 2. Lưu ghi chú vào Context
      addNote(newNote);

      // 3. Reset form
      setNoteText('');
      alert('Ghi chú đã được lưu thành công!');

    } catch (e: any) {
      console.error('Lỗi khi lấy vị trí hoặc lưu ghi chú:', e);
      alert(`Lỗi GPS: ${e.message}. Vui lòng kiểm tra quyền và GPS.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '20px', backgroundColor: '#f9f9f9' }}>
      <h3>1. Ghi chú vị trí hiện tại</h3>
      <input
        type="text"
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        placeholder="Nhập nội dung ghi chú..."
        style={{ width: '100%', padding: '10px', marginBottom: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
      />
      <button 
        onClick={handleCheckIn} 
        disabled={isLoading} 
        style={{ 
          padding: '10px 15px', 
          backgroundColor: isLoading ? '#6c757d' : '#007bff', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px', 
          cursor: 'pointer' 
        }}>
        {isLoading ? 'Đang lấy vị trí...' : '✅ Check-in & Lưu Ghi chú'}
      </button>
    </div>
  );
};

export default GeoCheckInForm;