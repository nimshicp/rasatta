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
        "https://images.unsplash.com/photo-1535016120720-40c746a54336?q=80&w=1000&auto=format&fit=crop"
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
    <main className="min-h-screen bg-[#F3F3F3] text-black selection:bg-black selection:text-white">
      
      {/* Navbar Container */}
      <div className="pt-8 px-6 md:px-12 lg:px-24">
        <Navbar theme="light" />
      </div>

      {/* Hero Intro Section */}
      <section className="pt-32 pb-24 px-6 md:px-12 lg:px-24 flex flex-col md:flex-row justify-between items-end gap-12 border-b border-black/20">
        <h1 className="text-6xl md:text-[7rem] lg:text-[8rem] font-bold tracking-tighter uppercase leading-[0.85] max-w-4xl">
          EASY TO <br />
          UNDERSTAND. <br />
          <span className="inline-block w-12 h-12 md:w-16 md:h-16 bg-black rounded-full mx-2 md:mx-4 mb-2 md:mb-6"></span> IMPOSSIBLE <br />
          TO IGNORE.
        </h1>
        <p className="text-lg md:text-xl font-medium tracking-tight max-w-sm text-black/70 mb-4 md:mb-8 text-left md:text-right">
          The work we create lives at the intersection of clarity and surprise and positions brands in culture through shared values and ideals.
        </p>
      </section>

      {/* Sticky Filter Bar */}
      <div className="sticky top-0 z-40 bg-[#F3F3F3] border-b border-black/20 py-6 px-6 md:px-12 lg:px-24">
        <div className="flex items-center gap-8 text-[11px] font-bold tracking-[0.15em] text-black uppercase">
          <span className="cursor-pointer">Services</span>
          <span className="cursor-pointer text-black/40 hover:text-black transition-colors">Industries</span>
          <span className="cursor-pointer text-black/40 hover:text-black transition-colors">All Work</span>
        </div>
      </div>

      {/* Case Studies List */}
      <section className="px-6 md:px-12 lg:px-24">
        {caseStudies.map((item) => (
          <article key={item.id} className="w-full flex flex-col lg:flex-row border-b border-black/20 py-16 lg:py-24 gap-12 lg:gap-8">
            
            {/* Left Sticky Column */}
            <div className="lg:w-[40%] flex flex-col justify-between items-start">
              <div className="w-full sticky top-32">
                <div className="flex justify-between items-center w-full mb-12 lg:mb-32">
                  <span className="text-base font-medium">{item.id}</span>
                  <span className="text-base font-medium text-black/50">/04</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase leading-[0.9] mb-8">
                  {item.title}
                </h2>
                
                <p className="text-lg md:text-xl font-medium text-black/70 leading-relaxed mb-8 max-w-sm">
                  {item.description}
                </p>

                <div className="flex flex-col gap-3 mb-12">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/50 mb-2">What we deliver:</span>
                  {item.deliverables.map((deliverable, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 bg-black rounded-full" />
                      <span className="text-sm font-semibold tracking-tight">{deliverable}</span>
                    </div>
                  ))}
                </div>

                <button className="px-6 py-2.5 rounded-full border border-black text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>

            {/* Right Scrollable Image Grid */}
            <div className="lg:w-[60%] grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                className="w-full aspect-[4/5] bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-700"
                style={{ backgroundImage: `url(${item.images[0]})` }}
              />
              <div 
                className="w-full aspect-[4/5] bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-700 mt-0 md:mt-12"
                style={{ backgroundImage: `url(${item.images[1]})` }}
              />
            </div>

          </article>
        ))}
      </section>

      {/* Footer */}
      <div className="bg-black">
        <Footer />
      </div>

    </main>
  );
}
