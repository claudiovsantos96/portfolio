const skills = [
  "Figma",
  "UI Design",
  "UX Research",
  "Prototyping",
  "Design Systems",
  "Motion",
  "Branding",
  "Creative Direction",
];

export default function About() {
  return (
    <section id="about" className="py-32 px-6 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 items-start">
        {/* Text column */}
        <div>
          <p className="text-neutral-500 text-sm tracking-widest uppercase mb-6">
            About
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-8">
            I make ideas
            <br />
            <span className="text-neutral-500">come to life</span>
          </h2>
          <div className="space-y-4 text-neutral-400 text-base leading-relaxed">
            <p>
              Hey, I&apos;m Claudio. A designer based at Pixelmatters with a passion
              for clean interfaces, thoughtful interactions, and designs that
              actually work.
            </p>
            <p>
              I believe great design is invisible — it solves problems before
              the user notices there was one. When I&apos;m not designing, I&apos;m
              exploring new tools and pushing the boundaries of what&apos;s possible.
            </p>
          </div>
        </div>

        {/* Skills column */}
        <div>
          <p className="text-neutral-500 text-sm tracking-widest uppercase mb-6">
            Skills &amp; Tools
          </p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 rounded-full border border-white/10 text-neutral-300 text-sm bg-white/5"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Avatar placeholder */}
          <div className="mt-10 w-full aspect-square max-w-xs rounded-2xl bg-neutral-900 border border-white/10 flex items-center justify-center">
            <span className="text-neutral-600 text-sm">Photo coming soon</span>
          </div>
        </div>
      </div>
    </section>
  );
}
