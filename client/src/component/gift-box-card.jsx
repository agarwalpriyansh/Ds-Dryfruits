import { Package, Calendar } from "lucide-react"

export default function GiftBoxCard({ id, image, brand, collection }) {
  return (
    <div className="border-2 border-gray-200 bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="relative w-full aspect-square bg-muted overflow-hidden">
        <img src={image || "/placeholder.svg"} alt={collection} className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-4">
        {/* Brand and Collection */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2 text-foreground">
            <Package className="w-4 h-4" />
            <span>{brand}</span>
          </div>
          <div className="flex items-center gap-2 text-foreground">
            <Calendar className="w-4 h-4" />
            <span>{collection}</span>
          </div>
        </div>

        {/* View More Button */}
        <button className="w-full py-2 px-4 border-2 border-foreground text-foreground rounded-full font-medium hover:bg-foreground hover:text-card transition-colors">
          View more
        </button>
      </div>
    </div>
  )
}
