import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ButtonWithIconDemo = () => {
  return (
    <Button
      asChild
      className="group relative h-12 w-fit cursor-pointer overflow-hidden rounded-full border border-[var(--line)] bg-transparent p-1 ps-6 pe-14 text-sm font-medium text-[var(--text)] transition-all duration-500 hover:ps-14 hover:pe-6 hover:border-[var(--cyan)] hover:bg-transparent hover:text-[var(--text)]"
    >
      <a href="#contact">
        <span className="relative z-10 transition-all duration-500">Let's Collaborate</span>
        <span className="absolute right-1 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--cyan)] text-[var(--ink)] transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
          <ArrowUpRight size={16} aria-hidden="true" />
        </span>
      </a>
    </Button>
  );
};

export default ButtonWithIconDemo;