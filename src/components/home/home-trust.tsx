import { QrCode, ShieldCheck, Undo2 } from "lucide-react";

const items = [
  { icon: ShieldCheck, label: "Boletos oficiales del club" },
  { icon: QrCode, label: "Acceso digital con QR" },
  { icon: Undo2, label: "Soporte antes del evento" },
];

export function HomeTrust() {
  return (
    <div className="trust-strip">
      {items.map(({ icon: Icon, label }) => (
        <div key={label} className="trust-item">
          <span className="trust-item__icon">
            <Icon className="size-4" />
          </span>
          <span className="trust-item__label">{label}</span>
        </div>
      ))}
    </div>
  );
}
