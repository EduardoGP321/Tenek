export interface Cerveza {
    id: number;
    nombre: string;
    slug: string;
    tipo: 'linea' | 'temporada' | 'especial' | string;
    estilo: string;
    descripcion: string;
    maridaje: string;
    contenido_alcoholico: number;
    amargor: number;
    color_srm: number | null;
    color_hex: string;
    imagen_botella_url: string | null;
    medallas_urls: string[];
    presentaciones: string[];
    orden: number;
}

export interface AcademiaArticulo {
    id: number;
    tipo: string;
    titulo: string;
    slug: string;
    extracto: string;
    contenido: string;
    imagen_url: string | null;
    fecha_publicacion: string;
}

export interface Experiencia {
    id: number;
    descripcion: string;
    imagen_url: string | null;
    fecha: string;
}

export interface RedSocial {
    id?: number;
    tipo: 'instagram' | 'facebook' | 'tiktok' | 'x_twitter' | 'sitio_web' | string;
    link: string;
}

export interface Ubicacion {
    id: number;
    nombre: string;
    direccion: string;
    link_mapa: string;
    coordenadas: {
        lat: number;
        lng: number;
    };
    redes_sociales: RedSocial[];
    logo_url: string | null;    
}