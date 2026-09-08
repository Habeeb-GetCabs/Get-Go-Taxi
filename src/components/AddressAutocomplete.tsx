import { useState, useEffect, useRef, useId, type KeyboardEvent } from 'react';
import {
  MapPin,
  X,
  Loader2,
  Globe,
} from 'lucide-react';

export interface GeoapifyAddressData {
  formatted: string;
  lat: number;
  lon: number;
  name?: string;
  city?: string;
  state?: string;
  country?: string;
  postcode?: string;
  suburb?: string;
}

export interface AddressAutocompleteProps {
  id?: string;
  label?: string;
  value: string;
  onChange: (value: string, coords?: { lat: number; lon: number }) => void;
  onSelectAddress?: (data: GeoapifyAddressData) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  iconColor?: string;
  isDestination?: boolean;
  tripType?: 'local' | 'hourly' | 'oneway' | 'outstation';
}

interface SuggestionItem {
  id: string;
  formatted: string;
  name: string;
  detail: string;
  lat: number;
  lon: number;
  rawProperties: Record<string, any>;
}

// Official Geoapify API Credentials
const GEOAPIFY_API_KEY = 'cab55792c8f6489db0ad4356941faad9';
const GEOAPIFY_AUTOCOMPLETE_ENDPOINT = 'https://api.geoapify.com/v1/geocode/autocomplete';

