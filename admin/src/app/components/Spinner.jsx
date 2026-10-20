export default function Spinner({ size = 6 }) {
  return (
    <div className={`w-${size} h-${size} border-4 border-navy border-t-transparent
      rounded-full animate-spin mx-auto`}
    />
  );
}

export function LoadingPage() {
  return (
    <div className="flex items-center justify-center h-64">
      <Spinner size={8} />
    </div>
  );
}
