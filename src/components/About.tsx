import SectionHeading from "./SectionHeading";

export default function About() {
  return (
    <section id="about" className="py-24 border-t border-border">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeading index="about-me" title="A bit about me" />

        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-5 text-muted leading-relaxed">
            <p>
  Hi, I&apos;m <strong>Ashadul Islam</strong>, though most people know me as <strong>Rafi</strong>. I&apos;m a full-stack web developer with a strong passion for building modern, scalable, and user-focused web applications. What started as curiosity about how the internet works quickly turned into a commitment to learning, building, and continuously improving my skills.
</p>

<p>
  I specialize in developing responsive, high-performance applications using modern JavaScript technologies. On the backend, I enjoy designing RESTful APIs, structuring databases with PostgreSQL and MongoDB, implementing secure authentication and role-based access control, and writing clean, maintainable code with proper validation and error handling. On the frontend, I focus on creating intuitive, responsive interfaces that deliver a smooth user experience.
</p>

<p>
  I believe great software is more than just code—it should be reliable, scalable, and easy to maintain. Every project I build is an opportunity to write better code, solve real-world problems, and create solutions that provide genuine value. I&apos;m always exploring new technologies and best practices to improve both my technical expertise and the quality of my work.
</p>

<p>
  Beyond programming, I enjoy learning new technologies, tackling challenging problems, and continuously expanding my knowledge. Whether I&apos;m reading documentation, experimenting with new tools, or building personal projects, I&apos;m driven by curiosity and a desire to become a better developer every day.
</p>

<p>
  I&apos;m currently seeking opportunities to collaborate with individuals, startups, and businesses looking for a developer who is committed to writing clean code, communicating effectively, and delivering dependable solutions. Let&apos;s build something meaningful together.
</p>

          </div>

          <div className="space-y-4">
            {[
              ["Based in", "Chattogram, Bangladesh"],
              ["Studying at", "IIUC"],
              ["Focus", "Backend / REST APIs"],
              ["Currently learning", "Prisma"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="rounded-lg border border-border bg-surface px-4 py-3"
              >
                <p className="font-mono text-xs text-accent2">{k}</p>
                <p className="text-sm mt-1">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
