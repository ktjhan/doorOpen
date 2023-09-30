import { useState } from "react";
import FetchingData from "./FetchingData";

export interface DataItem {
  prompt: string;
  response: string;
}

export interface FetchingDataProps {
  data: DataItem[];
  loading: boolean;
  error: Error | null;
}

const ToggleExtension = () => {
  const [enabled, setEnabled] = useState(false);
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const toggleExtension = () => {
    setEnabled(!enabled);
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:4001/fetch-gpt/prompt");
      if (!response.ok) {
        throw Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
    <div className="App">
      <div className="App-header">
        <button onClick={toggleExtension}>
          {enabled ? "Disable" : "Enable"}
        </button>
        {enabled ? (
          <div>Extension is enabled</div>
        ) : (
          <div>Extension is disabled</div>
        )}
      </div>
      <button onClick={fetchData}>Fetch Data</button>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {data && <p>{JSON.stringify(data)}</p>}
      </div>
      <div className="results">
        <FetchingData data={data} loading={false} error={null} />
      </div>
    </div>
  );
};

export default ToggleExtension;
