'use client';

export function ConfirmButton({
  label,
  confirmMessage,
  onConfirm,
}: {
  label: string;
  confirmMessage: string;
  onConfirm?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        if (window.confirm(confirmMessage)) {
          onConfirm?.();
        }
      }}
    >
      {label}
    </button>
  );
}
