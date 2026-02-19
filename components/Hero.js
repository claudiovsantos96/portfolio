export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 pt-24 pb-16 max-w-6xl mx-auto">
      <div className="max-w-4xl">
        <p className="text-neutral-500 text-sm tracking-widest uppercase mb-6">
          Creative &amp; Design
        </p>
        <h1 className="text-6xl md:text-8xl font-bold text-white leading-none tracking-tight mb-8">
          Claudio
          <br />
          <span className="text-neutral-500">Santos</span>
        </h1>
        <p className="text-neutral-400 text-xl md:text-2xl max-w-xl leading-relaxed mb-12">
          Designer and creative thinker crafting digital experiences that feel
          alive.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="#work"
            className="bg-white text-black px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-neutral-200 transition-colors"
          >
            View work
          </a>
          <a
            href="#about"
            className="text-neutral-400 text-sm hover:text-white transition-colors flex items-center gap-2"
          >
            About me
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      {/* Decorative gradient orb */}
      <div
        className="pointer-events-none fixed top-0 right-0 w-[600px] h-[600px] rounded-full opacity-10"
        style={{
          background:
            "radial-gradient(circle, #6366f1 0%, transparent 70%)",
        }}
      />
    </section>
  );
}
