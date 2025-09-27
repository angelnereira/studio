"use client";

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { artistsData, genreEvolution, marketMetrics, platformGrowth, ArtistData, COLORS } from '@/lib/blog-data';

const PanamaDeepMusicAnalysis: React.FC = () => {
  const [selectedArtist, setSelectedArtist] = React.useState<string>('sech');
  const [timeRange, setTimeRange] = React.useState<string>('5years');
  const [selectedMetric, setSelectedMetric] = React.useState<string>('listeners');

  const currentData = artistsData[selectedArtist];

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          🇵🇦 Panorama Musical Panameño 2019-2024
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Análisis profundo de la evolución de artistas y tendencias musicales en Panamá
        </p>
      </div>

      {/* Controles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white dark:bg-slate-800/50 p-4 rounded-lg shadow-md">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Seleccionar Artista
          </label>
          <select 
            value={selectedArtist} 
            onChange={(e) => setSelectedArtist(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
          >
            <option value="sech">Sech - Multi-Platinum</option>
            <option value="joeyMontana">Joey Montana - Veterano</option>
            <option value="elRoockie">El Roockie - Rey de Lírica</option>
            <option value="boza">Boza - Nueva Generación</option>
          </select>
        </div>

        <div className="bg-white dark:bg-slate-800/50 p-4 rounded-lg shadow-md">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Período de Análisis
          </label>
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
          >
            <option value="5years">Últimos 5 años</option>
            <option value="3years">Últimos 3 años</option>
            <option value="1year">Último año</option>
          </select>
        </div>

        <div className="bg-white dark:bg-slate-800/50 p-4 rounded-lg shadow-md">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Métrica Principal
          </label>
          <select 
            value={selectedMetric} 
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
          >
            <option value="listeners">Monthly Listeners</option>
            <option value="streams">Total Streams</option>
            <option value="chartPositions">Posiciones en Charts</option>
          </select>
        </div>
      </div>

      {/* Métricas del Artista Seleccionado */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-xl text-white">
          <h3 className="text-sm font-semibold opacity-90">Oyentes Mensuales</h3>
          <p className="text-3xl font-bold">{(currentData.currentMonthlyListeners / 1000000).toFixed(1)}M</p>
          <p className="text-sm opacity-80">Pico: {(currentData.peakListeners / 1000000).toFixed(1)}M</p>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6 rounded-xl text-white">
          <h3 className="text-sm font-semibold opacity-90">Total Streams</h3>
          <p className="text-3xl font-bold">{(currentData.totalStreams / 1000000000).toFixed(1)}B</p>
          <p className="text-sm opacity-80">Acumulado histórico</p>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-red-600 p-6 rounded-xl text-white">
          <h3 className="text-sm font-semibold opacity-90">Plataforma Líder</h3>
          <p className="text-3xl font-bold">Spotify</p>
          <p className="text-sm opacity-80">{(Math.max(...Object.values(currentData.platforms)) / 1000000).toFixed(1)}M seguidores</p>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-6 rounded-xl text-white">
          <h3 className="text-sm font-semibold opacity-90">Demografía Principal</h3>
          <p className="text-3xl font-bold">18-24</p>
          <p className="text-sm opacity-80">{Math.max(...Object.values(currentData.demographics))}% audiencia</p>
        </div>
      </div>

      {/* Evolución del Artista */}
      <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Evolución de {currentData.name} (2019-2024)
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={currentData.evolutionData}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis dataKey="year" tick={{ fill: '#a0aec0' }} />
            <YAxis yAxisId="left" tick={{ fill: '#a0aec0' }} />
            <YAxis yAxisId="right" orientation="right" tick={{ fill: '#a0aec0' }} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1a202c', border: '1px solid #4a5568' }}
              formatter={(value: any, name: string) => {
                if (name === 'listeners') return [`${(value / 1000000).toFixed(1)}M`, 'Monthly Listeners'];
                if (name === 'streams') return [`${(value / 1000000).toFixed(0)}M`, 'Streams Anuales'];
                return [value, name];
              }}
            />
            <Legend />
            <Line 
              yAxisId="left" 
              type="monotone" 
              dataKey="listeners" 
              stroke="#667eea" 
              strokeWidth={3}
              name="Monthly Listeners"
            />
            <Line 
              yAxisId="right" 
              type="monotone" 
              dataKey="streams" 
              stroke="#764ba2" 
              strokeWidth={3}
              name="Streams Anuales"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Distribución Demográfica */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Distribución por Edad - {currentData.name}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: '18-24', value: currentData.demographics.age18_24 },
                  { name: '25-34', value: currentData.demographics.age25_34 },
                  { name: '35-44', value: currentData.demographics.age35_44 },
                  { name: '45+', value: currentData.demographics.age45plus }
                ]}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                labelLine={false}
                label={(entry) => `${entry.name}: ${entry.value}%`}
              >
                {COLORS.map((color, index) => (
                  <Cell key={`cell-${index}`} fill={color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1a202c', border: '1px solid #4a5568' }}/>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Presencia en Plataformas
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={Object.entries(currentData.platforms).map(([platform, followers]) => ({
                platform: platform.charAt(0).toUpperCase() + platform.slice(1),
                followers: followers / 1000000
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
              <XAxis dataKey="platform" tick={{ fill: '#a0aec0' }} />
              <YAxis tick={{ fill: '#a0aec0' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a202c', border: '1px solid #4a5568' }}
                formatter={(value: any) => [`${value.toFixed(1)}M`, 'Seguidores']} />
              <Bar dataKey="followers" fill="#667eea" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Evolución de Géneros */}
      <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Evolución de Géneros Musicales en Panamá (% Market Share)
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={genreEvolution}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis dataKey="genre" tick={{ fill: '#a0aec0' }} />
            <YAxis tick={{ fill: '#a0aec0' }} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1a202c', border: '1px solid #4a5568' }}
              formatter={(value: any) => [`${value}%`, 'Market Share']} />
            <Legend />
            <Bar dataKey="2019" stackId="a" fill="#ff7c7c" />
            <Bar dataKey="2020" stackId="a" fill="#ffd93d" />
            <Bar dataKey="2021" stackId="a" fill="#6bcf7f" />
            <Bar dataKey="2022" stackId="a" fill="#4d96ff" />
            <Bar dataKey="2023" stackId="a" fill="#9c88ff" />
            <Bar dataKey="2024" stackId="a" fill="#667eea" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Crecimiento de Plataformas */}
      <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Crecimiento de Usuarios por Plataforma en Panamá
        </h2>
        <ResponsiveContainer width="100%" height={400}>
           <LineChart data={platformGrowth}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis dataKey="platform" tick={{ fill: '#a0aec0' }} />
            <YAxis tick={{ fill: '#a0aec0' }}/>
            <Tooltip 
              contentStyle={{ backgroundColor: '#1a202c', border: '1px solid #4a5568' }}
              formatter={(value: any) => [`${(value / 1000000).toFixed(1)}M`, 'Usuarios']}
            />
            <Legend />
            <Line type="monotone" dataKey="2019" stroke="#ff7c7c" />
            <Line type="monotone" dataKey="2020" stroke="#ffd93d" />
            <Line type="monotone" dataKey="2021" stroke="#6bcf7f" />
            <Line type="monotone" dataKey="2022" stroke="#4d96ff" />
            <Line type="monotone" dataKey="2023" stroke="#9c88ff" />
            <Line type="monotone" dataKey="2024" stroke="#667eea" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Métricas del Mercado */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {marketMetrics.map((metric, index) => (
          <div key={index} className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">{metric.metric}</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {typeof metric.value === 'number' && metric.value >= 1000000000
                ? `${(metric.value / 1000000000).toFixed(1)}B`
                : typeof metric.value === 'number' && metric.value >= 1000000
                ? `${(metric.value / 1000000).toFixed(1)}M`
                : metric.value + (typeof metric.value === 'number' ? '%' : '')}
            </p>
            <p className="text-sm text-green-600 font-semibold">{metric.change}</p>
          </div>
        ))}
      </div>

      {/* Insights y Conclusiones */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 rounded-xl text-white">
        <h2 className="text-2xl font-bold mb-6">🔍 Insights Clave del Análisis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Tendencias Dominantes</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li>• Reggaetón creció 52% desde 2019, dominando 68% del mercado</li>
              <li>• Dembow emergente: crecimiento 212% en 5 años</li>
              <li>• Sech mantiene liderazgo pese a declive post-pico 2022</li>
              <li>• Nueva generación (Boza) con fuerte presencia TikTok</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Oportunidades</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li>• TikTok: 133% crecimiento, ideal para artistas emergentes</li>
              <li>• Demografía 18-24: 45-58% de audiencia principal</li>
              <li>• Colaboraciones regionales incrementan 35% el alcance</li>
              <li>• Apple Music: menor saturación, 394% crecimiento</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        Datos actualizados: Septiembre 2025 | Fuentes: Spotify for Artists, YouTube Analytics, Social Media Analytics
      </div>
    </div>
  );
};

export default PanamaDeepMusicAnalysis;
