export interface ArtistData {
  name: string;
  currentMonthlyListeners: number;
  peakListeners: number;
  totalStreams: number;
  evolutionData: Array<{
    year: number;
    listeners: number;
    streams: number;
    albumReleases: number;
    chartPositions: number;
  }>;
  demographics: {
    age18_24: number;
    age25_34: number;
    age35_44: number;
    age45plus: number;
  };
  platforms: {
    spotify: number;
    youtube: number;
    instagram: number;
    tiktok: number;
  };
}

export const artistsData: Record<string, ArtistData> = {
    sech: {
      name: "Sech",
      currentMonthlyListeners: 8200000,
      peakListeners: 12500000,
      totalStreams: 2800000000,
      evolutionData: [
        { year: 2019, listeners: 1200000, streams: 45000000, albumReleases: 1, chartPositions: 15 },
        { year: 2020, listeners: 4800000, streams: 380000000, albumReleases: 2, chartPositions: 8 },
        { year: 2021, listeners: 8900000, streams: 720000000, albumReleases: 1, chartPositions: 12 },
        { year: 2022, listeners: 12500000, streams: 950000000, albumReleases: 2, chartPositions: 18 },
        { year: 2023, listeners: 10200000, streams: 845000000, albumReleases: 1, chartPositions: 14 },
        { year: 2024, listeners: 8200000, streams: 650000000, albumReleases: 1, chartPositions: 10 }
      ],
      demographics: { age18_24: 45, age25_34: 32, age35_44: 18, age45plus: 5 },
      platforms: { spotify: 8200000, youtube: 3400000, instagram: 5100000, tiktok: 2800000 }
    },
    joeyMontana: {
      name: "Joey Montana",
      currentMonthlyListeners: 3400000,
      peakListeners: 5800000,
      totalStreams: 1200000000,
      evolutionData: [
        { year: 2019, listeners: 4200000, streams: 180000000, albumReleases: 1, chartPositions: 22 },
        { year: 2020, listeners: 5800000, streams: 245000000, albumReleases: 2, chartPositions: 16 },
        { year: 2021, listeners: 4600000, streams: 195000000, albumReleases: 1, chartPositions: 19 },
        { year: 2022, listeners: 3900000, streams: 165000000, albumReleases: 1, chartPositions: 24 },
        { year: 2023, listeners: 3600000, streams: 142000000, albumReleases: 2, chartPositions: 21 },
        { year: 2024, listeners: 3400000, streams: 138000000, albumReleases: 1, chartPositions: 18 }
      ],
      demographics: { age18_24: 28, age25_34: 38, age35_44: 24, age45plus: 10 },
      platforms: { spotify: 3400000, youtube: 2100000, instagram: 2800000, tiktok: 1200000 }
    },
    elRoockie: {
      name: "El Roockie",
      currentMonthlyListeners: 950000,
      peakListeners: 1800000,
      totalStreams: 385000000,
      evolutionData: [
        { year: 2019, listeners: 680000, streams: 35000000, albumReleases: 1, chartPositions: 28 },
        { year: 2020, listeners: 1200000, streams: 68000000, albumReleases: 2, chartPositions: 18 },
        { year: 2021, listeners: 1800000, streams: 95000000, albumReleases: 1, chartPositions: 12 },
        { year: 2022, listeners: 1350000, streams: 72000000, albumReleases: 1, chartPositions: 25 },
        { year: 2023, listeners: 1100000, streams: 58000000, albumReleases: 2, chartPositions: 22 },
        { year: 2024, listeners: 950000, streams: 52000000, albumReleases: 1, chartPositions: 19 }
      ],
      demographics: { age18_24: 52, age25_34: 28, age35_44: 15, age45plus: 5 },
      platforms: { spotify: 950000, youtube: 580000, instagram: 720000, tiktok: 420000 }
    },
    boza: {
      name: "Boza",
      currentMonthlyListeners: 2100000,
      peakListeners: 3200000,
      totalStreams: 480000000,
      evolutionData: [
        { year: 2019, listeners: 120000, streams: 8000000, albumReleases: 0, chartPositions: 0 },
        { year: 2020, listeners: 850000, streams: 45000000, albumReleases: 1, chartPositions: 12 },
        { year: 2021, listeners: 2400000, streams: 125000000, albumReleases: 2, chartPositions: 8 },
        { year: 2022, listeners: 3200000, streams: 165000000, albumReleases: 1, chartPositions: 15 },
        { year: 2023, listeners: 2800000, streams: 142000000, albumReleases: 2, chartPositions: 11 },
        { year: 2024, listeners: 2100000, streams: 95000000, albumReleases: 1, chartPositions: 9 }
      ],
      demographics: { age18_24: 58, age25_34: 25, age35_44: 12, age45plus: 5 },
      platforms: { spotify: 2100000, youtube: 1400000, instagram: 1800000, tiktok: 3200000 }
    }
  };

  export const genreEvolution = [
    { genre: 'Reggaetón', 2019: 45, 2020: 52, 2021: 58, 2022: 62, 2023: 65, 2024: 68 },
    { genre: 'Pop Latino', 2019: 25, 2020: 23, 2021: 22, 2022: 20, 2023: 18, 2024: 16 },
    { genre: 'Dembow', 2019: 8, 2020: 12, 2021: 15, 2022: 18, 2023: 22, 2024: 25 },
    { genre: 'Trap Latino', 2019: 15, 2020: 18, 2021: 20, 2022: 22, 2023: 20, 2024: 18 },
    { genre: 'Salsa/Típico', 2019: 12, 2020: 10, 2021: 8, 2022: 6, 2023: 5, 2024: 4 }
  ];

  export const marketMetrics = [
    { metric: 'Penetración Spotify', value: 78, change: '+12%' },
    { metric: 'Usuarios TikTok', value: 1200000, change: '+35%' },
    { metric: 'Streams Totales', value: 4800000000, change: '+18%' },
    { metric: 'Artistas Activos', value: 2400, change: '+22%' }
  ];

  export const platformGrowth = [
    { platform: 'Spotify', 2019: 850000, 2020: 1200000, 2021: 1650000, 2022: 2100000, 2023: 2450000, 2024: 2800000 },
    { platform: 'YouTube Music', 2019: 620000, 2020: 890000, 2021: 1150000, 2022: 1420000, 2023: 1680000, 2024: 1950000 },
    { platform: 'Apple Music', 2019: 180000, 2020: 280000, 2021: 420000, 2022: 580000, 2023: 720000, 2024: 890000 },
    { platform: 'TikTok', 2019: 450000, 2020: 780000, 2021: 1200000, 2022: 1650000, 2023: 2100000, 2024: 2800000 }
  ];

  export const COLORS = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];
