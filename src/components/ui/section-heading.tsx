type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  id?: string;
};

export function SectionHeading({ eyebrow, title, description, id }: Props) {
  return (
    <div className="flex max-w-[680px] flex-col gap-3">
      <span className="text-[13px] font-medium uppercase tracking-[0.12em] text-muted">{eyebrow}</span>
      <h2
        id={id}
        className="font-display text-3xl font-semibold leading-[1.1] tracking-[-0.01em] text-balance sm:text-[40px]"
      >
        {title}
      </h2>
      {description ? <p className="text-[17px] text-muted">{description}</p> : null}
    </div>
  );
}
