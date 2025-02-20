// src/components/ErrorMessage.tsx
export default function ErrorMessage({ message }: { message: string }) {
    return (
      <div className="text-red-500 text-center p-4 bg-red-500/10 rounded-lg">
        {message}
      </div>
    );
  }