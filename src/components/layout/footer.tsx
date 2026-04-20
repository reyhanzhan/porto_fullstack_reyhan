import Link from "next/link";
import { Terminal, Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200/80 bg-zinc-50 dark:border-zinc-800/50 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-950 dark:bg-zinc-50">
                <Terminal className="h-4 w-4 text-white dark:text-zinc-950" />
              </div>
              <span className="text-zinc-950 dark:text-zinc-50">reyhan.dev</span>
            </Link>
            <p className="mt-3 max-w-md text-sm text-zinc-500 dark:text-zinc-400">
              Building AI-powered business systems for B2B companies.
              Full Stack Engineer specializing in enterprise solutions
              that drive measurable business outcomes.
            </p>
            {/* Social icons */}
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://github.com/reyhanzhan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 transition-all hover:bg-zinc-950 hover:text-white dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-50 dark:hover:text-zinc-950"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://id.linkedin.com/in/reyhan-rizqi-754aa0278"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 transition-all hover:bg-[#0A66C2] hover:text-white dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-[#0A66C2] dark:hover:text-white"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="mailto:reyhanrizqi01@gmail.com"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 transition-all hover:bg-red-500 hover:text-white dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-red-500 dark:hover:text-white"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Navigation
            </h3>
            <ul className="mt-3 space-y-2">
              {[
                { name: "Projects", href: "/projects" },
                { name: "Live Demos", href: "/demos" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Connect
            </h3>
            <ul className="mt-3 space-y-2">
              {[
                { name: "GitHub", href: "https://github.com/reyhanzhan", icon: Github },
                { name: "LinkedIn", href: "https://id.linkedin.com/in/reyhan-rizqi-754aa0278", icon: Linkedin },
                { name: "Email", href: "mailto:reyhanrizqi01@gmail.com", icon: Mail },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("mailto") ? undefined : "_blank"}
                    rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                    className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
                  >
                    <link.icon className="h-3.5 w-3.5" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-zinc-200/80 pt-8 dark:border-zinc-800/50">
          <p className="text-center text-xs text-zinc-400 dark:text-zinc-500">
            &copy; {new Date().getFullYear()} reyhan.dev. Engineered with Next.js, MySQL, and TypeScript.
          </p>
        </div>
      </div>
    </footer>
  );
}
