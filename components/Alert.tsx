import React from 'react';

type AlertProps = {
  type: 'success' | 'error' | 'info';
  message: string;
  onClose?: () => void;
};

export default function Alert({ type, message, onClose }: AlertProps) {
  const colorMap = {
    success: 'bg-green-100 text-green-800 border-green-300',
    error: 'bg-red-100 text-red-800 border-red-300',
    info: 'bg-blue-100 text-blue-800 border-blue-300',
  } as const;

  return (
    <div className={`border rounded-md px-4 py-3 shadow-soft ${colorMap[type]}`} role="alert">
      <div className="flex items-start justify-between gap-4">
        <p className="text-sm">{message}</p>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-brown/70 hover:text-brown"
            aria-label="Close alert"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}




