import Link from "next/link";
import type { Project } from "@/content/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group flex h-full flex-col gap-3 rounded-2xl border border-line bg-surface p-7 transition-colors hover:border-line-strong"
    >
      <div className="flex flex-wrap gap-2 text-xs text-ink-2">
        <span className="rounded-full border border-line-strong px-2.5 py-0.5">{project.segment}</span>
        <span className="rounded-full border border-line-strong px-2.5 py-0.5">{project.kind}</span>
      </div>
      <h3 className="text-[19px] font-semibold">{project.title}</h3>
      <p className="text-sm text-muted">{project.client}</p>
      <p className="flex-1 text-[15px] text-muted">{project.summary}</p>
      <span className="font-medium text-accent group-hover:underline">Ver o case →</span>
    </Link>
  );
}
