// src/components/NoteList.tsx

import React from 'react';
import type { GeoNote } from '../type';

const NoteList: React.FC<{ notes: GeoNote[] }> = ({ notes }) => {
    return (
        <ul style={{ listStyle: 'none', padding: 0 }}>
            {notes.map(note => (
                <li key={note.id} style={{ borderBottom: '1px dotted #ccc', padding: '10px 0' }}>
                    <strong>{note.text}</strong>
                    <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
                        Tọa độ: ({note.latitude.toFixed(4)}, {note.longitude.toFixed(4)}) - 
                        Thời gian: {new Date(note.timestamp).toLocaleString()}
                    </p>
                </li>
            ))}
        </ul>
    );
};
export default NoteList;