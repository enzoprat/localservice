import { IconCheck, IconGoogleG } from "@/components/icons";

// Le badge "Garanti par Google" — le vrai label du programme Local Services.
// Reflet lumineux qui balaie régulièrement pour attirer l'œil sans clignoter.
export function GoogleGuaranteedBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`gg-badge inline-flex items-center gap-2.5 rounded-full border border-gg/25 bg-white py-2 pl-3 pr-3.5 text-sm text-navy shadow-sm ${className}`}
    >
      <IconGoogleG width={18} height={18} />
      <span className="font-medium">
        Garanti par <span className="font-semibold">Google</span>
      </span>
      <span className="relative grid size-4 place-items-center rounded-full bg-gg text-white">
        <span className="chip-ring absolute inset-0 rounded-full text-gg" />
        <IconCheck width={10} height={10} />
      </span>
    </span>
  );
}
