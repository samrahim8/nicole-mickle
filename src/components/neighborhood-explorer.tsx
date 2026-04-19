"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

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

export function NeighborhoodExplorer({ neighborhoods }: Props) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const listRef = useRef<HTMLDivElement>(null);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const flyTo = useCallback((slug: string) => {
    const coords = neighborhoodCoords[slug];
    if (coords && mapRef.current) {
      mapRef.current.flyTo({ center: coords, zoom: 11.5, duration: 800 });
    }
    setActiveSlug(slug);
  }, []);

  const handleCardClick = useCallback((slug: string) => {
    flyTo(slug);
  }, [flyTo]);

  const handleMapClick = useCallback((slug: string) => {
    setActiveSlug(slug);
    // Scroll the card into view
    const card = cardRefs.current[slug];
    if (card && listRef.current) {
      card.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
    flyTo(slug);
  }, [flyTo]);

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

      m.on("mouseenter", "neighborhood-dots", () => {
        m.getCanvas().style.cursor = "pointer";
      });
      m.on("mouseleave", "neighborhood-dots", () => {
        m.getCanvas().style.cursor = "";
      });

      m.on("click", "neighborhood-dots", (e) => {
        if (e.features && e.features[0]) {
          const slug = e.features[0].properties?.slug;
          if (slug) handleMapClick(slug);
        }
      });

      m.on("click", (e) => {
        const features = m.queryRenderedFeatures(e.point, {
          layers: ["neighborhood-dots"],
        });
        if (features.length === 0) {
          setActiveSlug(null);
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
    <div className="grid lg:grid-cols-12 gap-0 border border-neutral-200 overflow-hidden">
      {/* Map -- left side on desktop, top on mobile */}
      <div className="lg:col-span-7 h-[400px] lg:h-[600px]">
        <div ref={mapContainer} className="w-full h-full" />
      </div>

      {/* Card list -- right side on desktop, below on mobile */}
      <div
        ref={listRef}
        className="lg:col-span-5 h-[400px] lg:h-[600px] overflow-y-auto border-t lg:border-t-0 lg:border-l border-neutral-200 bg-white"
      >
        <div className="p-5 lg:p-6 border-b border-neutral-100 sticky top-0 bg-white z-10">
          <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400">
            {neighborhoods.length} Neighborhoods
          </p>
        </div>
        {neighborhoods
          .filter((n) => neighborhoodCoords[n.slug])
          .map((n) => (
          <div
            key={n.slug}
            ref={(el) => { cardRefs.current[n.slug] = el; }}
            className={`border-b border-neutral-100 transition-colors duration-300 ${
              activeSlug === n.slug ? "bg-cream" : "bg-white hover:bg-neutral-50"
            }`}
          >
            <button
              onClick={() => handleCardClick(n.slug)}
              className="w-full text-left p-5 lg:p-6"
            >
              <div className="flex items-start justify-between gap-3 mb-1.5">
                <h3 className="font-[family-name:var(--font-playfair)] text-base text-charcoal">
                  {n.name}
                </h3>
                <span className="text-[11px] text-neutral-400 shrink-0 mt-0.5">
                  {n.priceRange}
                </span>
              </div>
              <p className="text-[13px] text-neutral-500 leading-relaxed mb-2">
                {n.tagline}
              </p>
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                {n.lifestyleTags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] tracking-[0.15em] uppercase text-neutral-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </button>
            {activeSlug === n.slug && (
              <div className="px-5 lg:px-6 pb-5 lg:pb-6 -mt-1">
                <Link
                  href={`/neighborhoods/${n.slug}`}
                  className="group inline-flex items-center gap-2 text-[12px] tracking-wide font-medium text-forest border-b border-forest pb-0.5 hover:border-forest-light hover:text-forest-light transition-all duration-300"
                >
                  View full guide
                  <svg
                    width="12" height="12" viewBox="0 0 16 16" fill="none"
                    stroke="currentColor" strokeWidth="1.5"
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
