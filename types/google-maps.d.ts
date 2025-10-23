// Google Maps TypeScript declarations
declare global {
  interface Window {
    google: typeof google;
  }
}

// Google Maps API types
declare namespace google {
  namespace maps {
    class Map {
      constructor(mapDiv: Element | null, opts?: MapOptions);
      setCenter(latlng: LatLng | LatLngLiteral): void;
      setZoom(zoom: number): void;
    }

    interface MapOptions {
      zoom?: number;
      center?: LatLng | LatLngLiteral;
      mapTypeId?: MapTypeId;
      styles?: MapTypeStyle[];
    }

    class Marker {
      constructor(opts?: MarkerOptions);
      setMap(map: Map | null): void;
      addListener(eventName: string, handler: Function): void;
    }

    interface MarkerOptions {
      position?: LatLng | LatLngLiteral;
      map?: Map;
      title?: string;
      icon?: string | Icon | Symbol;
    }

    class InfoWindow {
      constructor(opts?: InfoWindowOptions);
      setContent(content: string | Element): void;
      open(map?: Map, anchor?: Marker): void;
    }

    interface InfoWindowOptions {
      content?: string | Element;
    }

    class LatLng {
      constructor(lat: number, lng: number);
      lat(): number;
      lng(): number;
    }

    interface LatLngLiteral {
      lat: number;
      lng: number;
    }

    interface Size {
      width: number;
      height: number;
    }

    interface Point {
      x: number;
      y: number;
    }

    interface Icon {
      url: string;
      scaledSize?: Size;
      anchor?: Point;
    }

    interface Symbol {
      path: string;
      fillColor?: string;
      fillOpacity?: number;
      strokeColor?: string;
      strokeOpacity?: number;
      strokeWeight?: number;
      scale?: number;
    }

    interface MapTypeStyle {
      featureType?: string;
      elementType?: string;
      stylers?: Array<{ [key: string]: any }>;
    }

    enum MapTypeId {
      ROADMAP = 'roadmap',
      SATELLITE = 'satellite',
      HYBRID = 'hybrid',
      TERRAIN = 'terrain'
    }
  }
}

export {};
