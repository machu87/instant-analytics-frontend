import { useState } from 'react'
import { uploadFile, analyze, chartData, Suggestion } from './api'
import { AnalysisCard } from './components/AnalysisCard'
import { ChartRenderer } from './components/Dashboard'

type PlacedChart = { suggestion: Suggestion, data: any[] }

export default function App(){
  const [uploadId,setUploadId] = useState<string>()
  const [loading,setLoading] = useState(false)
  const [suggestions,setSuggestions] = useState<Suggestion[]>([])
  const [dashboard,setDashboard] = useState<PlacedChart[]>([])

  async function onUpload(file: File){
    setLoading(true)
    const { upload_id } = await uploadFile(file)
    setUploadId(upload_id)
    const res = await analyze(upload_id)
    setSuggestions(res.suggestions)
    setLoading(false)
  }

  async function addToDashboard(s: Suggestion){
    if(!uploadId) return
    const { data } = await chartData(uploadId, s.parameters)
    setDashboard(d => [...d, { suggestion: s, data }])
  }

  return (
    <div style={{maxWidth:960, margin:'0 auto', padding:24, display:'grid', gap:24}}>
      <header style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <h1 style={{margin:0}}>Análisis al Instante</h1>
        <input type="file" accept=".csv,.xlsx" onChange={e=>e.target.files && onUpload(e.target.files[0])}/>
      </header>

      {loading && <div style={{padding:16, border:'1px solid #e5e7eb', borderRadius:12, opacity:.8}}>La IA está analizando tus datos…</div>}

      {!!suggestions.length && (
        <>
          <h2 style={{marginBottom:0}}>Sugerencias de la IA</h2>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))', gap:16}}>
            {suggestions.map((s,i)=>(
              <AnalysisCard key={i} s={s} onAdd={()=>addToDashboard(s)} />
            ))}
          </div>
        </>
      )}

      {!!dashboard.length && (
        <>
          <h2 style={{marginBottom:0}}>Tu Dashboard</h2>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))', gap:16}}>
            {dashboard.map((c,i)=>(
              <div key={i} style={{border:'1px solid #e5e7eb', borderRadius:16, padding:16}}>
                <h3 style={{marginTop:0}}>{c.suggestion.title}</h3>
                <ChartRenderer
                  type={c.suggestion.chart_type}
                  data={c.data}
                  x={c.suggestion.parameters.x_axis}
                  y={c.suggestion.parameters.y_axis}
                />
                <p style={{opacity:.7}}>{c.suggestion.insight}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
