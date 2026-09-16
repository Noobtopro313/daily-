import React, { useEffect, useRef, useState } from 'react';
import { X, MapPin, Navigation, Check, Loader2, Store, Truck } from 'lucide-react';

interface GoogleMapsDeliveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmAddress: (address: string, coords: { lat: number; lng: number }) => void;
  initialAddress?: string;
}

// Store flagship coordinates (Lahore Gulberg Tech Hub)
const STORE_COORDINATES = { lat: 31.5204, lng: 74.3587 };

export const GoogleMapsDeliveryModal: React.FC<GoogleMapsDeliveryModalProps> = ({
  isOpen,
  onClose,
  onConfirmAddress,
  initialAddress = '',
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [selectedCoords, setSelectedCoords] = useState<{ lat: number; lng: number }>(STORE_COORDINATES);
  const [addressText, setAddressText] = useState(initialAddress || 'Gulberg III, Main Boulevard, Lahore');
  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;

    async function initMap() {
      try {
        // Fetch API key from server or env
        let key = (import.meta as any).env?.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyDgIiZS5XSSrjj99UEEM5cpxOTZDWPHMyY';
        try {
          const res = await fetch('/api/maps-key');
          const data = await res.json();
          if (data.apiKey) key = data.apiKey;
        } catch {
          // fallback to bundled key
        }

        // Check if google maps is already loaded on window
        if (!(window as any).google?.maps) {
          await new Promise<void>((resolve, reject) => {
            const existingScript = document.getElementById('google-maps-script');
            if (existingScript) {
              existingScript.addEventListener('load', () => resolve());
              existingScript.addEventListener('error', () => reject(new Error('Failed to load Google Maps script')));
              return;
            }

            const script = document.createElement('script');
            script.id = 'google-maps-script';
            script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places,geometry`;
            script.async = true;
            script.defer = true;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Google Maps script load error'));
            document.head.appendChild(script);
          });
        }

        if (!isMounted || !mapContainerRef.current) return;

        const google = (window as any).google;

        // Custom dark styled map
        const mapOptions = {
          center: selectedCoords,
          zoom: 14,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          styles: [
            { elementType: 'geometry', stylers: [{ color: '#1a1f26' }] },
            { elementType: 'labels.text.stroke', stylers: [{ color: '#121518' }] },
            { elementType: 'labels.text.fill', stylers: [{ color: '#8b9bb4' }] },
            { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#252e3b' }] },
            { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#161c24' }] },
            { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#32B83F' }, { lightness: -50 }] },
            { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0e1216' }] },
            { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] },
          ],
        };

        const map = new google.maps.Map(mapContainerRef.current, mapOptions);
        mapInstanceRef.current = map;

        // Store location pin
        new google.maps.Marker({
          position: STORE_COORDINATES,
          map: map,
          title: 'Nexora Tech Flagship Store',
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: '#32B83F',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
          },
        });

        // Customer delivery destination pin (draggable)
        const customerMarker = new google.maps.Marker({
          position: selectedCoords,
          map: map,
          draggable: true,
          title: 'Your Delivery Location (Drag to adjust)',
          animation: google.maps.Animation.DROP,
        });
        markerRef.current = customerMarker;

        // Calculate initial distance
        calculateDistance(selectedCoords);

        // Click map to reposition marker
        map.addListener('click', (e: any) => {
          const lat = e.latLng.lat();
          const lng = e.latLng.lng();
          const newCoords = { lat, lng };
          customerMarker.setPosition(newCoords);
          setSelectedCoords(newCoords);
          calculateDistance(newCoords);
          reverseGeocode(newCoords);
        });

        // Drag marker
        customerMarker.addListener('dragend', (e: any) => {
          const lat = e.latLng.lat();
          const lng = e.latLng.lng();
          const newCoords = { lat, lng };
          setSelectedCoords(newCoords);
          calculateDistance(newCoords);
          reverseGeocode(newCoords);
        });

        setMapLoaded(true);
      } catch (err: any) {
        console.error('Google Maps init error:', err);
        setMapError(err?.message || 'Could not load Google Maps');
      }
    }

    initMap();

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  // Calculate distance between Store and Customer Pin
  const calculateDistance = (coords: { lat: number; lng: number }) => {
    const google = (window as any).google;
    if (google?.maps?.geometry?.spherical) {
      const storePos = new google.maps.LatLng(STORE_COORDINATES.lat, STORE_COORDINATES.lng);
      const custPos = new google.maps.LatLng(coords.lat, coords.lng);
      const meters = google.maps.geometry.spherical.computeDistanceBetween(storePos, custPos);
      setDistanceKm(Math.round((meters / 1000) * 10) / 10);
    }
  };

  // Reverse geocode lat/lng to human readable address
  const reverseGeocode = (coords: { lat: number; lng: number }) => {
    const google = (window as any).google;
    if (google?.maps?.Geocoder) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: coords }, (results: any, status: any) => {
        if (status === 'OK' && results?.[0]) {
          setAddressText(results[0].formatted_address);
        }
      });
    }
  };

  // Geocode text address to map pin
  const handleAddressSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const google = (window as any).google;
    if (!google?.maps?.Geocoder || !addressText) return;

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: addressText }, (results: any, status: any) => {
      if (status === 'OK' && results?.[0]) {
        const location = results[0].geometry.location;
        const newCoords = { lat: location.lat(), lng: location.lng() };
        setSelectedCoords(newCoords);
        if (mapInstanceRef.current) {
          mapInstanceRef.current.setCenter(newCoords);
          mapInstanceRef.current.setZoom(15);
        }
        if (markerRef.current) {
          markerRef.current.setPosition(newCoords);
        }
        calculateDistance(newCoords);
      }
    });
  };

  // Current GPS location
  const handleUseMyLocation = () => {
    if (!navigator.geolocation) return;
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const newCoords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setSelectedCoords(newCoords);
        if (mapInstanceRef.current) {
          mapInstanceRef.current.setCenter(newCoords);
          mapInstanceRef.current.setZoom(16);
        }
        if (markerRef.current) {
          markerRef.current.setPosition(newCoords);
        }
        calculateDistance(newCoords);
        reverseGeocode(newCoords);
        setIsLocating(false);
      },
      (err) => {
        console.warn('Geolocation error:', err);
        setIsLocating(false);
      },
      { timeout: 8000 }
    );
  };

  const handleConfirm = () => {
    onConfirmAddress(addressText, selectedCoords);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#121519] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-white">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-white/10 bg-[#171B20] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#32B83F]/20 border border-[#32B83F]/40 flex items-center justify-center text-[#32B83F]">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Google Maps Delivery Pin</h3>
              <p className="text-[11px] text-gray-400">
                Pick your precise delivery pin on Google Maps for fast express dispatch
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search and GPS controls */}
        <div className="p-4 bg-[#14181D] border-b border-white/5 space-y-2">
          <form onSubmit={handleAddressSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={addressText}
                onChange={(e) => setAddressText(e.target.value)}
                placeholder="Enter street, area, city or landmark..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0D0F] border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#32B83F]"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 rounded-lg bg-[#1F252E] hover:bg-[#2A323E] text-xs font-semibold text-white border border-white/10 transition-colors cursor-pointer"
            >
              Search
            </button>
            <button
              type="button"
              onClick={handleUseMyLocation}
              disabled={isLocating}
              className="px-3.5 py-2.5 rounded-lg bg-[#32B83F]/15 hover:bg-[#32B83F]/25 text-[#32B83F] border border-[#32B83F]/30 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
              title="Use current GPS location"
            >
              {isLocating ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Navigation className="w-3.5 h-3.5" />
              )}
              <span className="hidden sm:inline">GPS</span>
            </button>
          </form>

          {/* Delivery & Distance Badge */}
          <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1">
            <span className="flex items-center gap-1.5">
              <Store className="w-3.5 h-3.5 text-[#32B83F]" />
              <span>Dispatched from: <strong>Nexora Flagship Tech Hub</strong></span>
            </span>
            {distanceKm !== null && (
              <span className="flex items-center gap-1 text-[#32B83F] font-semibold bg-[#32B83F]/10 px-2 py-0.5 rounded">
                <Truck className="w-3 h-3" />
                <span>~{distanceKm} km away</span>
              </span>
            )}
          </div>
        </div>

        {/* Map Container */}
        <div className="relative w-full h-[340px] bg-[#0E1114]">
          <div ref={mapContainerRef} className="w-full h-full" />
          
          {!mapLoaded && !mapError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#121518]/90 z-10 gap-2">
              <Loader2 className="w-7 h-7 text-[#32B83F] animate-spin" />
              <span className="text-xs text-gray-400">Loading Google Maps...</span>
            </div>
          )}

          {mapError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#121518]/95 p-6 text-center z-10">
              <MapPin className="w-8 h-8 text-amber-400 mb-2 opacity-80" />
              <p className="text-xs text-gray-300 font-semibold mb-1">Google Maps Preview</p>
              <p className="text-[11px] text-gray-400 mb-3">{mapError}</p>
              <p className="text-[11px] text-gray-400">
                You can still manually confirm your typed delivery address below!
              </p>
            </div>
          )}

          {/* Draggable hint overlay */}
          {mapLoaded && (
            <div className="absolute bottom-3 left-3 bg-[#0B0D0F]/90 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg text-[10px] text-gray-300 pointer-events-none shadow-md">
              💡 Tip: Click anywhere on map or drag the red pin to set your exact gate/doorstep
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#171B20] border-t border-white/10 flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <span className="text-[10px] text-gray-400 uppercase font-semibold block">Selected Address:</span>
            <span className="text-xs text-white font-medium truncate block">{addressText}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="px-5 py-2 rounded-xl bg-[#32B83F] hover:bg-[#27A936] text-white text-xs font-bold shadow-md shadow-[#32B83F]/30 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Confirm Location</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
