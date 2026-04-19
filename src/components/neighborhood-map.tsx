"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

// Coordinates from Mapbox Geocoding API
const neighborhoodCoords: Record<string, [number, number]> = {
  "winter-park": [-81.351021, 28.595943],
  "lake-nona": [-81.266, 28.396656],
  "windermere": [-81.534215, 28.494557],
  "dr-phillips": [-81.497635, 28.46081],
  "celebration": [-81.539817, 28.317547],
  "baldwin-park": [-81.32649, 28.568096],
  "horizon-west": [-81.62662, 28.474367],
  "winter-garden": [-81.585647, 28.565737],
  "clermont": [-81.768654, 28.555268],
  "minneola": [-81.748184, 28.575645],
  "montverde": [-81.674664, 28.600831],
  "oakland": [-81.628203, 28.557043],
  "groveland": [-81.856081, 28.560682],
  "apopka": [-81.509457, 28.673111],
  "lake-mary": [-81.32207, 28.756392],
  "sanford": [-81.268032, 28.811727],
};

interface NeighborhoodData {
  slug: string;
  name: string;
  tagline: string;
  priceRange: string;
  lifestyleTags: string[];
}

interface Props {
  neighborhoods: NeighborhoodData[];
}

export function NeighborhoodMap({ neighborhoods }: Props) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [selected, setSelected] = useState<NeighborhoodData | null>(null);

  const handleMarkerClick = useCallback((slug: string) => {
    const n = neighborhoods.find((nb) => nb.slug === slug);
    if (!n) return;
    setSelected(n);
    const coords = neighborhoodCoords[slug];
    if (coords && mapRef.current) {
      mapRef.current.flyTo({ center: coords, zoom: 11.5, duration: 800 });
    }
  }, [neighborhoods]);

  useEffect(() => {
    if (!mapContainer.current || !MAPBOX_TOKEN || mapRef.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    const m = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [-81.48, 28.52],
      zoom: 9.2,
      minZoom: 8,
      maxZoom: 13,
      attributionControl: false,
      pitchWithRotate: false,
      dragRotate: false,
    });

    mapRef.current = m;

    m.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      "top-right"
    );

    m.on("load", () => {
      // Add GeoJSON source with all neighborhood points
      const features = neighborhoods
        .filter((n) => neighborhoodCoords[n.slug])
        .map((n) => ({
          type: "Feature" as const,
          properties: { slug: n.slug, name: n.name },
          geometry: {
            type: "Point" as const,
            coordinates: neighborhoodCoords[n.slug],
          },
        }));

      m.addSource("neighborhoods", {
        type: "geojson",
        data: { type: "FeatureCollection", features },
      });

      // Circle layer for the dots
      m.addLayer({
        id: "neighborhood-dots",
        type: "circle",
        source: "neighborhoods",
        paint: {
          "circle-radius": 7,
          "circle-color": "#1B3A2D",
          "circle-stroke-width": 2.5,
          "circle-stroke-color": "#F5F2EC",
        },
      });

      // Text labels
      m.addLayer({
        id: "neighborhood-labels",
        type: "symbol",
        source: "neighborhoods",
        layout: {
          "text-field": ["get", "name"],
          "text-font": ["DIN Pro Medium", "Arial Unicode MS Regular"],
          "text-size": 12,
          "text-offset": [0, 1.8],
          "text-anchor": "top",
          "text-allow-overlap": false,
          "text-optional": true,
        },
        paint: {
          "text-color": "#1B3A2D",
          "text-halo-color": "rgba(255,255,255,0.9)",
          "text-halo-width": 2,
        },
      });

      // Hover cursor
      m.on("mouseenter", "neighborhood-dots", () => {
        m.getCanvas().style.cursor = "pointer";
      });
      m.on("mouseleave", "neighborhood-dots", () => {
        m.getCanvas().style.cursor = "";
      });

      // Click handler
      m.on("click", "neighborhood-dots", (e) => {
        if (e.features && e.features[0]) {
          const slug = e.features[0].properties?.slug;
          if (slug) handleMarkerClick(slug);
        }
      });

      // Click on empty area to deselect
      m.on("click", (e) => {
        const features = m.queryRenderedFeatures(e.point, {
          layers: ["neighborhood-dots"],
        });
        if (features.length === 0) {
          setSelected(null);
        }
      });
    });

    return () => {
      m.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!MAPBOX_TOKEN) return null;

  return (
    <div className="relative">
      <div ref={mapContainer} className="w-full h-[500px] lg:h-[600px]" />

      {/* Selected neighborhood panel */}
      <div
        className={`absolute bottom-6 left-6 right-6 lg:left-auto lg:right-6 lg:bottom-6 lg:w-[360px] bg-white border border-neutral-200 shadow-lg transition-all duration-300 ${
          selected
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {selected && (
          <div className="p-6 lg:p-8">
            <div className="flex flex-wrap gap-x-3 gap-y-1 mb-3">
              {selected.lifestyleTags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] tracking-[0.15em] uppercase text-neutral-400"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="font-[family-name:var(--font-playfair)] text-xl text-charcoal mb-1">
              {selected.name}
            </h3>
            <p className="text-[13px] text-neutral-500 leading-relaxed mb-3">
              {selected.tagline}
            </p>
            <p className="text-[12px] text-neutral-400 mb-5">
              {selected.priceRange}
            </p>
            <Link
              href={`/neighborhoods/${selected.slug}`}
              className="group inline-flex items-center gap-2 text-[13px] tracking-wide font-medium text-forest border-b border-forest pb-0.5 hover:border-forest-light hover:text-forest-light transition-all duration-300"
            >
              View full guide
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="group-hover:translate-x-1 transition-transform duration-300"
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
