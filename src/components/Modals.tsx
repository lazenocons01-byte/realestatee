import React, { useState } from 'react';
import { Property, Agent } from '../types';
import { useTheme } from '../context/ThemeContext';
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Upload, 
  MapPin, 
  Maximize2, 
  Bed, 
  Bath, 
  Building2, 
  Sparkles,
  RotateCw,
  Compass,
  ArrowRight
} from 'lucide-react';

/* ---------------- SCHEDULE VISIT MODAL ---------------- */
interface ScheduleVisitModalProps {
  property: Property;
  onClose: () => void;
  onSubmit: (visitData: any) => void;
}

export const ScheduleVisitModal: React.FC<ScheduleVisitModalProps> = ({
  property,
  onClose,
  onSubmit
}) => {
  const { theme, themeConfig } = useTheme();
  const [selectedDate, setSelectedDate] = useState('2026-11-14');
  const [selectedSlot, setSelectedSlot] = useState('11:00 AM');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      propertyId: property.id,
      propertyTitle: property.title,
      date: selectedDate,
      timeSlot: selectedSlot,
      name,
      phone,
      email
    });
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className={`w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl relative transition-all ${
        themeConfig.isDark ? 'bg-[#150a0f] text-rose-50 border border-rose-900/40' : 'bg-white text-slate-900'
      }`}>
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-teal-100 text-[#0D9488] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold">Visit Scheduled Successfully!</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Agent {property.agent.name} has been notified and will meet you at the property at {selectedSlot}, {selectedDate}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <span className="text-xs font-bold text-[#0D9488] uppercase tracking-wider">Book a Physical Site Tour</span>
              <h3 className="text-xl font-extrabold tracking-tight mt-0.5">Schedule a Property Visit</h3>
              <p className="text-xs text-slate-500 truncate mt-0.5">{property.title}</p>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-semibold mb-1">Select Visit Date</label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E8E2D8] bg-[#FBF9F5] text-xs font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Select Convenient Time Slot</label>
                <div className="grid grid-cols-3 gap-2">
                  {['10:00 AM', '11:30 AM', '02:00 PM', '04:00 PM', '05:30 PM'].map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-2 text-xs rounded-xl font-semibold border transition-all ${
                        selectedSlot === slot
                          ? 'bg-[#0D9488] text-white border-[#0D9488] shadow-sm'
                          : 'border-[#E8E2D8] hover:bg-[#F5F0E8] text-slate-700'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-semibold mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98421 XXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="ramesh@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-3 rounded-xl font-bold text-xs mt-4 shadow-md transition-transform active:scale-95 ${themeConfig.primaryBtnClass}`}
            >
              Confirm Appointment & Sync to Calendar
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

/* ---------------- LIST PROPERTY MULTI-STEP MODAL ---------------- */
interface ListPropertyModalProps {
  onClose: () => void;
  onAddProperty: (newProp: Property) => void;
}

export const ListPropertyModal: React.FC<ListPropertyModalProps> = ({ onClose, onAddProperty }) => {
  const { theme, themeConfig } = useTheme();
  const [step, setStep] = useState<number>(1);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'apartment' | 'villa' | 'plot' | 'commercial'>('apartment');
  const [transactionType, setTransactionType] = useState<'buy' | 'rent'>('buy');
  const [price, setPrice] = useState<string>('8500000');
  const [locality, setLocality] = useState('Saravanampatti');
  const [bedrooms, setBedrooms] = useState('3');
  const [bathrooms, setBathrooms] = useState('3');
  const [area, setArea] = useState('1800');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80');

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    const numPrice = Number(price) || 5000000;
    const priceDisplay = numPrice >= 10000000 
      ? `₹${(numPrice / 10000000).toFixed(2)} Cr` 
      : numPrice >= 100000 
      ? `₹${(numPrice / 100000).toFixed(0)} Lakhs` 
      : `₹${numPrice}`;

    const newProp: Property = {
      id: `prop-${Date.now()}`,
      title: title || `${bedrooms} BHK ${category === 'apartment' ? 'Apartment' : 'Villa'} in ${locality}`,
      category,
      transactionType,
      price: numPrice,
      priceDisplay,
      location: {
        locality,
        city: 'Coimbatore',
        address: `${locality}, Coimbatore`,
        lat: 11.0168,
        lng: 76.9558,
        mapX: 45,
        mapY: 45
      },
      specs: {
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        areaSqFt: Number(area) || 1500,
        parking: 2,
        furnishing: 'Semi-Furnished'
      },
      features: ['24/7 Security', 'Covered Car Parking', 'Water Connection', 'Power Backup'],
      amenities: ['Clubhouse', 'Children Play Zone', 'Landscaped Garden'],
      images: [imageUrl],
      tag: 'New',
      verified: true,
      description: `Newly submitted verified listing in ${locality}, Coimbatore. Exceptional build quality and strategic road access.`,
      agent: {
        id: 'agent-1',
        name: 'Karthik Subramanian',
        role: 'Verified Consultant',
        agency: 'Prime Living Realty',
        phone: '+91 98421 88421',
        whatsapp: '+919842188421',
        email: 'karthik@primeliving.in',
        rating: 4.9,
        reviewsCount: 18,
        experienceYears: 12,
        activeListingsCount: 18,
        dealsClosed: 142,
        verified: true,
        languages: ['Tamil', 'English'],
        specialization: 'Luxury Villas',
        location: 'Coimbatore',
        bio: 'Senior property consultant.',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80'
      },
      status: 'available',
      postedAt: 'Just now'
    };

    onAddProperty(newProp);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className={`w-full max-w-xl rounded-3xl p-6 sm:p-8 shadow-2xl relative ${
        themeConfig.isDark ? 'bg-[#150a0f] text-rose-50 border border-rose-900/40' : 'bg-white text-slate-900'
      }`}>
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full ${
                  step >= s ? 'bg-purple-600' : 'bg-slate-200 dark:bg-slate-700'
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-bold text-purple-600 uppercase">Step {step} of 3</span>
          <h3 className="text-xl font-extrabold tracking-tight">List Your Property Free</h3>
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1">Listing Title</label>
              <input
                type="text"
                placeholder="e.g. Spacious 3 BHK Garden Villa"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Property Type</label>
              <div className="grid grid-cols-4 gap-2">
                {(['apartment', 'villa', 'plot', 'commercial'] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`py-2 px-1 text-xs rounded-xl font-bold capitalize border ${
                      category === cat
                        ? 'bg-purple-600 text-white border-purple-600'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Transaction Type</label>
              <div className="grid grid-cols-2 gap-2">
                {(['buy', 'rent'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setTransactionType(type)}
                    className={`py-2 text-xs rounded-xl font-bold uppercase border ${
                      transactionType === type
                        ? 'bg-purple-600 text-white border-purple-600'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    For {type}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setStep(2)}
              className={`w-full py-3 rounded-xl font-bold text-xs mt-4 ${themeConfig.primaryBtnClass}`}
            >
              Continue to Location & Price →
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1">Locality (Coimbatore)</label>
              <select
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium"
              >
                <option value="Saravanampatti">Saravanampatti</option>
                <option value="Peelamedu">Peelamedu</option>
                <option value="Race Course">Race Course</option>
                <option value="Karamadai">Karamadai</option>
                <option value="Gandhipuram">Gandhipuram</option>
                <option value="Vadavalli">Vadavalli</option>
                <option value="Kalapatti">Kalapatti</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold mb-1">Expected Price (in ₹ INR)</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. 7500000"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Super Built-up (sq.ft)</label>
                <input
                  type="number"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="e.g. 1850"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className={`w-2/3 py-3 rounded-xl font-bold text-xs ${themeConfig.primaryBtnClass}`}
              >
                Continue to Specs & Photos →
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold mb-1">Bedrooms</label>
                <select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                >
                  <option value="1">1 BHK</option>
                  <option value="2">2 BHK</option>
                  <option value="3">3 BHK</option>
                  <option value="4">4 BHK</option>
                  <option value="5">5+ BHK</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Bathrooms</label>
                <select
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                >
                  <option value="1">1 Bath</option>
                  <option value="2">2 Baths</option>
                  <option value="3">3 Baths</option>
                  <option value="4">4 Baths</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Cover Image URL</label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-1/3 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleFinish}
                className={`w-2/3 py-3 rounded-xl font-bold text-xs ${themeConfig.primaryBtnClass}`}
              >
                Publish Verified Listing Now
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

/* ---------------- 360 VIRTUAL TOUR MODAL ---------------- */
interface VirtualTourModalProps {
  url: string;
  onClose: () => void;
}

export const VirtualTourModal: React.FC<VirtualTourModalProps> = ({ url, onClose }) => {
  const [rotation, setRotation] = useState(0);

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl relative border border-purple-500/40">
        <div className="p-4 bg-slate-950 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2 text-white">
            <RotateCw className="w-4 h-4 text-purple-400 animate-spin" />
            <span className="font-bold text-sm">360° Interactive High-Definition Virtual Walkthrough</span>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="relative aspect-[16/9] overflow-hidden bg-black flex items-center justify-center">
          <img
            src={url}
            alt="Virtual Tour Room"
            style={{ transform: `scale(1.15) rotate(${rotation * 0.05}deg) translateX(${rotation}px)` }}
            className="w-full h-full object-cover transition-transform duration-300"
          />

          {/* Interactive Hotspot pins */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 p-2 bg-purple-600/90 text-white rounded-full animate-bounce shadow-lg cursor-pointer">
            <Compass className="w-5 h-5" />
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/70 backdrop-blur-md px-4 py-2 rounded-2xl text-xs text-white">
            <button onClick={() => setRotation(r => r - 40)} className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700">⟲ Pan Left</button>
            <span>Pan or Rotate 360°</span>
            <button onClick={() => setRotation(r => r + 40)} className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700">Pan Right ⟳</button>
          </div>
        </div>
      </div>
    </div>
  );
};
