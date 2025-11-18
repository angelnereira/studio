"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { AnimatedDiv } from './animated-div';
import { Separator } from './ui/separator';

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
      name: 'Oyentes',
      [data1.name]: data1.monthlyListeners / 1000000,
      [data2.name]: data2.monthlyListeners / 1000000,
    },
    {
      name: 'Streams',
      [data1.name]: data1.totalStreams / 1000000000,
      [data2.name]: data2.totalStreams / 1000000000,
    },
    {
      name: 'Países',
      [data1.name]: data1.countries,
      [data2.name]: data2.countries,
    },
    {
      name: 'Seguidores',
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
    <div className="space-y-8 w-full">
      <AnimatedDiv>
        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-2xl sm:text-3xl font-headline">
                  Herramienta de Comparación Interactiva
                </CardTitle>
                <CardDescription className="mt-2">
                  Compara las estadísticas y alcance de artistas panameños seleccionando dos artistas
                </CardDescription>
              </div>
            </div>
            <Separator />
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Selectores de artistas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Artista 1</label>
                <Select value={artist1} onValueChange={setArtist1}>
                  <SelectTrigger className="w-full h-12">
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
                <label className="text-sm font-medium text-muted-foreground">Artista 2</label>
                <Select value={artist2} onValueChange={setArtist2}>
                  <SelectTrigger className="w-full h-12">
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Artista 1 */}
              <AnimatedDiv delay={0.1}>
                <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl font-headline">{data1.name}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">Artista {data1.reach}</p>
                      </div>
                      <Badge className="text-xs">{data1.reach}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {data1.recognition.slice(0, 2).map((rec, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {rec}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-2 rounded bg-background/50">
                        <span className="text-sm font-medium text-muted-foreground">Oyentes Mensuales</span>
                        <span className="text-lg font-bold tabular-nums">{(data1.monthlyListeners / 1000000).toFixed(1)}M</span>
                      </div>
                      <div className="flex justify-between items-center p-2 rounded bg-background/50">
                        <span className="text-sm font-medium text-muted-foreground">Total Streams</span>
                        <span className="text-lg font-bold tabular-nums">{(data1.totalStreams / 1000000000).toFixed(1)}B</span>
                      </div>
                      <div className="flex justify-between items-center p-2 rounded bg-background/50">
                        <span className="text-sm font-medium text-muted-foreground">Países Alcanzados</span>
                        <span className="text-lg font-bold tabular-nums">{data1.countries}</span>
                      </div>
                      <div className="flex justify-between items-center p-2 rounded bg-background/50">
                        <span className="text-sm font-medium text-muted-foreground">Pico de Oyentes</span>
                        <span className="text-lg font-bold tabular-nums">{(data1.peakListeners / 1000000).toFixed(1)}M</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedDiv>

              {/* Artista 2 */}
              <AnimatedDiv delay={0.2}>
                <Card className="border-2 border-secondary/20 bg-gradient-to-br from-secondary/5 to-secondary/10 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl font-headline">{data2.name}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">Artista {data2.reach}</p>
                      </div>
                      <Badge className="text-xs">{data2.reach}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {data2.recognition.slice(0, 2).map((rec, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {rec}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-2 rounded bg-background/50">
                        <span className="text-sm font-medium text-muted-foreground">Oyentes Mensuales</span>
                        <span className="text-lg font-bold tabular-nums">{(data2.monthlyListeners / 1000000).toFixed(1)}M</span>
                      </div>
                      <div className="flex justify-between items-center p-2 rounded bg-background/50">
                        <span className="text-sm font-medium text-muted-foreground">Total Streams</span>
                        <span className="text-lg font-bold tabular-nums">{(data2.totalStreams / 1000000000).toFixed(1)}B</span>
                      </div>
                      <div className="flex justify-between items-center p-2 rounded bg-background/50">
                        <span className="text-sm font-medium text-muted-foreground">Países Alcanzados</span>
                        <span className="text-lg font-bold tabular-nums">{data2.countries}</span>
                      </div>
                      <div className="flex justify-between items-center p-2 rounded bg-background/50">
                        <span className="text-sm font-medium text-muted-foreground">Pico de Oyentes</span>
                        <span className="text-lg font-bold tabular-nums">{(data2.peakListeners / 1000000).toFixed(1)}M</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedDiv>
            </div>

            {/* Gráfico de barras comparativo */}
            <AnimatedDiv delay={0.3}>
              <Card className="border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-headline">Comparación de Métricas Clave</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Visualización directa de las principales estadísticas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="w-full overflow-x-auto -mx-4 sm:mx-0">
                    <div className="min-w-[400px] px-4 sm:px-0">
                      <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                          <XAxis
                            dataKey="name"
                            tick={{ fontSize: 12, fill: 'hsl(var(--foreground))' }}
                            angle={0}
                            textAnchor="middle"
                          />
                          <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--foreground))' }} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'hsl(var(--background))',
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px',
                              padding: '12px'
                            }}
                            labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 600 }}
                            itemStyle={{ color: 'hsl(var(--foreground))' }}
                          />
                          <Legend wrapperStyle={{ fontSize: '14px', paddingTop: '20px' }} />
                          <Bar dataKey={data1.name} fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                          <Bar dataKey={data2.name} fill="hsl(var(--secondary))" radius={[8, 8, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedDiv>

            {/* Radar Chart */}
            <AnimatedDiv delay={0.4}>
              <Card className="border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-headline">Análisis de Perfil Multidimensional</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Comparación normalizada al 100% de múltiples dimensiones de éxito
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="w-full overflow-x-auto -mx-4 sm:mx-0">
                    <div className="min-w-[350px] px-4 sm:px-0">
                      <ResponsiveContainer width="100%" height={400}>
                        <RadarChart data={radarData}>
                          <PolarGrid stroke="hsl(var(--border))" />
                          <PolarAngleAxis
                            dataKey="metric"
                            tick={{ fontSize: 11, fill: 'hsl(var(--foreground))' }}
                          />
                          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
                          <Radar
                            name={data1.name}
                            dataKey={data1.name}
                            stroke="hsl(var(--primary))"
                            fill="hsl(var(--primary))"
                            fillOpacity={0.5}
                            strokeWidth={2}
                          />
                          <Radar
                            name={data2.name}
                            dataKey={data2.name}
                            stroke="hsl(var(--secondary))"
                            fill="hsl(var(--secondary))"
                            fillOpacity={0.5}
                            strokeWidth={2}
                          />
                          <Legend wrapperStyle={{ fontSize: '14px', paddingTop: '20px' }} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'hsl(var(--background))',
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px',
                            }}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedDiv>

            {/* Insights */}
            <AnimatedDiv delay={0.5}>
              <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background">
                <CardHeader>
                  <CardTitle className="text-xl font-headline flex items-center gap-2">
                    <span className="text-2xl">💡</span>
                    Insights de la Comparación
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-3">
                  {data1.countries > data2.countries ? (
                    <p className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span><strong>{data1.name}</strong> tiene presencia en más países ({data1.countries} vs {data2.countries})</span>
                    </p>
                  ) : data2.countries > data1.countries ? (
                    <p className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span><strong>{data2.name}</strong> tiene un alcance global más amplio ({data2.countries} países vs {data1.countries})</span>
                    </p>
                  ) : null}

                  {data1.monthlyListeners > data2.monthlyListeners ? (
                    <p className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span><strong>{data1.name}</strong> lidera en audiencia mensual con {(data1.monthlyListeners / 1000000).toFixed(1)}M oyentes</span>
                    </p>
                  ) : (
                    <p className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span><strong>{data2.name}</strong> tiene mayor audiencia mensual con {(data2.monthlyListeners / 1000000).toFixed(1)}M oyentes</span>
                    </p>
                  )}

                  {data2.peakListeners > data1.peakListeners && (
                    <p className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span><strong>{data2.name}</strong> alcanzó un pico histórico superior ({(data2.peakListeners / 1000000).toFixed(1)}M vs {(data1.peakListeners / 1000000).toFixed(1)}M)</span>
                    </p>
                  )}
                </CardContent>
              </Card>
            </AnimatedDiv>
          </CardContent>
        </Card>
      </AnimatedDiv>
    </div>
  );
}
