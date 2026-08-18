"use client";

type Props = {
  confirmMessage: string;
  className?: string;
  children: React.ReactNode;
};

/** Botón de submit que pide confirmación antes de disparar la acción. */
export default function ConfirmSubmitButton({
  confirmMessage,
  className,
  children,
}: Props) {
  return (
    <button
      type="submit"
      className={className}
      onClick={(e) => {
        if (!window.confirm(confirmMessage)) {
          e.preventDefault();
        }
      }}
    >
      {children}
    </button>
  );
}
