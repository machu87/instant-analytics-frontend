import { Suggestion } from '../api'

export function AnalysisCard({ s, onAdd }:{ s: Suggestion, onAdd: ()=>void }){
  return (
    <div style={{border:'1px solid #e5e7eb', borderRadius:16, padding:16, display:'flex', flexDirection:'column', gap:8}}>
      <h3 style={{margin:0, fontWeight:600}}>{s.title}</h3>
      <span style={{fontSize:12, opacity:.7, textTransform:'uppercase'}}>{s.chart_type}</span>
      <p style={{margin:'8px 0'}}>{s.insight}</p>
      <button onClick={onAdd} style={{marginTop:8, background:'#111827', color:'#fff', border:'none', borderRadius:12, padding:'8px 12px', cursor:'pointer'}}>
        Agregar al Dashboard
      </button>
    </div>
  )
}
