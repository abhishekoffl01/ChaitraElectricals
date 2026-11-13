import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation, Compass, Clock, ExternalLink, Car, Check } from 'lucide-react';
import { STORE_INFO, NEARBY_HUBS } from '../data/inventory';
import L from 'leaflet';

export const StoreLocationMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const isStoreOpen = (): { open: boolean; statusText: string } => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const timeVal = hour + minute / 60;

    if (day === 0) {
      if (timeVal >= 9 && timeVal < 14) {
        return { open: true, statusText: 'Open Today until 2:00 PM' };
      }
      return { open: false, statusText: 'Closed Now · Opens Mon 8:30 AM' };
    } else {
      if (timeVal >= 8.5 && timeVal < 20.5) {
        return { open: true, statusText: 'Open Today until 8:30 PM' };
      }
      return { open: false, statusText: 'Closed Now · Opens at 8:30 AM' };
    }
  };

  const storeStatus = isStoreOpen();

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const lat = STORE_INFO.coordinates.lat;
    const lng = STORE_INFO.coordinates.lng;

    const map = L.map(mapContainerRef.current, {
      center: [lat, lng],
      zoom: 14,
      scrollWheelZoom: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    const customIcon = L.divIcon({
      className: 'custom-hardware-marker',
      html: `
        <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 44px; height: 44px; background: #221f1c; border: 3px solid #c92a22; border-radius: 9999px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.45);">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
          </svg>
          <div style="position: absolute; bottom: -8px; width: 12px; height: 12px; background: #221f1c; transform: rotate(45deg); border-right: 3px solid #c92a22; border-bottom: 3px solid #c92a22;"></div>
        </div>
      `,
      iconSize: [44, 44],
      iconAnchor: [22, 44],
      popupAnchor: [0, -46],
    });

    const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

    marker.bindPopup(`
      <div style="font-family: sans-serif; padding: 4px; min-width: 210px;">
        <p style="font-size: 10px; font-weight: 700; color: #c92a22; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 4px 0;">Electrical & Plumbing</p>
        <h4 style="font-size: 14px; font-weight: 700; margin: 0 0 6px 0; color: #221f1c;">Chaitra Electricals</h4>
        <p style="font-size: 12px; color: #554f48; margin: 0 0 8px 0; line-height: 1.4;">B.H. Road, Near Bus Stand, Kargal - 577421</p>
        <div style="font-size: 11px; color: #15803d; font-weight: 600; margin-bottom: 8px;">${storeStatus.statusText}</div>
        <a href="https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}" target="_blank" rel="noopener noreferrer" style="display: inline-block; background: #c92a22; color: white; padding: 6px 12px; text-decoration: none; font-size: 11px; font-weight: 700; text-transform: uppercase;">Get Directions &rarr;</a>
      </div>
    `).openPopup();

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  const handleRecenter = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([STORE_INFO.coordinates.lat, STORE_INFO.coordinates.lng], 15);
    }
  };

  const copyAddressToClipboard = () => {
    const fullText = `${STORE_INFO.name}, ${STORE_INFO.address}, ${STORE_INFO.town}, Sagar Taluk, Shivamogga Dist, Karnataka - ${STORE_INFO.pincode}. Phone: ${STORE_INFO.phonePrimary}`;
    navigator.clipboard.writeText(fullText);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${STORE_INFO.coordinates.lat},${STORE_INFO.coordinates.lng}`;

  return (
    <section id="location" className="py-14 md:py-20 bg-white border-t border-[#e6e4e1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-5 mb-8 border-b border-[#e6e4e1]">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c92a22] mb-1">
              <Compass className="w-3.5 h-3.5" />
              <span>Store Location & GPS Tracking · Kargal, Sagar Taluk</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-[#221f1c] font-display">
              Visit Our Showroom on B.H. Road
            </h2>
            <p className="mt-1.5 text-sm text-[#666059] max-w-2xl">
              Positioned directly on the Bangalore–Honnavar Highway (NH 206) in Kargal with dedicated loading bay space for pickup trucks.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={copyAddressToClipboard}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#221f1c] bg-[#f4f3f2] hover:bg-[#e7e4e1] border border-[#dad6d1] transition-colors cursor-pointer"
            >
              {copiedAddress ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <MapPin className="w-3.5 h-3.5 text-[#c92a22]" />}
              <span>{copiedAddress ? 'Address Copied!' : 'Copy Address'}</span>
            </button>

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#c92a22] hover:bg-[#b0221b] transition-colors"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Map & Hubs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Interactive Map Frame (7 cols) */}
          <div className="lg:col-span-7 bg-[#f8f7f6] overflow-hidden border border-[#e6e4e1] shadow-sm relative">
            <div className="flex items-center justify-between px-4 py-3 bg-[#221f1c] text-white text-xs border-b border-[#322d28]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="font-medium text-[#d4cec7]">GPS: 14.2256° N, 74.8468° E · B.H. Road, Kargal</span>
              </div>
              <button
                type="button"
                onClick={handleRecenter}
                className="text-xs text-[#e85d52] hover:text-white font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Reset View
              </button>
            </div>

            <div
              ref={mapContainerRef}
              className="w-full h-[380px] md:h-[460px] z-10"
              style={{ background: '#f8f7f6' }}
            />

            <div className="p-4 bg-white border-t border-[#e6e4e1] flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2 text-[#554f48]">
                <Car className="w-4 h-4 text-[#c92a22] shrink-0" />
                <span>Heavy vehicle unloading & pickup parking directly in front of showroom.</span>
              </div>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#c92a22] hover:underline uppercase tracking-wider"
              >
                Turn-by-Turn GPS &rarr;
              </a>
            </div>
          </div>

          {/* Timing & Distance Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Business Hours */}
            <div className="p-5 bg-[#f8f7f6] border border-[#e6e4e1]">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#e6e4e1]">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#221f1c]">
                  <Clock className="w-4 h-4 text-[#c92a22]" />
                  <span>Business Hours</span>
                </div>
                <span className={`text-[11px] font-bold px-2.5 py-0.5 ${
                  storeStatus.open ? 'bg-emerald-100 text-emerald-800' : 'bg-[#e6e4e1] text-[#4a4540]'
                }`}>
                  {storeStatus.statusText}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-[#ebe8e4]">
                  <span className="text-[#666059]">Monday – Saturday</span>
                  <span className="font-bold text-[#221f1c] font-mono">8:30 AM – 8:30 PM</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#666059]">Sunday</span>
                  <span className="font-bold text-[#221f1c] font-mono">9:00 AM – 2:00 PM</span>
                </div>
              </div>
            </div>

            {/* Key Distances */}
            <div className="p-5 bg-[#f8f7f6] border border-[#e6e4e1]">
              <h3 className="text-xs font-bold text-[#221f1c] uppercase tracking-wider mb-3 pb-2 border-b border-[#e6e4e1]">
                Distance from Nearby Towns
              </h3>

              <div className="space-y-2">
                {NEARBY_HUBS.map((hub) => (
                  <div
                    key={hub.name}
                    className="flex items-center justify-between p-2.5 bg-white border border-[#e6e4e1] text-xs hover:border-[#c92a22]/50 transition-colors"
                  >
                    <div>
                      <p className="font-semibold text-[#221f1c]">{hub.name}</p>
                      <p className="text-[#7c756d] text-[11px]">{hub.time}</p>
                    </div>
                    <span className="font-mono font-bold text-[#c85242] tabular-nums">
                      {hub.distance}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Phone Box */}
            <div className="p-5 bg-[#221f1c] text-white flex items-center justify-between border border-[#322d28]">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-[#a39b93]">Showroom Sales Desk</p>
                <p className="text-base font-bold text-white font-mono mt-0.5">{STORE_INFO.phonePrimary}</p>
              </div>
              <a
                href={`tel:${STORE_INFO.phonePrimary.replace(/\s+/g, '')}`}
                className="px-4 py-2.5 bg-[#c92a22] hover:bg-[#b0221b] text-white font-bold uppercase tracking-wider text-xs transition-colors"
              >
                Call Store
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
