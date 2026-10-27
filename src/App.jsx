import React, { useState, useRef } from 'react';

const THEMES = {
  khmerGold: {
    name: 'Royal Khmer Gold & Crimson',
    bg: 'bg-[#1A0507]', // Deep royal maroon/crimson background
    card: 'bg-[#2A0A0E] border-[#D4AF37]/50', // Rich dark red card with gold border
    text: 'text-[#FDF6E2]', // Soft cream text
    muted: 'text-[#D4AF37]/80', // Gold accents
    accent: 'bg-[#D4AF37] text-slate-950 font-semibold shadow-lg shadow-amber-500/20',
    accentBorder: 'border-[#D4AF37]',
    badge: 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30',
  },
  floral: {
    name: 'Classic Floral',
    bg: 'bg-[#FAF7F2]',
    card: 'bg-white border-[#E8DFD5]',
    text: 'text-[#3C3530]',
    muted: 'text-[#7A6F66]',
    accent: 'bg-[#8C6D58] text-white',
    accentBorder: 'border-[#8C6D58]',
    badge: 'bg-[#F3ECE4] text-[#8C6D58]'
  }
};

export default function App() {
  const [isAdmin, setIsAdmin] = useState(() => {
    return window.location.search.includes('admin=true');
  });

  const [config, setConfig] = useState({
    partner1: 'Sophea',
    partner2: 'Vibol',
    date: 'Saturday, November 21, 2026',
    time: '7:00 AM (Morning Ceremony) & 5:00 PM (Reception)',
    tagline: 'With great joy, our families cordially invite you to celebrate our traditional Khmer wedding ceremony and reception in Phnom Penh',
    heroImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1400&q=80',
    theme: 'khmerGold',
    
    ceremonyVenue: 'The Borei Angkor Residence & Villa',
    ceremonyAddress: 'Samdach Sothearos Blvd, Phnom Penh, Cambodia',
    ceremonyMapUrl: 'https://maps.google.com/?q=Phnom+Penh+Cambodia',
    
    receptionVenue: 'Sokha Phnom Penh Hotel (Grand Ballroom)',
    receptionAddress: 'Street Keo Chenda, Phum 1, Sangkat Chroy Changvar, Phnom Penh',
    receptionMapUrl: 'https://maps.google.com/?q=Sokha+Phnom+Penh+Hotel',
    
    dressCode: 'Morning: Traditional Silk Attire (Pastel / Gold) • Evening: Formal Gala / Evening Wear',

    // Cambodian Wedding Ritual Timeline
    story: [
      { id: '1', time: '7:00 AM', title: 'Hai Goan Gomlom (Groom’s Procession)', desc: 'The groom and his family arrive bearing traditional trays of fruits, gifts, and offerings accompanied by traditional music.' },
      { id: '2', time: '9:00 AM', title: 'Soat Mun (Monk Blessing)', desc: 'Sacred chanting by Buddhist monks to bestow good fortune, peace, and spiritual blessing upon the couple.' },
      { id: '3', time: '10:30 AM', title: 'Gaat Sah (Hair-Cutting Ceremony)', desc: 'Symbolic cleansing and blessing where family and elders gently clip the couple’s hair for a fresh start.' },
      { id: '4', time: '5:00 PM', title: 'Grand Wedding Reception', desc: 'An evening banquet filled with exquisite Cambodian cuisine, toasts, music, and celebration with family and friends.' }
    ],

    gallery: [
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
    ],

    registries: [
      { name: 'ABA Bank Transfer (USD)', url: '#' },
      { name: 'Honeymoon & Future Fund', url: '#' }
    ]
  });

  const [audioSrc] = useState('/wedding-song.mp3');
  const [isPlaying, setIsPlaying] = useState(false);
  const [envelopeOpened, setEnvelopeOpened] = useState(false);

  const audioRef = useRef(null);

  const playMusic = async () => {
    if (!audioRef.current) return;
    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (err) {
      console.warn('Ensure wedding-song.mp3 is inside your public/ folder.');
    }
  };

  const pauseMusic = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const toggleMusic = () => {
    if (isPlaying) pauseMusic();
    else playMusic();
  };

  const currentTheme = THEMES[config.theme] || THEMES.khmerGold;

  // Guest View
  const GuestInvitation = () => (
    <div className={`min-h-screen ${currentTheme.bg} ${currentTheme.text} relative pb-24 transition-colors duration-500`}>
      
      {/* Royal Khmer Envelope Splash */}
      {!envelopeOpened && (
        <div className="fixed inset-0 bg-[#0F0204]/95 backdrop-blur-md z-50 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-24 h-24 rounded-full bg-[#2A0A0E] border-2 border-[#D4AF37] flex items-center justify-center text-4xl mb-6 shadow-2xl shadow-amber-500/20 animate-pulse">
            👑
          </div>
          <p className="text-xs uppercase tracking-[0.35em] text-[#D4AF37] mb-3 font-serif">សេចក្តីអញ្ជើញ / Wedding Invitation</p>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-3 text-[#FDF6E2]">
            {config.partner1} <span className="text-[#D4AF37] font-light">&</span> {config.partner2}
          </h1>
          <p className="text-sm text-[#FDF6E2]/80 mb-8 font-serif">{config.date}</p>
          <button
            onClick={() => {
              setEnvelopeOpened(true);
              playMusic();
            }}
            className="px-9 py-4 bg-[#D4AF37] text-slate-950 font-bold rounded-full text-sm shadow-xl shadow-amber-500/30 cursor-pointer transition transform hover:scale-105"
          >
            ✨ បើកធៀបការ / Open Invitation
          </button>
        </div>
      )}

      {/* Floating Music Button */}
      {envelopeOpened && (
        <div className="fixed top-5 right-5 z-40">
          <button
            onClick={toggleMusic}
            className={`px-4 py-2 rounded-full text-xs font-semibold shadow-lg flex items-center gap-2 cursor-pointer ${currentTheme.accent}`}
          >
            <span className={isPlaying ? 'inline-block animate-spin' : ''}>💿</span>
            {isPlaying ? 'Music Playing • Pause' : 'Play Wedding Music'}
          </button>
        </div>
      )}

      {/* Hero Banner */}
      <div className="relative h-[580px] flex items-center justify-center text-center overflow-hidden border-b-2 border-[#D4AF37]/30">
        <img src={config.heroImage} alt="Cambodian Wedding" className="absolute inset-0 w-full h-full object-cover opacity-75" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A0507] via-black/40 to-black/60" />
        <div className="relative z-10 px-6 max-w-3xl text-white">
          <div className="inline-block px-4 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs uppercase tracking-[0.3em] mb-4">
            Phnom Penh, Cambodia 🇰🇭
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4 text-[#FDF6E2]">
            {config.partner1} <span className="text-[#D4AF37] font-light">&</span> {config.partner2}
          </h1>
          <p className="text-sm md:text-base text-[#FDF6E2]/90 mb-6 leading-relaxed max-w-xl mx-auto font-serif">{config.tagline}</p>
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-black/40 backdrop-blur-md border border-[#D4AF37]/40 text-sm text-[#D4AF37]">
            <span>📅 {config.date}</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 space-y-20 mt-16">
        
        {/* Venues in Phnom Penh */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className={`p-7 rounded-2xl border shadow-lg flex flex-col justify-between ${currentTheme.card}`}>
            <div>
              <div className="text-2xl mb-2">🏛️</div>
              <h3 className="text-xl font-serif font-bold mb-1 text-[#D4AF37]">Morning Ceremony</h3>
              <p className="font-semibold text-sm text-[#FDF6E2]">{config.ceremonyVenue}</p>
              <p className={`text-xs mt-1 mb-6 ${currentTheme.muted}`}>{config.ceremonyAddress}</p>
            </div>
            <a
              href={config.ceremonyMapUrl}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold border transition ${currentTheme.accentBorder} text-[#D4AF37] hover:bg-[#D4AF37]/10`}
            >
              📍 Open in Google Maps
            </a>
          </div>

          <div className={`p-7 rounded-2xl border shadow-lg flex flex-col justify-between ${currentTheme.card}`}>
            <div>
              <div className="text-2xl mb-2">🥂</div>
              <h3 className="text-xl font-serif font-bold mb-1 text-[#D4AF37]">Evening Reception</h3>
              <p className="font-semibold text-sm text-[#FDF6E2]">{config.receptionVenue}</p>
              <p className={`text-xs mt-1 mb-4 ${currentTheme.muted}`}>{config.receptionAddress}</p>
              <span className={`inline-block text-xs px-3 py-1 rounded-full mb-4 ${currentTheme.badge}`}>
                {config.dressCode}
              </span>
            </div>
            <a
              href={config.receptionMapUrl}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold border transition ${currentTheme.accentBorder} text-[#D4AF37] hover:bg-[#D4AF37]/10`}
            >
              📍 Open in Google Maps
            </a>
          </div>
        </section>

        {/* Traditional Khmer Ceremony Timeline */}
        <section>
          <div className="text-center mb-10">
            <p className={`text-xs uppercase tracking-[0.25em] mb-2 ${currentTheme.muted}`}>Traditional Program</p>
            <h2 className="text-3xl font-serif font-bold text-[#FDF6E2]">Ceremony & Reception Schedule</h2>
          </div>
          <div className="space-y-6">
            {config.story.map((item) => (
              <div key={item.id} className={`p-6 rounded-2xl border flex gap-5 items-start shadow-md ${currentTheme.card}`}>
                <span className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 ${currentTheme.accent}`}>
                  {item.time}
                </span>
                <div>
                  <h4 className="font-serif font-bold text-lg mb-1 text-[#D4AF37]">{item.title}</h4>
                  <p className={`text-sm leading-relaxed ${currentTheme.muted}`}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Engagement & Pre-Wedding Gallery */}
        <section>
          <div className="text-center mb-10">
            <p className={`text-xs uppercase tracking-[0.25em] mb-2 ${currentTheme.muted}`}>Photo Gallery</p>
            <h2 className="text-3xl font-serif font-bold text-[#FDF6E2]">Our Memories</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {config.gallery.map((img, i) => (
              <div key={i} className="overflow-hidden rounded-2xl shadow-lg border border-[#D4AF37]/20 group">
                <img
                  src={img}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-52 object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Gift & Registry (ABA / Cash Box tradition in Cambodia) */}
        <section className={`p-8 rounded-3xl border shadow-xl text-center ${currentTheme.card}`}>
          <div className="text-3xl mb-2">🎁</div>
          <h2 className="text-2xl font-serif font-bold mb-2 text-[#D4AF37]">Wedding Gift & Blessing</h2>
          <p className={`text-sm mb-6 ${currentTheme.muted}`}>
            Your presence and blessings are our greatest gifts. For family and friends who wish to contribute to our future journey:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {config.registries.map((reg, idx) => (
              <a
                key={idx}
                href={reg.url}
                className={`px-7 py-3.5 rounded-full text-xs font-semibold transition hover:opacity-90 ${currentTheme.accent}`}
              >
                {reg.name} →
              </a>
            ))}
          </div>
        </section>

      </div>

      {/* Admin Link */}
      <div className="text-center mt-20">
        <button
          onClick={() => setIsAdmin(true)}
          className={`text-[11px] opacity-40 hover:opacity-100 cursor-pointer ${currentTheme.muted}`}
        >
          🔒 Couple Admin Login
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <audio ref={audioRef} src={audioSrc} loop />

      {!isAdmin ? (
        <GuestInvitation />
      ) : (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
          <header className="h-16 border-b border-slate-800 bg-slate-900 px-6 flex items-center justify-between sticky top-0 z-50">
            <div className="flex items-center gap-3">
              <span className="font-bold text-amber-400">👑 Khmer Wedding Admin Studio</span>
            </div>
            <button
              onClick={() => {
                setEnvelopeOpened(false);
                pauseMusic();
                setIsAdmin(false);
              }}
              className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer"
            >
              👁 View Guest Invitation
            </button>
          </header>

          <div className="max-w-3xl mx-auto w-full p-8 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-amber-400 text-xs uppercase">Edit Couple Names & Venues</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400">Partner 1 (e.g. Sophea)</label>
                  <input type="text" value={config.partner1} onChange={e => setConfig({...config, partner1: e.target.value})} className="w-full mt-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white" />
                </div>
                <div>
                  <label className="text-xs text-slate-400">Partner 2 (e.g. Vibol)</label>
                  <input type="text" value={config.partner2} onChange={e => setConfig({...config, partner2: e.target.value})} className="w-full mt-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white" />
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-400">Morning Ceremony Venue (Phnom Penh)</label>
                <input type="text" value={config.ceremonyVenue} onChange={e => setConfig({...config, ceremonyVenue: e.target.value})} className="w-full mt-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white" />
              </div>
              <div>
                <label className="text-xs text-slate-400">Evening Reception Venue (Phnom Penh)</label>
                <input type="text" value={config.receptionVenue} onChange={e => setConfig({...config, receptionVenue: e.target.value})} className="w-full mt-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}