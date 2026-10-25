type Props = {
  ariaLabel: string;
  children: React.ReactNode;
};

export default function Section({ ariaLabel, children }: Props) {
  return (
    <section
      aria-label={ariaLabel}
      className={"flex flex-col justify-center p-6 items-center relative"}
    >
      <div className="container mx-auto">{children}</div>
    </section>
  );
}
