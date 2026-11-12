import React, { useState } from 'react';
import { Container } from '../components/Container';
import { SectionHeader } from '../components/SectionHeader';
import { MagneticButton } from '../components/MagneticButton';
import { site } from '../config/site';
import { ArrowUpRight, Check, Copy } from 'lucide-react';

const PROJECT_TYPES = [
  'Website',
  'Web app',
  'AI product',
  'Workshop',
  'Something else',
];

export const Contact: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [selectedChips, setSelectedChips] = useState<string[]>(['Website']);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(text);
    setTimeout(() => setCopiedEmail(null), 1600);
  };

  const toggleChip = (chip: string) => {
    if (selectedChips.includes(chip)) {
      if (selectedChips.length > 1) {
        setSelectedChips(selectedChips.filter((c) => c !== chip));
      }
    } else {
      setSelectedChips([...selectedChips, chip]);
    }
  };

  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: boolean } = {};
    if (!name.trim()) newErrors.name = true;
    if (!email.trim() || !email.includes('@')) newErrors.email = true;
    if (!message.trim()) newErrors.message = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSending(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          projectTypes: selectedChips,
          message: message.trim(),
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        throw new Error('API submission failed');
      }
    } catch {
      // Graceful fallback to mailto
      const subject = encodeURIComponent(`Project Inquiry: ${selectedChips.join(', ')} — from ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nInterested in: ${selectedChips.join(', ')}\n\nMessage:\n${message}`
      );
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      setSubmitted(true);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section
      id="contact"
      data-bg="grad-paper"
      className="theme-paper relative w-full py-[var(--section-y)] select-none bg-[#F4EFE4] text-[#0A0A0B] rounded-2xl md:rounded-3xl shadow-2xl transition-colors duration-1000"
      aria-label="Contact Prakhar Kaushik"
    >
      <Container>
        <SectionHeader
          index="08"
          metaName="CONTACT"
          ghostWord="HELLO"
          line1="Let's make"
          line2="something *iconic*"
          theme="paper"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mt-12">
        {/* Left Column (Cols 1-5): Pitch, Details & Giant Say Hello Button */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full">
          <div>
            <p className="font-display font-light text-[clamp(1.4rem,2.2vw,2rem)] text-[#0A0A0B] leading-[1.3] mb-8">
              Got a business without a proper website? A project that deserves better design? A workshop for your school?
              Tell me about it.
            </p>

            {/* Mono Details List with Copy-to-Clipboard */}
            <div className="flex flex-col gap-4 font-mono text-xs uppercase tracking-widest text-[#0A0A0B]/80 pt-6 border-t border-[#0A0A0B]/15">
              {/* Primary Email */}
              <div
                onClick={() => copyToClipboard(site.email)}
                className="flex items-baseline justify-between group cursor-pointer hover:text-crimson transition-colors"
                title="Click to copy email"
              >
                <span className="font-semibold">EMAIL</span>
                <span className="mx-2 grow border-b border-dotted border-[#0A0A0B]/25 group-hover:border-crimson" />
                <span className="flex items-center gap-1.5 lowercase font-mono">
                  {copiedEmail === site.email ? (
                    <span className="text-crimson font-bold uppercase tracking-wider flex items-center gap-1">
                      <Check className="w-3 h-3" /> COPIED ✓
                    </span>
                  ) : (
                    <>
                      <span>{site.email}</span>
                      <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </>
                  )}
                </span>
              </div>

              {/* Brand Studio Email */}
              <div
                onClick={() => copyToClipboard(site.brandEmail)}
                className="flex items-baseline justify-between group cursor-pointer hover:text-crimson transition-colors"
                title="Click to copy studio email"
              >
                <span className="font-semibold">STUDIO</span>
                <span className="mx-2 grow border-b border-dotted border-[#0A0A0B]/25 group-hover:border-crimson" />
                <span className="flex items-center gap-1.5 lowercase font-mono">
                  {copiedEmail === site.brandEmail ? (
                    <span className="text-crimson font-bold uppercase tracking-wider flex items-center gap-1">
                      <Check className="w-3 h-3" /> COPIED ✓
                    </span>
                  ) : (
                    <>
                      <span>{site.brandEmail}</span>
                      <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </>
                  )}
                </span>
              </div>

              {/* Based in */}
              <div className="flex items-baseline justify-between">
                <span className="font-semibold">BASED IN</span>
                <span className="mx-2 grow border-b border-dotted border-[#0A0A0B]/25" />
                <span>{site.location}</span>
              </div>

              {/* Response Time */}
              <div className="flex items-baseline justify-between">
                <span className="font-semibold">RESPONSE</span>
                <span className="mx-2 grow border-b border-dotted border-[#0A0A0B]/25" />
                <span className="text-crimson font-medium">Within 24 hours</span>
              </div>
            </div>
          </div>

          {/* Giant "Say Hello" Circular Magnetic Button (180px) */}
          <div className="mt-12 flex justify-start">
            <MagneticButton
              as="a"
              href={`mailto:${site.email}`}
              strength={0.4}
              data-cursor="open"
              className="relative w-40 h-40 md:w-48 md:h-48 rounded-full bg-crimson text-[#0A0A0B] flex flex-col items-center justify-center shadow-2xl hover:bg-[#0A0A0B] hover:text-[#F4EFE4] transition-all duration-400 group overflow-hidden"
              aria-label="Send direct email to Prakhar Kaushik"
            >
              {/* Orbiting Sparkle */}
              <svg
                viewBox="0 0 100 100"
                fill="currentColor"
                className="absolute top-4 right-6 w-4 h-4 animate-[spin_8s_linear_infinite]"
              >
                <path d="M50 0 C50 32 68 50 100 50 C68 50 50 68 50 100 C50 68 32 50 0 50 C32 50 50 32 50 0 Z" />
              </svg>

              <span className="font-display font-extrabold text-2xl md:text-3xl leading-tight text-center">
                Say<br />hello
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest mt-1 opacity-80">
                MAILTO ↗
              </span>
            </MagneticButton>
          </div>
        </div>

        {/* Right Column (Cols 7-12): Form with Clean Hairlines */}
        <div className="lg:col-span-7 p-6 md:p-10 rounded-xl bg-[#EDE6D6]/50 border border-[#0A0A0B]/10">
          {submitted ? (
            <div className="py-16 flex flex-col items-center text-center">
              <svg viewBox="0 0 100 100" fill="#E01B24" className="w-12 h-12 mb-4 animate-[spin_10s_linear_infinite]">
                <path d="M50 0 C50 32 68 50 100 50 C68 50 50 68 50 100 C50 68 32 50 0 50 C32 50 50 32 50 0 Z" />
              </svg>
              <h3 className="font-display font-extrabold text-2xl md:text-3xl text-[#0A0A0B]">
                Message ready — your mail app just opened.
              </h3>
              <p className="font-mono text-xs uppercase tracking-widest text-[#0A0A0B]/70 mt-3">
                I'LL GET BACK TO YOU SHORTLY.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-6 px-6 py-2.5 rounded-pill border border-[#0A0A0B]/30 font-mono text-xs uppercase tracking-widest hover:border-crimson hover:text-crimson transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              {/* Field 1: Name */}
              <div className="relative flex flex-col">
                <label className="font-mono text-xs uppercase tracking-widest text-[#0A0A0B]/70 mb-2 font-medium">
                  YOUR NAME *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Maya Sharma"
                  className={`bg-transparent py-2.5 text-lg font-sans text-[#0A0A0B] border-b outline-none transition-colors duration-300 placeholder:text-[#0A0A0B]/30 ${
                    errors.name ? 'border-crimson animate-[shake_0.4s_ease-in-out]' : 'border-[#0A0A0B]/20 focus:border-crimson'
                  }`}
                />
                {errors.name && (
                  <span className="font-mono text-[10px] text-crimson uppercase tracking-wider mt-1">
                    Please provide your name
                  </span>
                )}
              </div>

              {/* Field 2: Email */}
              <div className="relative flex flex-col">
                <label className="font-mono text-xs uppercase tracking-widest text-[#0A0A0B]/70 mb-2 font-medium">
                  EMAIL ADDRESS *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. maya@company.com"
                  className={`bg-transparent py-2.5 text-lg font-sans text-[#0A0A0B] border-b outline-none transition-colors duration-300 placeholder:text-[#0A0A0B]/30 ${
                    errors.email ? 'border-crimson animate-[shake_0.4s_ease-in-out]' : 'border-[#0A0A0B]/20 focus:border-crimson'
                  }`}
                />
                {errors.email && (
                  <span className="font-mono text-[10px] text-crimson uppercase tracking-wider mt-1">
                    Please enter a valid email address
                  </span>
                )}
              </div>

              {/* Field 3: Project Type Select Chips */}
              <div className="flex flex-col">
                <label className="font-mono text-xs uppercase tracking-widest text-[#0A0A0B]/70 mb-3 font-medium">
                  WHAT ARE YOU BUILDING?
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {PROJECT_TYPES.map((chip) => {
                    const isSelected = selectedChips.includes(chip);
                    return (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => toggleChip(chip)}
                        className={`px-4 py-2 min-h-[44px] touch-expand rounded-pill font-mono text-xs uppercase tracking-wider transition-all duration-200 border flex items-center justify-center ${
                          isSelected
                            ? 'bg-[#0A0A0B] text-[#F4EFE4] border-[#0A0A0B] font-semibold shadow-md'
                            : 'bg-transparent text-[#0A0A0B]/80 border-[#0A0A0B]/20 hover:border-[#0A0A0B]'
                        }`}
                      >
                        {chip}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Field 4: Message */}
              <div className="relative flex flex-col">
                <label className="font-mono text-xs uppercase tracking-widest text-[#0A0A0B]/70 mb-2 font-medium">
                  TELL ME MORE *
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Give a brief summary of the project scope, timeline and goals..."
                  className={`bg-transparent py-2.5 text-base font-sans text-[#0A0A0B] border-b outline-none transition-colors duration-300 resize-none placeholder:text-[#0A0A0B]/30 ${
                    errors.message ? 'border-crimson animate-[shake_0.4s_ease-in-out]' : 'border-[#0A0A0B]/20 focus:border-crimson'
                  }`}
                />
                {errors.message && (
                  <span className="font-mono text-[10px] text-crimson uppercase tracking-wider mt-1">
                    Please tell me a little about your project
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSending}
                  className={`h-14 min-h-[44px] px-8 rounded-pill font-mono text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-xl group ${
                    isSending
                      ? 'bg-[#0A0A0B]/60 text-[#F4EFE4]/60 cursor-wait'
                      : 'bg-[#0A0A0B] text-[#F4EFE4] hover:bg-crimson hover:text-[#0A0A0B]'
                  }`}
                >
                  <span>{isSending ? 'Sending...' : 'Send it'}</span>
                  <ArrowUpRight className={`w-4 h-4 transition-transform ${isSending ? 'animate-pulse' : 'group-hover:translate-x-1 group-hover:-translate-y-1'}`} />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      </Container>
    </section>
  );
};
