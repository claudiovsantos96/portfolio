export default function Contact() {
  return (
    <section id="contact" className="py-32 px-6 max-w-6xl mx-auto">
      <div className="rounded-3xl border border-white/10 bg-neutral-950 p-12 md:p-20 text-center relative overflow-hidden">
        {/* Background glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at center, #6366f1 0%, transparent 65%)",
          }}
        />

        <p className="text-neutral-500 text-sm tracking-widest uppercase mb-6 relative">
          Contact
        </p>
        <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6 relative">
          Let&apos;s work
          <br />
          together
        </h2>
        <p className="text-neutral-400 text-lg max-w-md mx-auto mb-10 relative">
          Got a project in mind? I&apos;d love to hear about it. Drop me a message
          and let&apos;s make something great.
        </p>

        <a
          href="mailto:claudiosantos@wearepixelmatters.com"
          className="relative inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full text-sm font-semibold hover:bg-neutral-200 transition-colors"
        >
          Say hello
          <span aria-hidden="true">→</span>
        </a>

        {/* Social links */}
        <div className="flex items-center justify-center gap-6 mt-10 relative">
          <a
            href="https://github.com/claudiovsantos96"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-500 text-sm hover:text-white transition-colors"
          >
            GitHub
          </a>
          <span className="text-neutral-700">·</span>
          <a
            href="#"
            className="text-neutral-500 text-sm hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <span className="text-neutral-700">·</span>
          <a
            href="#"
            className="text-neutral-500 text-sm hover:text-white transition-colors"
          >
            Dribbble
          </a>
        </div>
      </div>
    </section>
  );
}
