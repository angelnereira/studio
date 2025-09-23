import { NextResponse, NextRequest } from 'next/server';
import { get } from '@vercel/edge-config';
import { sql } from '@vercel/postgres';

export const config = { 
  matcher: '/welcome' 
};

export async function middleware(request: NextRequest) {
  try {
    // Intenta obtener desde Edge Config (caché rápido)
    let greeting = await get('greeting');
    let source = 'edge-config';
    
    // Si no existe en Edge Config, consulta la BD
    if (!greeting) {
      source = 'database';
      const { rows } = await sql`SELECT message FROM greetings WHERE active = true LIMIT 1`;
      greeting = rows[0]?.message || 'Bienvenido';
      
      // Opcional: actualizar Edge Config para próximas consultas
      // Esto requiere configurar un webhook o API route
    }
    
    return NextResponse.json({ 
      message: greeting,
      source: source
    });
    
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json({ 
      message: 'Error al cargar saludo',
      error: error.message 
    }, { status: 500 });
  }
}
