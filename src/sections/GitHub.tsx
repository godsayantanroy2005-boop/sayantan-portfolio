import { useEffect, useState } from "react";
import { Star, GitFork, ExternalLink } from "lucide-react";
import { GithubIcon } from "../components/ui/Icons";
import { ScrollReveal } from "../components/animations/ScrollReveal";
import { SectionLabel } from "../components/ui/SectionLabel";
import { GlassCard } from "../components/ui/GlassCard";
import { config } from "../data/config";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  html_url: string;
}

interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
}

const LANG_COLORS: Record<string, string> = {
  Python: "#3572A5",
  JavaScript: "#f1e05a",
  TypeScript: "#2b7489",
  "C++": "#f34b7d",
  Java: "#b07219",
  HTML: "#e34c26",
  CSS: "#563d7c",
};

export function GitHubSection() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const username = config.githubUsername;
  const isPlaceholder = !username;

  useEffect(() => {
    if (isPlaceholder) { setLoading(false); return; }

    const controller = new AbortController();
    Promise.all([
      fetch(`https://api.github.com/users/${username}`, { signal: controller.signal }),
      fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`, { signal: controller.signal }),
    ])
      .then(async ([userRes, reposRes]) => {
        if (!userRes.ok || !reposRes.ok) throw new Error("API error");
        const [userData, reposData] = await Promise.all([userRes.json(), reposRes.json()]);
        setUser(userData as GitHubUser);
        setRepos(reposData as Repo[]);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [username, isPlaceholder]);

  return (
    <section id="github" className="py-24 md:py-32 px-6 relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 50% 40% at 20% 50%, rgba(99,102,241,0.04) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-5xl mx-auto">
        <ScrollReveal>
          <SectionLabel>Open Source</SectionLabel>
        </ScrollReveal>
        <ScrollReveal delay={0.1} className="mt-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            On GitHub.
          </h2>
          <a
            href={config.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-indigo-300 transition-colors font-mono"
          >
            <GithubIcon size={16} aria-hidden="true" />
            @{username}
            <ExternalLink size={13} aria-hidden="true" />
          </a>
        </ScrollReveal>

        {loading && (
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-32 rounded-2xl animate-pulse"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
              />
            ))}
          </div>
        )}

        {!loading && (isPlaceholder || error || !user) && (
          <ScrollReveal delay={0.15} className="mt-10">
            <GlassCard className="p-8 text-center">
              <GithubIcon size={32} className="mx-auto text-gray-600 mb-3" />
              <p className="text-gray-500 font-mono text-sm">
                {error
                  ? "Could not load GitHub data. Check your username in config.ts."
                  : "Update githubUsername in src/data/config.ts to display your repositories here."}
              </p>
              <a
                href={config.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-4 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                View GitHub Profile
                <ExternalLink size={13} aria-hidden="true" />
              </a>
            </GlassCard>
          </ScrollReveal>
        )}

        {!loading && user && (
          <>
            <ScrollReveal delay={0.1} className="mt-8">
              <div className="flex flex-wrap gap-4">
                {([
                  { label: "Public Repos", value: user.public_repos },
                  { label: "Followers", value: user.followers },
                  { label: "Following", value: user.following },
                ] as const).map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col px-5 py-3 rounded-xl"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <span className="text-2xl font-bold text-white">{stat.value}</span>
                    <span className="text-xs text-gray-500 font-mono">{stat.label}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {repos.map((repo, i) => (
                <ScrollReveal key={repo.id} delay={0.1 + i * 0.05}>
                  <GlassCard hover glow className="p-5 h-full flex flex-col justify-between gap-4">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-semibold text-white truncate">{repo.name}</h3>
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open ${repo.name} on GitHub`}
                          className="shrink-0 text-gray-600 hover:text-indigo-400 transition-colors"
                        >
                          <ExternalLink size={14} aria-hidden="true" />
                        </a>
                      </div>
                      <p className="text-xs text-gray-500 mt-1.5 line-clamp-2 leading-relaxed">
                        {repo.description || "No description."}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      {repo.language && (
                        <span className="flex items-center gap-1.5">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ background: LANG_COLORS[repo.language] || "#6b7280" }}
                            aria-hidden="true"
                          />
                          {repo.language}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Star size={12} aria-hidden="true" />
                        {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork size={12} aria-hidden="true" />
                        {repo.forks_count}
                      </span>
                    </div>
                  </GlassCard>
                </ScrollReveal>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
