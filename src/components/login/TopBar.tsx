export default function TopBar() {
  return (
    <div className="flex items-center px-3 py-2">
      <button
        type="button"
        aria-label="뒤로가기"
        className="flex h-8 w-8 items-center justify-center rounded-full text-gray-600"
      >
        <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
          <path d="M12.5 4.5L6.5 10l6 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
