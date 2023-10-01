import { useState } from "react";
// import FetchingData from "./FetchingData";
import SearchBar from "./SearchBar";

export interface DataItem {
  prompt: string;
  response: string;
}

export interface FetchingDataProps {
  data: DataItem[];
  loading: boolean;
  error: Error | null;
}

const ToggleExtension: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);


  const toggleExtension = () => {
    setEnabled(!enabled);
  };

  return (
    <div className="App">
      <div className="App-header">
        <button onClick={toggleExtension}>
          {enabled ? "Disable" : "Enable"}
        </button>
        {enabled ? (
          <SearchBar />
        ) : (
          <div>Extension is disabled</div>
        )}
      </div>
    </div>
  );
};

export default ToggleExtension;
