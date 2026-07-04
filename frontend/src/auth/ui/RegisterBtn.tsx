interface Props {
  isLoading: boolean;
}

export default function RegisterBtn({ isLoading }: Props) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="
    flex
    w-full
    items-center
    justify-center

    rounded-xl
    bg-blue-600

    py-4

    font-semibold
    text-white

    transition

    bg-blue-600

    disabled:cursor-not-allowed
    disabled:opacity-60
  "
    >
      {isLoading ? (
        <div
          className="
        h-5
        w-5
        animate-spin

        rounded-full
        border-2
        border-white
        border-t-transparent
      "
        />
      ) : (
        "Create Account"
      )}
    </button>
  );
}
