import { Business } from "@/types/business";

type Props = {
  business: Business;
};

export function BusinessCard({ business }: Props) {
  return (
    <article className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            {business.category}
          </span>

          <h3 className="mt-3 text-lg font-semibold text-zinc-900">
            {business.name}
          </h3>

          {business.description ? (
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              {business.description}
            </p>
          ) : null}
        </div>

        {business.distance !== undefined ? (
          <div className="shrink-0 rounded-xl bg-zinc-100 px-3 py-2 text-sm font-medium text-zinc-700">
            {business.distance < 1
              ? `${Math.round(business.distance * 1000)} m`
              : `${business.distance.toFixed(1)} km`}
          </div>
        ) : null}
      </div>

      <div className="mt-4 space-y-1 text-sm text-zinc-600">
        {business.address ? <p>📍 {business.address}</p> : null}
        <p>📞 {business.phone}</p>
      </div>
    </article>
  );
}