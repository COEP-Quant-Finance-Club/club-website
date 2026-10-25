interface PageIntroProps {
  eyebrow: string;
  title: string;
  description: string;
}

export default function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <header className="mx-auto max-w-[1360px] px-6 pb-16 pt-16 sm:pb-20 sm:pt-20 lg:px-12 lg:pb-28 lg:pt-28">
      <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12 lg:gap-12">
        <h1 className="max-w-[10ch] text-[clamp(3.25rem,8vw,7rem)] font-light leading-[0.94] tracking-[-0.045em] text-foreground lg:col-span-8">
          {title}
        </h1>
        <div className="flex flex-col gap-4 lg:col-span-4 lg:pb-2">
          <p className="max-w-[34rem] text-base leading-relaxed text-muted-foreground sm:text-lg">
            {description}
          </p>
          <p className="text-sm text-muted-foreground">{eyebrow}</p>
        </div>
      </div>
    </header>
  );
}
