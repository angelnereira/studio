"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface ArtistData {
  name: string;
  monthlyListeners: number;
  totalStreams: number;
  countries: number;
  peakListeners: number;
  spotifyFollowers: number;
  youtubeSubscribers?: number;
  recognition: string[];
  reach: 'Global' | 'Internacional' | 'Regional' | 'Nacional';
}

const artistsData: Record<string, ArtistData> = {
  sech: {
    name: 'Sech',
    monthlyListeners: 24000000,
    totalStreams: 1400000000,
    countries: 75,
    peakListeners: 24000000,
    spotifyFollowers: 10000000,
    youtubeSubscribers: 10000000,
    recognition: ['Top 50 Global Spotify', '#1 Global Viral 50', 'Multi-Platinum'],
    reach: 'Global'
  },
  boza: {
    name: 'Boza',
    monthlyListeners: 11600000,
    totalStreams: 491900000,
    countries: 177,
    peakListeners: 43400000,
    spotifyFollowers: 4500000,
    recognition: ['Forbes 30 Under 30', 'Latin Grammy Nom.', 'Spotify RADAR'],
    reach: 'Global'
  },
  elRoockie: {
    name: 'El Roockie',
    monthlyListeners: 1300000,
    totalStreams: 150000000,
    countries: 50,
    peakListeners: 1500000,
    spotifyFollowers: 800000,
    recognition: ['Grammy Latino Nom. 2003', 'Rey de las Letras'],
    reach: 'Internacional'
  },
  kafuBanton: {
    name: 'Kafu Banton',
    monthlyListeners: 760000,
    totalStreams: 89000000,
    countries: 30,
    peakListeners: 850000,
    spotifyFollowers: 500000,
    recognition: ['Leyenda del Reggae', 'Activo desde 1979'],
    reach: 'Regional'
  },
  yemil: {
    name: 'Yemil',
    monthlyListeners: 81200,
    totalStreams: 4900000,
    countries: 79,
    peakListeners: 120000,
    spotifyFollowers: 45000,
    recognition: ['Artista Emergente', 'Colaboraciones Internacionales'],
    reach: 'Internacional'
  }
};

export function MusicArtistComparison() {
  const [artist1, setArtist1] = useState('sech');
  const [artist2, setArtist2] = useState('boza');

  const data1 = artistsData[artist1];
  const data2 = artistsData[artist2];

  const comparisonData = [
    {
      name: 'Oyentes Mensuales',
      [data1.name]: data1.monthlyListeners / 1000000,
      [data2.name]: data2.monthlyListeners / 1000000,
    },
    {
      name: 'Total Streams',
      [data1.name]: data1.totalStreams / 1000000000,
      [data2.name]: data2.totalStreams / 1000000000,
    },
    {
      name: 'Países Alcanzados',
      [data1.name]: data1.countries,
      [data2.name]: data2.countries,
    },
    {
      name: 'Seguidores Spotify',
      [data1.name]: data1.spotifyFollowers / 1000000,
      [data2.name]: data2.spotifyFollowers / 1000000,
    },
  ];

  const radarData = [
    {
      metric: 'Alcance Global',
      [data1.name]: Math.min((data1.countries / 177) * 100, 100),
      [data2.name]: Math.min((data2.countries / 177) * 100, 100),
    },
    {
      metric: 'Popularidad',
      [data1.name]: Math.min((data1.monthlyListeners / 43400000) * 100, 100),
      [data2.name]: Math.min((data2.monthlyListeners / 43400000) * 100, 100),
    },
    {
      metric: 'Reconocimiento',
      [data1.name]: (data1.recognition.length / 5) * 100,
      [data2.name]: (data2.recognition.length / 5) * 100,
    },
    {
      metric: 'Engagement',
      [data1.name]: Math.min((data1.spotifyFollowers / 10000000) * 100, 100),
      [data2.name]: Math.min((data2.spotifyFollowers / 10000000) * 100, 100),
    },
  ];

  return (
    <div className="space-y-6 w-full max-w-7xl mx-auto p-4 sm:p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl font-headline">
            Comparación Interactiva de Artistas
          </CardTitle>
          <CardDescription>
            Compara las estadísticas y alcance de artistas panameños
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Selectores de artistas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="space-y-2">
              <label className="text-sm font-medium">Artista 1</label>
              <Select value={artist1} onValueChange={setArtist1}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(artistsData).map((key) => (
                    <SelectItem key={key} value={key}>
                      {artistsData[key].name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Artista 2</label>
              <Select value={artist2} onValueChange={setArtist2}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(artistsData).map((key) => (
                    <SelectItem key={key} value={key}>
                      {artistsData[key].name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tarjetas de resumen */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Artista 1 */}
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30">
              <CardHeader>
                <CardTitle className="text-xl">{data1.name}</CardTitle>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{data1.reach}</Badge>
                  {data1.recognition.slice(0, 2).map((rec, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {rec}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Oyentes Mensuales</span>
                  <span className="text-lg font-bold">{(data1.monthlyListeners / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Streams</span>
                  <span className="text-lg font-bold">{(data1.totalStreams / 1000000000).toFixed(1)}B</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Países</span>
                  <span className="text-lg font-bold">{data1.countries}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Pico de Oyentes</span>
                  <span className="text-lg font-bold">{(data1.peakListeners / 1000000).toFixed(1)}M</span>
                </div>
              </CardContent>
            </Card>

            {/* Artista 2 */}
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30">
              <CardHeader>
                <CardTitle className="text-xl">{data2.name}</CardTitle>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{data2.reach}</Badge>
                  {data2.recognition.slice(0, 2).map((rec, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {rec}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Oyentes Mensuales</span>
                  <span className="text-lg font-bold">{(data2.monthlyListeners / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Streams</span>
                  <span className="text-lg font-bold">{(data2.totalStreams / 1000000000).toFixed(1)}B</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Países</span>
                  <span className="text-lg font-bold">{data2.countries}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Pico de Oyentes</span>
                  <span className="text-lg font-bold">{(data2.peakListeners / 1000000).toFixed(1)}M</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Gráfico de barras comparativo */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Comparación de Métricas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full overflow-x-auto">
                <ResponsiveContainer width="100%" height={300} minWidth={300}>
                  <BarChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 12 }}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '6px',
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                    <Bar dataKey={data1.name} fill="hsl(217, 91%, 60%)" />
                    <Bar dataKey={data2.name} fill="hsl(271, 91%, 65%)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Radar Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Análisis de Perfil</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Comparación multidimensional (normalizado al 100%)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full overflow-x-auto">
                <ResponsiveContainer width="100%" height={350} minWidth={300}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis
                      dataKey="metric"
                      tick={{ fontSize: 11, fill: 'hsl(var(--foreground))' }}
                    />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                    <Radar
                      name={data1.name}
                      dataKey={data1.name}
                      stroke="hsl(217, 91%, 60%)"
                      fill="hsl(217, 91%, 60%)"
                      fillOpacity={0.5}
                    />
                    <Radar
                      name={data2.name}
                      dataKey={data2.name}
                      stroke="hsl(271, 91%, 65%)"
                      fill="hsl(271, 91%, 65%)"
                      fillOpacity={0.5}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
