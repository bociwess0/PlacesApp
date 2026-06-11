interface Props {
  message: string;
  error: string;
}

export default function Message({ message, error }: Props) {
  return (
    <div>
      {message && (
        <div
          className="
      rounded-xl
      border border-green-500/20
      bg-green-500/10
      p-4
      text-green-400
      
    "
        >
          {message}
        </div>
      )}

      {error && (
        <div
          className="
      rounded-xl
      border border-red-500/20
      bg-red-500/10
      p-4
      text-red-400
    "
        >
          {error}
        </div>
      )}
    </div>
  );
}
