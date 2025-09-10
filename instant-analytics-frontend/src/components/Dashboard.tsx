import { ResponsiveContainer, BarChart, Bar, LineChart, Line, PieChart, Pie, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

export function ChartRenderer({ type, data, x, y }:{
  type: 'bar'|'line'|'pie'|'scatter'|'area'
  data: any[]
  x?: string
  y?: string
}){
  if(type==='bar'){
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey={x}/>
          <YAxis/>
          <Tooltip/>
          <Bar dataKey={y}/>
        </BarChart>
      </ResponsiveContainer>
    )
  }
  if(type==='line'){
    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey={x}/>
          <YAxis/>
          <Tooltip/>
          <Line dataKey={y}/>
        </LineChart>
      </ResponsiveContainer>
    )
  }
  if(type==='pie'){
    return (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Tooltip/>
          <Pie data={data} dataKey={y!} nameKey={x!} label />
        </PieChart>
      </ResponsiveContainer>
    )
  }
  return <div>Tipo de gráfico no implementado aún.</div>
}
