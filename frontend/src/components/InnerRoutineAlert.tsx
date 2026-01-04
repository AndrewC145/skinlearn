function InnerRoutineAlert({ text }: { text: string }) {
  return (
    <div className="mb-2 flex items-center justify-center text-red-700">
      <svg
        className="mr-2 h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h3 className="font-semibold">{text}</h3>
    </div>
  );
}

export default InnerRoutineAlert;
