type Props = {
  index: string; // "02"
  title: string; // "Video"
};

export default function SectionHeading({ index, title }: Props) {
  return (
    <div className="mb-8 flex items-baseline gap-4 md:mb-12">
      <span className="font-mono text-xs text-lime md:text-sm">{index}</span>
      <h2 className="font-mono text-xs uppercase tracking-widest2 text-muted md:text-sm">
        {title}
      </h2>
      <span className="h-px flex-1 bg-lime/20" />
    </div>
  );
}
