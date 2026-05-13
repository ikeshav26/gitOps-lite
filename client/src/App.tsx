import axios, { AxiosError } from "axios"
import { useState, useCallback } from "react"

interface Data {
  message: string
  timestamp: string
}

const App = () => {
  const [data, setData] = useState<Data | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await axios.get<Data>(
        `${import.meta.env.VITE_API_BASE_URL}/api/data`,
        { withCredentials: true }
      )
      setData(res.data)
    } catch (err) {
      const message = err instanceof AxiosError
        ? err.response?.data?.message || err.message
        : "Failed to fetch data"
      setError(message)
      console.error("Error fetching data:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <div style={{ padding: "20px", fontFamily: "system-ui" }}>
      <h1>Welcome to the App!</h1>
      <img src="favicon.svg" alt="Logo"/>
      <button 
        onClick={fetchData} 
        disabled={loading}
        style={{ padding: "8px 16px", cursor: loading ? "not-allowed" : "pointer" }}
      >
        {loading ? "Loading..." : "Fetch Data"}
      </button>

      {error && (
        <div style={{ color: "red", marginTop: "10px" }}>
          <p>Error: {error}</p>
        </div>
      )}

      {data && (
        <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px" }}>
          <p><strong>Message:</strong> {data.message}</p>
          <p><strong>Timestamp:</strong> {new Date(data.timestamp).toLocaleString()}</p>
        </div>
      )}
    </div>
  )
}

export default App