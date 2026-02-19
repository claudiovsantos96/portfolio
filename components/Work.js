const projects = [
  {
    id: 1,
    title: "Brand Identity",
    category: "Branding",
    year: "2024",
    color: "from-violet-900/40 to-neutral-900",
  },
  {
    id: 2,
    title: "Mobile App UI",
    category: "UI Design",
    year: "2024",
    color: "from-sky-900/40 to-neutral-900",
  },
  {
    id: 3,
    title: "Design System",
    category: "Systems",
    year: "2024",
    color: "from-emerald-900/40 to-neutral-900",
  },
  {
    id: 4,
    title: "Web Experience",
    category: "Web Design",
    year: "2024",
    color: "from-rose-900/40 to-neutral-900",
  },
];

export default function Work() {
  return (
    <section id="work" className="py-32 px-6 max-w-6xl mx-auto">
      <div className="flex items-end justify-between mb-14">
        <div>
          <p className="text-neutral-500 text-sm tracking-widest uppercase mb-4">
            Work
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Selected
            <br />
            <span className="text-neutral-500">projects</span>
          </h2>
        </div>
        <p className="text-neutral-500 text-sm hidden md:block">
          {projects.length} projects
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group relative rounded-2xl border border-white/10 overflow-hidden cursor-pointer hover:border-white/20 transition-all duration-300"
          >
            {/* Gradient background */}
            <div
              className={`aspect-[4/3] bg-gradient-to-br ${project.color} flex items-center justify-center`}
            >
              <span className="text-neutral-600 text-sm">
                Project preview
              </span>
            </div>

            {/* Card info */}
            <div className="p-6 bg-neutral-950">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold text-lg">
                    {project.title}
                  </h3>
                  <p className="text-neutral-500 text-sm mt-1">
                    {project.category}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-neutral-600 text-sm">{project.year}</span>
                  <span className="text-neutral-600 group-hover:text-white transition-colors text-lg">
                    ↗
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
