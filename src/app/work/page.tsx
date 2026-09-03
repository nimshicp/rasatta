import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function WorkPage() {
  const caseStudies = [
    {
      id: "01",
      title: "SOCIAL MEDIA MARKETING",
      description: "Your brand deserves more than just posts — it deserves strategy. We craft tailored social media ecosystems that build awareness, trust, and conversions.",
      deliverables: [
        "Platform strategy & management",
        "Content creation",
        "Paid advertising",
        "Analytics & performance optimization"
      ],
      images: [
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop"
      ]
    },
    {
      id: "02",
      title: "BRANDING",
      description: "Where identity meets intention. We create visual languages that reflect who you are and where you’re going.",
      deliverables: [
        "Logo design",
        "Brand identity systems",
        "Color palettes, typography & style guides",
        "Brand strategy & positioning"
      ],
      images: [
        "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=1000&auto=format&fit=crop"
      ]
    },
    {
      id: "03",
      title: "VIDEO PRODUCTION",
      description: "Stories people want to watch. Our production team turns ideas into cinematic visuals that drive emotion and engagement.",
      deliverables: [
        "Brand films",
        "Social media videos",
        "Product videos",
        "Event coverage"
      ],
      images: [
        "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop"
      ]
    },
    {
      id: "04",
      title: "PERSONAL BRANDING",
      description: "Your story deserves to be seen. We help founders, creators, and professionals shape a digital presence that aligns with their expertise, values, and long-term goals.",
      deliverables: [
        "Profile optimization",
        "Content strategy",
        "Thought-leadership content",
        "Long-form & short-form video identity"
      ],
      images: [
        "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?q=80&w=1000&auto=format&fit=crop"
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-[#111111] md:bg-[#F3F3F3] text-white md:text-black selection:bg-white md:selection:bg-black selection:text-black md:selection:text-white transition-colors duration-300">
      
      {/* Navbar Container */}
      <div className="pt-8 px-6 md:px-12 lg:px-24">
        <div className="md:hidden"><Navbar theme="dark" /></div>
        <div className="hidden md:block"><Navbar theme="light" /></div>
      </div>

      {/* Hero Intro Section */}
      <section className="pt-32 pb-24 px-6 md:px-12 lg:px-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-12 border-b border-white/10 md:border-black/20">
        <h1 className="text-[3.5rem] leading-[0.9] md:text-[5.5rem] lg:text-[6.5rem] font-bold tracking-tighter uppercase max-w-4xl">
          EASY TO <br />
          UNDERSTAND. <br />
          <span className="inline-block w-8 h-8 md:w-14 md:h-14 bg-white md:bg-black rounded-full mx-2 md:mx-4 mb-1 md:mb-4"></span> IMPOSSIBLE <br />
          TO IGNORE.
        </h1>
        <p className="text-base md:text-xl font-medium tracking-tight max-w-sm text-white/70 md:text-black/70 mb-4 md:mb-8 text-left md:text-right">
          The work we create lives at the intersection of clarity and surprise and positions brands in culture through shared values and ideals.
        </p>
      </section>

      {/* Sticky Filter Bar */}
      <div className="sticky top-0 z-40 bg-[#111111] md:bg-[#F3F3F3] border-b border-white/10 md:border-black/20 py-6 px-6 md:px-12 lg:px-24 overflow-x-auto hide-scrollbar transition-colors duration-300">
        <div className="flex items-center gap-6 md:gap-8 text-[11px] font-bold tracking-[0.15em] text-white md:text-black uppercase min-w-max">
          <span className="cursor-pointer">Services</span>
          <span className="cursor-pointer text-white/40 md:text-black/40 hover:text-white md:hover:text-black transition-colors">Industries</span>
          <span className="cursor-pointer text-white/40 md:text-black/40 hover:text-white md:hover:text-black transition-colors">All Work</span>
        </div>
      </div>

      {/* Case Studies List */}
      <section className="px-6 md:px-12 lg:px-24">
        {caseStudies.map((item) => (
          <article key={item.id} className="w-full flex flex-col lg:flex-row border-b border-white/10 md:border-black/20 py-12 lg:py-24 gap-8 lg:gap-8">
            
            {/* Left Sticky Column */}
            <div className="lg:w-[40%] flex flex-col justify-between items-start">
              <div className="w-full lg:sticky lg:top-32">
                <div className="flex justify-between items-center w-full mb-8 lg:mb-32">
                  <span className="text-base font-medium">{item.id}</span>
                  <span className="text-base font-medium text-white/50 md:text-black/50">/04</span>
                </div>
                
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase leading-[0.9] mb-6">
                  {item.title}
                </h2>
                
                <p className="text-base md:text-xl font-medium text-white/70 md:text-black/70 leading-relaxed mb-8 max-w-sm">
                  {item.description}
                </p>

                <div className="flex flex-col gap-3 mb-10">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/50 md:text-black/50 mb-2">What we deliver:</span>
                  {item.deliverables.map((deliverable, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 bg-white md:bg-black rounded-full" />
                      <span className="text-sm font-semibold tracking-tight">{deliverable}</span>
                    </div>
                  ))}
                </div>

                <button className="px-6 py-2.5 rounded-full border border-white md:border-black text-xs font-bold uppercase tracking-widest hover:bg-white md:hover:bg-black hover:text-black md:hover:text-white transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>

            {/* Right Scrollable Image Grid */}
            <div className="lg:w-[60%] grid grid-cols-2 gap-2 md:gap-4">
              {item.images.map((imgUrl, idx) => (
                <div 
                  key={idx}
                  className={`w-full aspect-[4/5] bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-700 ${idx % 2 !== 0 ? 'mt-0 lg:mt-12' : ''}`}
                  style={{ backgroundImage: `url(${imgUrl})` }}
                />
              ))}
            </div>

          </article>
        ))}
      </section>

      {/* Footer */}
      <div className="bg-[#111111] md:bg-black">
        <Footer hideCta />
      </div>

    </main>
  );
}