export default function AddressAutocomplete({
  id: propId,
  label,
  value,
  onChange,
  onSelectAddress,
  placeholder = 'Type address (min. 3 characters)...',
  required = false,
  className = '',
  iconColor = 'text-slate-400',
}: AddressAutocompleteProps) {
  const generatedId = useId();
  const inputId = propId || generatedId;

  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [capturedCoords, setCapturedCoords] = useState<{ lat: number; lon: number } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const justSelectedRef = useRef(false);
  const lastSelectedRef = useRef<string | null>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch live address recommendations from Geoapify API with 300ms debounce
  useEffect(() => {
    // Prevent dropdown re-opening if the value change came from selecting a suggestion
    if (justSelectedRef.current || (lastSelectedRef.current && value === lastSelectedRef.current)) {
      justSelectedRef.current = false;
      setIsOpen(false);
      setSuggestions([]);
      return;
    }

    const query = value.trim();

    // Requirement 2: Minimum 3 characters
    if (query.length < 3) {
      setSuggestions([]);
      setIsOpen(false);
      setIsLoading(false);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      return;
    }

    setIsLoading(true);

    // Requirement 3: Include a 300ms debounce timer on the input listener
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(async () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        // Requirement: Restrict search results to India and prioritize Coimbatore proximity (76.9558,11.0168)
        const params = new URLSearchParams({
          text: query,
          filter: 'countrycode:in',
          bias: 'proximity:76.9558,11.0168',
          limit: '8',
          apiKey: GEOAPIFY_API_KEY,
        });

        const res = await fetch(`${GEOAPIFY_AUTOCOMPLETE_ENDPOINT}?${params.toString()}`, {
          signal: controller.signal,
        });

        if (res.ok) {
          const data = await res.json();
          if (data && Array.isArray(data.features)) {
            const items: SuggestionItem[] = data.features.map((feat: any, idx: number) => {
              const props = feat.properties || {};
              const formatted = props.formatted || `${props.name || query}, India`;
              const name = props.name || props.address_line1 || formatted.split(',')[0];

              const detailParts: string[] = [];
              if (props.address_line2) {
                detailParts.push(props.address_line2);
              } else {
                if (props.suburb && props.suburb !== name) detailParts.push(props.suburb);
                if (props.city && props.city !== name) detailParts.push(props.city);
                if (props.state && props.state !== name) detailParts.push(props.state);
                if (props.postcode) detailParts.push(`PIN: ${props.postcode}`);
              }
              const detail = detailParts.join(', ') || props.country || 'India';

              return {
                id: `geoapify-${idx}-${props.place_id || Math.random()}`,
                formatted,
                name,
                detail,
                lat: props.lat,
                lon: props.lon,
                rawProperties: props,
              };
            });

            setSuggestions(items);
            setIsOpen(items.length > 0);
            setHighlightIndex(-1);
          } else {
            setSuggestions([]);
            setIsOpen(false);
          }
        }
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setSuggestions([]);
          setIsOpen(false);
        }
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [value]);

  // Requirement 5: Capture formatted address and its latitude/longitude coordinates when selected
  const handleSelect = (item: SuggestionItem) => {
    justSelectedRef.current = true;
    lastSelectedRef.current = item.formatted;

    setCapturedCoords({ lat: item.lat, lon: item.lon });

    // Send formatted address and lat/lon coords to onChange
    onChange(item.formatted, { lat: item.lat, lon: item.lon });

    if (onSelectAddress) {
      onSelectAddress({
        formatted: item.formatted,
        lat: item.lat,
        lon: item.lon,
        name: item.name,
        city: item.rawProperties.city,
        state: item.rawProperties.state,
        country: item.rawProperties.country,
        postcode: item.rawProperties.postcode,
        suburb: item.rawProperties.suburb,
      });
    }

    setIsOpen(false);
    setSuggestions([]);
  };

  const handleClear = () => {
    justSelectedRef.current = false;
    lastSelectedRef.current = null;
    setCapturedCoords(null);
    onChange('', undefined);
    setIsOpen(false);
    setSuggestions([]);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter') {
      if (highlightIndex >= 0 && highlightIndex < suggestions.length) {
        e.preventDefault();
        handleSelect(suggestions[highlightIndex]);
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

      {/* Address Input Field */}
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
            justSelectedRef.current = false;
            lastSelectedRef.current = null;
            if (capturedCoords) {
              setCapturedCoords(null);
            }
            onChange(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (
              !justSelectedRef.current &&
              lastSelectedRef.current !== value &&
              value.trim().length >= 3 &&
              suggestions.length > 0
            ) {
              setIsOpen(true);
            }
          }}
          placeholder={placeholder}
          required={required}
          autoComplete="off"
          className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#C62139]/20 focus:border-[#C62139] focus:outline-hidden bg-white text-slate-800 placeholder:text-slate-400 font-medium transition"
        />

        {/* Loading Spinner or Clear Button */}
        <div className="absolute right-2 flex items-center gap-1">
          {isLoading ? (
            <Loader2 className="w-3.5 h-3.5 text-[#C62139] animate-spin pointer-events-none" />
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

      {/* Dropdown Suggestions Box (Minimum 3 Characters) */}
      {isOpen && suggestions.length > 0 && value.trim().length >= 3 && (
        <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50 divide-y divide-slate-100 max-h-64 overflow-y-auto">
          <div className="px-3 py-1.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-3xs font-bold text-slate-500 tracking-wider uppercase">
            <span className="flex items-center gap-1">
              <Globe className="w-3 h-3 text-[#C62139]" />
              Geoapify Address Search
            </span>
            <span>{suggestions.length} results</span>
          </div>

          {suggestions.map((item, idx) => {
            const isHighlighted = idx === highlightIndex;
            return (
              <button
                key={item.id}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault(); // Prevents input blur before click fires
                }}
                onClick={() => handleSelect(item)}
                onMouseEnter={() => setHighlightIndex(idx)}
                className={`w-full px-3 py-2.5 text-left transition flex items-start gap-2.5 ${
                  isHighlighted ? 'bg-red-50 text-[#C62139]' : 'hover:bg-slate-50 text-slate-800'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  <MapPin className={`w-3.5 h-3.5 ${isHighlighted ? 'text-[#C62139]' : 'text-slate-400'}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold truncate">
                      {item.name}
                    </span>
                    <span className="text-3xs font-mono text-slate-400 shrink-0 bg-slate-100 px-1 py-0.2 rounded">
                      {item.lat.toFixed(2)}°, {item.lon.toFixed(2)}°
                    </span>
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
