export default function ReviewCard({ review }) {
  return (
    <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800">
      <div className="flex items-center justify-between">
        <div className="font-semibold">{review.name} • <span className="text-xs text-zinc-500">{review.location}</span></div>
        <div className="text-amber-500">{"★★★★★"}</div>
      </div>
      <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-200">{review.text}</p>
      <div className="mt-3 text-xs text-zinc-500">{review.date}</div>
    </div>
  );
}
