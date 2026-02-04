const LINKS = [
  { label: "Open Source Initiative", href: "https://opensource.org/licenses" },
  { label: "SPDX License List", href: "https://spdx.org/licenses/" },
  { label: "choosealicense.com", href: "https://choosealicense.com/" },
  { label: "tl;drLegal", href: "https://tldrlegal.com/" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-elevated">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-lg font-bold text-text">
              licenses<span className="text-accent">.wtf</span>
            </p>
            <p className="mt-2 text-sm text-text-muted">
              Open source licenses, actually explained. This site is for educational
              purposes only and is not legal advice. When in doubt, consult a lawyer.
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-text-faint">
              Resources
            </p>
            <ul className="mt-3 list-none space-y-2 p-0 m-0">
              {LINKS.map((link) => (
                <li key={link.href} className="m-0 p-0">
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-text-muted no-underline hover:text-accent transition-colors"
                  >
                    {link.label}
                    <span className="ml-1 inline-block text-text-faint" aria-hidden="true">
                      {"\u2197"}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-center text-xs text-text-faint">
            This site is itself open source. License information sourced from
            official license texts and the OSI.
          </p>
        </div>
      </div>
    </footer>
  );
}
