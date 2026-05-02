'use client';

/* eslint-disable @next/next/no-img-element */
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FaCodeBranch, FaGithub, FaStar, FaUsers } from 'react-icons/fa';
import dynamic from 'next/dynamic';

const ParticleSnow = dynamic(
  () => import('@/assets/animatedComponent/ParticlesSnow'),
  { ssr: false }
);

const GITHUB_USERNAME = 'krutinpolra';

type GitHubUser = {
  followers: number;
  public_repos: number;
  html_url: string;
};

type GitHubRepo = {
  fork: boolean;
  forks_count: number;
  stargazers_count: number;
};

type GitHubStats = {
  followers: number;
  forks: number;
  publicRepos: number;
  stars: number;
  profileUrl: string;
};

const statCards = [
  {
    label: 'Followers',
    key: 'followers',
    icon: FaUsers,
    color: 'text-fuchsia-400',
  },
  {
    label: 'GitHub Stars',
    key: 'stars',
    icon: FaStar,
    color: 'text-yellow-300',
  },
  {
    label: 'Forks',
    key: 'forks',
    icon: FaCodeBranch,
    color: 'text-cyan-300',
  },
  {
    label: 'Public Repos',
    key: 'publicRepos',
    icon: FaGithub,
    color: 'text-indigo-300',
  },
] as const;

export default function GitHubContributions() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function loadGitHubStats() {
      try {
        const [userResponse, repoResponse] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
            signal: controller.signal,
          }),
          fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
            { signal: controller.signal }
          ),
        ]);

        if (!userResponse.ok || !repoResponse.ok) {
          throw new Error('GitHub request failed');
        }

        const user = (await userResponse.json()) as GitHubUser;
        const repos = (await repoResponse.json()) as GitHubRepo[];
        const sourceRepos = repos.filter(repo => !repo.fork);

        setStats({
          followers: user.followers,
          publicRepos: user.public_repos,
          forks: sourceRepos.reduce((total, repo) => total + repo.forks_count, 0),
          stars: sourceRepos.reduce(
            (total, repo) => total + repo.stargazers_count,
            0
          ),
          profileUrl: user.html_url,
        });
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error(error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadGitHubStats();

    return () => controller.abort();
  }, []);

  const contributionImageUrl = useMemo(
    () => `https://ghchart.rshah.org/6366f1/${GITHUB_USERNAME}`,
    []
  );

  return (
    <section className="relative overflow-hidden px-4 py-24 text-white bg-gradient-to-b from-black via-[#0b0b1d] to-black sm:px-6">
      <ParticleSnow id="tsparticles-github-contributions" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.h2
          className="relative mx-auto mb-6 flex w-fit items-center justify-center gap-3 text-center text-4xl font-bold"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: false }}
        >
          <FaGithub className="text-4xl text-indigo-400" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-fuchsia-400">
            Code Contributions
          </span>
          <motion.span
            className="absolute top-full left-0 h-[2px] w-full bg-indigo-500"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            viewport={{ once: false }}
            style={{ originX: 0 }}
          />
        </motion.h2>

        <motion.p
          className="mx-auto mb-12 max-w-3xl text-center text-base leading-relaxed text-gray-300 md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: false }}
        >
          A live snapshot of my GitHub activity, repositories, and open-source
          signals.
        </motion.p>

        <div className="grid min-w-0 gap-6">
          <motion.a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group block min-w-0 rounded-xl border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur-md transition hover:border-indigo-400/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.25)] sm:p-5 md:p-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-full border border-indigo-400/40 bg-[#11111a] text-indigo-300 shadow-[0_0_18px_rgba(99,102,241,0.45)]">
                  <FaGithub className="text-2xl" />
                </span>
                <div className="text-left">
                  <p className="font-bold">@{GITHUB_USERNAME}</p>
                  <p className="text-sm text-gray-300">Contribution Graph</p>
                </div>
              </div>
              <p className="w-fit rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-200">
                Live GitHub
              </p>
            </div>

            <div className="github-graph-scroll w-full max-w-full overflow-x-auto overscroll-x-contain rounded-xl border border-white/10 bg-black/30 p-4">
              <img
                src={contributionImageUrl}
                alt={`${GITHUB_USERNAME} GitHub contribution graph`}
                className="block h-[150px] w-[760px] max-w-none object-fill opacity-95 transition group-hover:opacity-100 sm:h-[170px] sm:w-[860px] lg:h-[190px] lg:w-full"
              />
            </div>
          </motion.a>

          <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {statCards.map(({ label, key, icon: Icon, color }, index) => (
              <motion.div
                key={label}
                className="relative min-w-0 overflow-hidden rounded-xl border border-white/10 bg-white/10 p-5 shadow-md backdrop-blur-md transition hover:shadow-[0_0_24px_rgba(99,102,241,0.22)]"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-300">
                      {label}
                    </p>
                    <p className={`mt-2 text-3xl font-extrabold ${color}`}>
                      {isLoading ? '--' : stats?.[key] ?? 0}
                    </p>
                  </div>
                  <Icon className={`text-3xl ${color}`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .github-graph-scroll {
          scrollbar-color: rgba(129, 140, 248, 0.9) rgba(255, 255, 255, 0.08);
          scrollbar-width: thin;
        }

        .github-graph-scroll::-webkit-scrollbar {
          height: 8px;
        }

        .github-graph-scroll::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 999px;
        }

        .github-graph-scroll::-webkit-scrollbar-thumb {
          background: rgba(129, 140, 248, 0.9);
          border-radius: 999px;
        }
      `}</style>
    </section>
  );
}
