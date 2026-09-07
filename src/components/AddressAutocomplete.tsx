import { useState, useEffect, useRef, useId, type KeyboardEvent } from 'react';
import {
  MapPin,
  X,
  Navigation,
  Loader2,
  Compass,
} from 'lucide-react';
import {
  COIMBATORE_LOCATIONS,
  POPULAR_OUTSTATION_DESTINATIONS,
} from '../data/coimbatorePlaces';

interface AddressAutocompleteProps {
  id?: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  iconColor?: string;
  isDestination?: boolean;
  tripType?: 'local' | 'hourly' | 'oneway' | 'outstation';
}

interface LiveSuggestion {
  id: string;
  name: string;
  detail: string;
  type: 'coimbatore-curated' | 'live-osm' | 'outstation';
  categoryLabel?: string;
}

export default function AddressAutocomplete({
  id: propId,
  label,
  value,
  onChange,
  placeholder = 'Type min. 3 letters for address...',
  required = false,
  className = '',
  iconColor = 'text-slate-400',
  isDestination = false,
  tripType = 'local',
}: AddressAutocompleteProps) {
  const generatedId = useId();
  const inputId = propId || generatedId;

  const [isOpen, setIsOpen] = useState(false);
  const [liveSuggestions, setLiveSuggestions] = useState<LiveSuggestion[]>([]);
  const [isLoadingLive, setIsLoadingLive] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch / compute autocomplete suggestions ONLY when user types 3+ letters
  useEffect(() => {
    const query = value.trim();

    // Do NOT show suggestions if less than 3 letters
    if (query.length < 3) {
      setLiveSuggestions([]);
      setIsOpen(false);
      setIsLoadingLive(false);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      return;
    }

    const qLower = query.toLowerCase();

    // 1. Instant local matching from Coimbatore places
    const localMatches: LiveSuggestion[] = [];
    COIMBATORE_LOCATIONS.forEach((loc) => {
      const nameMatch = loc.name.toLowerCase().includes(qLower);
      const landmarkMatch = loc.landmark.toLowerCase().includes(qLower);
      if (nameMatch || landmarkMatch) {
        localMatches.push({
          id: `cbe-${loc.id}`,
          name: loc.name,
          detail: loc.landmark,
          type: 'coimbatore-curated',
          categoryLabel: loc.categoryLabel,
        });
      }
    });

    // Match popular outstation destinations if applicable
    if (isDestination && (tripType === 'outstation' || tripType === 'oneway')) {
      POPULAR_OUTSTATION_DESTINATIONS.forEach((dest, idx) => {
        if (dest.toLowerCase().includes(qLower)) {
          localMatches.push({
            id: `outstation-${idx}`,
            name: dest,
            detail: 'Popular Outstation Destination',
            type: 'outstation',
            categoryLabel: 'Outstation',
          });
        }
      });
    }

    // Sort by priority (exact start match first)
    localMatches.sort((a, b) => {
      const aStarts = a.name.toLowerCase().startsWith(qLower);
      const bStarts = b.name.toLowerCase().startsWith(qLower);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return 0;
    });

    // Immediately show top local matches
    setLiveSuggestions(localMatches.slice(0, 6));
    setIsOpen(localMatches.length > 0);
    setHighlightIndex(-1);

    // 2. Fetch live address results from Photon (OpenStreetMap) biased around Coimbatore
    setIsLoadingLive(true);
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=5&lat=11.0168&lon=76.9558`,
          { signal: controller.signal }
        );

        if (res.ok) {
          const data = await res.json();
          const osmItems: LiveSuggestion[] = [];

          if (data && Array.isArray(data.features)) {
            data.features.forEach((feat: any, idx: number) => {
              const props = feat.properties || {};
              const name = props.name || props.street || query;
              const parts: string[] = [];
              if (props.housenumber) parts.push(props.housenumber);
              if (props.street && props.street !== name) parts.push(props.street);
              if (props.district) parts.push(props.district);
              if (props.city && props.city !== name) parts.push(props.city);
              if (props.state) parts.push(props.state);

              const detail = parts.join(', ') || props.country || 'Coimbatore, Tamil Nadu';

              // Avoid duplicate names with already matched items
              if (!localMatches.some((m) => m.name.toLowerCase() === name.toLowerCase())) {
                osmItems.push({
                  id: `osm-${idx}-${props.osm_id || Math.random()}`,
                  name,
                  detail,
                  type: 'live-osm',
                  categoryLabel: props.city ? `${props.city}` : 'Live Address',
                });
              }
            });
          }

          const combined = [...localMatches.slice(0, 4), ...osmItems.slice(0, 3)];
          if (combined.length > 0) {
            setLiveSuggestions(combined);
            setIsOpen(true);
          }
        }
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          // Keep local matches if live fetch fails
        }
      } finally {
        setIsLoadingLive(false);
      }
    }, 200);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [value, isDestination, tripType]);

  const handleSelect = (selectedName: string) => {
    onChange(selectedName);
    setIsOpen(false);
    setLiveSuggestions([]);
  };

  const handleClear = () => {
    onChange('');
    setIsOpen(false);
    setLiveSuggestions([]);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || liveSuggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIndex((prev) => (prev < liveSuggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIndex((prev) => (prev > 0 ? prev - 1 : liveSuggestions.length - 1));
    } else if (e.key === 'Enter') {
      if (highlightIndex >= 0 && highlightIndex < liveSuggestions.length) {
        e.preventDefault();
        handleSelect(liveSuggestions[highlightIndex].name);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-2xs font-bold uppercase tracking-wider text-slate-600 mb-1"
        >
          {label}
        </label>
      )}

      {/* Clean Input Field */}
      <div className="relative flex items-center">
        <MapPin
          className={`w-4 h-4 ${iconColor} absolute left-3 pointer-events-none transition-colors shrink-0`}
        />

        <input
          ref={inputRef}
          id={inputId}
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (value.trim().length >= 3 && liveSuggestions.length > 0) {
              setIsOpen(true);
            }
          }}
          placeholder={placeholder}
          required={required}
          autoComplete="off"
          className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#C62139]/20 focus:border-[#C62139] focus:outline-hidden bg-white text-slate-800 placeholder:text-slate-400 font-medium transition"
        />

        {/* Right side controls: Loading spinner or Clear button */}
        <div className="absolute right-2 flex items-center gap-1">
          {isLoadingLive ? (
            <Loader2 className="w-3.5 h-3.5 text-slate-400 animate-spin pointer-events-none" />
          ) : value ? (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100 transition"
              title="Clear address"
              aria-label="Clear address"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : null}
        </div>
      </div>

      {/* Autocomplete Suggestions (Triggers on 3+ letters) */}
      {isOpen && liveSuggestions.length > 0 && value.trim().length >= 3 && (
        <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50 divide-y divide-slate-100 max-h-60 overflow-y-auto">
          {liveSuggestions.map((item, idx) => {
            const isHighlighted = idx === highlightIndex;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.name)}
                onMouseEnter={() => setHighlightIndex(idx)}
                className={`w-full px-3 py-2 text-left transition flex items-start gap-2.5 ${
                  isHighlighted ? 'bg-red-50 text-[#C62139]' : 'hover:bg-slate-50 text-slate-800'
                }`}
              >
                <div className="mt-0.5 shrink-0 text-slate-400">
                  {item.type === 'coimbatore-curated' ? (
                    <MapPin className="w-3.5 h-3.5 text-[#C62139]" />
                  ) : item.type === 'outstation' ? (
                    <Navigation className="w-3.5 h-3.5 text-amber-600" />
                  ) : (
                    <Compass className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold truncate">
                      {item.name}
                    </span>
                    {item.categoryLabel && (
                      <span className="text-3xs font-semibold px-1.5 py-0.2 rounded-sm bg-slate-100 text-slate-600 shrink-0">
                        {item.categoryLabel}
                      </span>
                    )}
                  </div>
                  {item.detail && (
                    <div className="text-3xs text-slate-500 truncate mt-0.5">
                      {item.detail}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
