export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

export async function uploadFile(file: File){
  const fd = new FormData()
  fd.append('file', file)
  const res = await fetch(`${API_URL}/api/upload`, { method:'POST', body: fd })
  return res.json()
}

export type Suggestion = {
  title: string
  chart_type: 'bar'|'line'|'pie'|'scatter'|'area'
  parameters: Record<string,string>
  insight: string
}

export async function analyze(upload_id: string){
  const res = await fetch(`${API_URL}/api/analyze`, {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ upload_id })
  })
  return res.json() as Promise<{ suggestions: Suggestion[] }>
}

export async function chartData(upload_id: string, parameters: Record<string,string>){
  const res = await fetch(`${API_URL}/api/chart-data`, {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ upload_id, parameters })
  })
  return res.json() as Promise<{ data: any[] }>
}
