import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { formatPrice, type MenuItem } from "@/lib/menu";

export function ProductTile({ item, priority = false }: { item: MenuItem; priority?: boolean }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-cup bg-surface shadow-lift">
      <div className="relative aspect-[4/5]">
        <Image
          src={item.image}
          alt={`${item.name}`}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col items-start gap-2 p-6">
        {item.badge && <Badge>{item.badge}</Badge>}
        <h3 className="font-display text-h3 font-medium tracking-[-0.01em]">{item.name}</h3>
        <p className="text-muted">{item.description}</p>
        <p className="mt-auto pt-2 font-display text-lead font-medium tabular-nums">
          {formatPrice(item.price)}
        </p>
      </div>
    </article>
  );
}
