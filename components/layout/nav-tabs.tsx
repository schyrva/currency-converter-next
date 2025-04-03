import Link from 'next/link';

interface NavTab {
  href: string;
  label: string;
  isActive: boolean;
}

interface NavTabsProps {
  tabs: NavTab[];
}

export function NavTabs({ tabs }: NavTabsProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={`px-4 py-2 rounded-md font-medium ${
            tab.isActive
              ? 'bg-slate-800 text-white'
              : 'bg-white text-slate-800 border border-slate-300 hover:bg-slate-50'
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
