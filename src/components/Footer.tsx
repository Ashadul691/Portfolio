export default function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted">
        <p className="font-mono">© {new Date().getFullYear()} Ashadul Islam</p>
        
        {/* <p className="font-mono text-xs">Built with Next.js, TypeScript & MongoDB</p> */}
      </div>
    </footer>
  );
}
