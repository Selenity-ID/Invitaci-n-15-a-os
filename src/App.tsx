/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCountdown } from './components/useCountdown';
import { MessageCircle, MapPin, CalendarHeart, Clock, X, Gift, Info } from 'lucide-react';

// Event Date: August 1, 2026 at 08:00 PM
const EVENT_DATE = new Date('2026-08-01T20:00:00');

export default function App() {
  // Application State
  const [envelopeState, setEnvelopeState] = useState<'closed' | 'opening' | 'open'>('closed');

  const timeLeft = useCountdown(EVENT_DATE);

  const handleOpenEnvelope = () => {
    if (envelopeState !== 'closed') return;
    
    setEnvelopeState('opening');

    setTimeout(() => {
      setEnvelopeState('open');
    }, 1500);
  };

  const handleCloseEnvelope = () => {
    setEnvelopeState('opening'); // play reverse animation
    setTimeout(() => {
      setEnvelopeState('closed');
    }, 800);
  };

  const WHATSAPP_URL = "https://wa.me/584120983177?text=¡Hola!%20Deseo%20confirmar%20mi%20asistencia%20a%20los%2015%20Años%20de%20Glaymar.%20";

  return (
    <div className="min-h-screen bg-vino-dark flex object-cover items-center justify-center relative overflow-hidden font-montserrat px-4 py-8 touch-manipulation">
      
      {/* Background elegant gradient/overlay texture simulation */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-vino-light)_0%,_var(--color-vino-dark)_100%)] opacity-50 z-0"></div>

      {/* 
        ==============================
        1. THE ENVELOPE FRONT
        ==============================
      */}
      <div className="relative z-10 w-full max-w-[340px] flex justify-center items-center h-full">
        <AnimatePresence>
        {envelopeState !== 'open' && (
          <motion.div
            style={{ perspective: 1200 }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="w-full relative aspect-[3/2] cursor-pointer perspective"
            onClick={handleOpenEnvelope}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Back base of Envelope */}
            <div className="absolute inset-0 bg-vino rounded-lg shadow-2xl overflow-hidden border border-gold/20">
              {/* Pattern lines to make it look like premium paper */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-vino-light opacity-30 transform skew-y-12 translate-y-6"></div>
            </div>

            {/* Simulated letter peaking out on open (not fully showing yet) */}
            <motion.div 
              className="absolute inset-[4px] bg-[#FFF8E7] rounded-md shadow-lg flex flex-col items-center justify-start pt-6 border border-gold/40 z-10"
              animate={envelopeState === 'opening' ? { y: -150, scale: 0.9, opacity: 1 } : { y: 0, scale: 1, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <span className="font-vibes text-4xl text-vino">Mis 15 Años</span>
            </motion.div>

            {/* Front Envelope Flaps using CSS Borders */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-lg z-20">
                <div className="absolute w-full h-[150%] left-0 top-1/2 border-l-[170px] border-r-[170px] border-b-[150px] border-l-transparent border-r-transparent border-b-vino-light -translate-y-1/2 drop-shadow-md"></div>
                <div className="absolute w-[150%] h-full top-0 left-1/2 border-t-[120px] border-b-[120px] border-l-[170px] border-t-transparent border-b-transparent border-l-[#651224] -translate-x-1/2"></div>
                <div className="absolute w-[150%] h-full top-0 right-1/2 border-t-[120px] border-b-[120px] border-r-[170px] border-t-transparent border-b-transparent border-r-[#651224] translate-x-1/2"></div>
            </div>

            {/* Top Flap Rotating */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-full border-l-[170px] border-r-[170px] border-t-[140px] border-l-transparent border-r-transparent border-t-vino drop-shadow-2xl filter"
              style={{ transformOrigin: 'top center', transformStyle: 'preserve-3d' }}
              initial={false}
              animate={
                envelopeState === 'closed' 
                  ? { rotateX: 0, zIndex: 30, opacity: 1 } 
                  : { rotateX: 180, zIndex: 5, opacity: 0.8 }
              }
              transition={{ 
                duration: 0.8, 
                ease: "easeInOut",
                zIndex: { delay: 0.4, duration: 0 } 
              }}
            />
            
            <motion.div 
              className="absolute -bottom-16 w-full text-center pointer-events-none"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <div className="bg-gold text-vino px-6 py-2 rounded-full font-bold text-xs inline-block shadow-lg border border-gold-light tracking-widest uppercase">
                Toca para abrir
              </div>
            </motion.div>

          </motion.div>
        )}
        </AnimatePresence>

      {/* 
        ==============================
        2. THE FULL INVITATION VIEW
        ==============================
      */}
      <AnimatePresence>
        {envelopeState === 'open' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            transition={{ duration: 0.8, ease: "backOut" }}
            className="fixed inset-0 z-40 bg-vino-dark flex items-center justify-center p-4 sm:p-8 overflow-y-auto"
          >
            <div className="w-full max-w-lg bg-vino rounded-t-[50px] rounded-b-xl shadow-2xl relative mt-auto mb-auto border-[3px] border-gold flex flex-col items-center">
              
              {/* Ornaments Border */}
              <div className="absolute inset-2 border border-gold/40 rounded-t-[42px] rounded-b-lg pointer-events-none"></div>

              {/* Close Button Top Right */}
              <button 
                onClick={handleCloseEnvelope}
                className="absolute top-4 right-4 text-gold hover:text-white transition-colors bg-vino-dark/50 p-2 rounded-full z-50"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="pt-16 pb-8 px-6 sm:px-10 flex flex-col items-center text-center w-full relative z-10 space-y-6">
                
                {/* Header */}
                <div className="space-y-2">
                  <p className="text-gold tracking-[0.2em] text-xs font-semibold uppercase">Estás cordialmente invitado a celebrar</p>
                  <h1 className="font-vibes text-6xl sm:text-7xl text-gold pb-2 leading-tight">Mis 15 Años</h1>
                </div>

                {/* Name */}
                <div className="py-4">
                  <h2 className="font-montserrat font-bold text-2xl sm:text-3xl text-white uppercase tracking-widest drop-shadow-md">
                    Glaymar
                    <span className="block text-xl text-gold-light font-medium mt-1">Alejandra</span>
                  </h2>
                  <p className="font-montserrat font-light text-sm sm:text-base text-gold mt-2 uppercase tracking-widest">
                    Estrada Villarroel
                  </p>
                </div>

                {/* Separator */}
                <div className="w-24 h-[2px] bg-gold rounded-full my-4 shadow-[0_0_10px_#D4AF37]"></div>

                <div className="text-gold-light/90 text-sm sm:text-base font-light italic tracking-wide pb-2 px-4 shadow-sm">
                  Será una reunión sencilla, pero muy especial con tu compañía.
                </div>

                {/* Countdown */}
                <div className="bg-vino-dark/60 w-full py-6 px-4 rounded-xl border border-gold/30 backdrop-blur-sm">
                  <p className="text-gold-light text-xs uppercase tracking-[0.2em] mb-4 font-semibold">Faltan:</p>
                  <div className="flex justify-center gap-3 sm:gap-4 w-full">
                    {[
                      { label: 'Días', value: timeLeft.days },
                      { label: 'Hrs', value: timeLeft.hours },
                      { label: 'Min', value: timeLeft.minutes },
                      { label: 'Seg', value: timeLeft.seconds }
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <div className="bg-gold w-14 h-14 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center shadow-lg transform transition hover:scale-105">
                          <span className="text-vino font-bold text-2xl sm:text-3xl">{item.value.toString().padStart(2, '0')}</span>
                        </div>
                        <span className="text-gold text-[10px] sm:text-xs mt-2 uppercase font-semibold">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Event Details */}
                <div className="w-full space-y-6 my-6 text-white text-sm sm:text-base">
                  <div className="flex items-center gap-4 bg-vino-light/30 p-4 rounded-lg border border-gold/10">
                    <div className="bg-gold/20 p-3 rounded-full text-gold">
                      <CalendarHeart className="w-6 h-6" />
                    </div>
                    <div className="text-left flex-1">
                      <p className="text-gold font-bold uppercase text-xs sm:text-sm tracking-wider">Fecha</p>
                      <p className="font-medium">Sábado, 1 de Agosto 2026</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 bg-vino-light/30 p-4 rounded-lg border border-gold/10">
                    <div className="bg-gold/20 p-3 rounded-full text-gold">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div className="text-left flex-1">
                      <p className="text-gold font-bold uppercase text-xs sm:text-sm tracking-wider">Hora</p>
                      <p className="font-medium">8:00 PM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 bg-vino-light/30 p-4 rounded-lg border border-gold/10">
                    <div className="bg-gold/20 p-3 rounded-full text-gold shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <p className="text-gold font-bold uppercase text-xs sm:text-sm tracking-wider mb-1">Lugar de Recepción</p>
                      <p className="font-light leading-snug">Barrio Aquiles Nazoa</p>
                      <p className="font-light leading-snug">Calle Bolívar con Ricauter,</p>
                      <p className="font-light leading-snug italic opacity-80">Mercado de los Guajiros</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 bg-vino-light/30 p-4 rounded-lg border border-gold/10">
                    <div className="bg-gold/20 p-3 rounded-full text-gold shrink-0">
                      <Gift className="w-6 h-6" />
                    </div>
                    <div className="text-left flex-1 items-center">
                      <p className="text-gold font-bold uppercase text-xs sm:text-sm tracking-wider mb-1">Regalo</p>
                      <p className="font-light leading-snug">Lluvia de Sobres</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 bg-vino-light/30 p-4 rounded-lg border border-gold/10">
                    <div className="bg-gold/20 p-3 rounded-full text-gold shrink-0">
                      <Info className="w-6 h-6" />
                    </div>
                    <div className="text-left flex-1">
                      <p className="text-gold font-bold uppercase text-xs sm:text-sm tracking-wider mb-1">Vestimenta</p>
                      <p className="font-light leading-snug text-sm">Solo la quinceañera estará vestida de color vinotinto.</p>
                    </div>
                  </div>
                </div>

                {/* RSVP WhatsApp Button */}
                <div className="w-full pt-4">
                  <a 
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block transform transition active:scale-95"
                  >
                    <motion.button 
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full flex items-center justify-center gap-3 bg-gold text-vino py-4 px-6 rounded-full font-bold text-lg shadow-[0_0_20px_rgba(212,175,55,0.4)] border border-gold-light"
                    >
                      <MessageCircle className="w-6 h-6" />
                      Confirma tu asistencia
                    </motion.button>
                  </a>
                  <p className="text-gold/70 text-xs mt-4 uppercase tracking-widest cursor-pointer hover:text-gold" onClick={handleCloseEnvelope}>
                    ← Cerrar Invitación
                  </p>
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>

    </div>
  );
}

