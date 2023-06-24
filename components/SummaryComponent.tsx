import React, { useState } from 'react';

const SummarizeComponent: React.FC = () => {
  const [paragraph, setParagraph] = useState('');
  const [summary, setSummary] = useState('');

  const handleSummarize = () => {
    // Kode untuk memproses meringkas paragraf
    // ...

    // Contoh: Set summary ke paragraf yang telah dimodifikasi
    setSummary(paragraph);
  };

  return (
    <div>
      <textarea
        value={paragraph}
        onChange={(e) => setParagraph(e.target.value)}
        placeholder="Masukkan paragraf untuk diringkas..."
        rows={5}
      />
      <button onClick={handleSummarize}>Ringkas</button>
      {summary && <p>{summary}</p>}
    </div>
  );
};

export default SummarizeComponent;
