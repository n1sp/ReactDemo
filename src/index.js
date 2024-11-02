import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
const { useState } = React;

function App() {
  const [businessName, setBusinessName] = useState('');
  const [businessContent, setBusinessContent] = useState('');
  const [toolsUsed, setToolsUsed] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      businessName,
      businessContent,
      toolsUsed,
    };

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        alert('データが正常に登録されました！');
        setBusinessName('');
        setBusinessContent('');
        setToolsUsed('');
      } else {
        alert('エラーが発生しました。もう一度お試しください。');
      }
    } catch (error) {
      console.error('エラー:', error);
      alert('通信エラーが発生しました。');
    }
  };

  return (
    <div className="container">
      <h1>業務報告登録</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>業務名（20文字まで）:</label>
          <input
            type="text"
            maxLength="20"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>業務内容（500文字まで）:</label>
          <textarea
            maxLength="500"
            value={businessContent}
            onChange={(e) => setBusinessContent(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>使用ツール:</label>
          <input
            type="text"
            value={toolsUsed}
            onChange={(e) => setToolsUsed(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">登録</button>
      </form>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);