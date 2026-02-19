export default function Footer() {
  return (
    <footer className="px-6 py-10 max-w-6xl mx-auto border-t border-white/5">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-600">
        <p>© {new Date().getFullYear()} Claudio Santos. All rights reserved.</p>
        <p>Built with Next.js &amp; Tailwind CSS</p>
      </div>
    </footer>
  );
}
