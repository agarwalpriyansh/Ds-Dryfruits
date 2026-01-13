import { Package, Calendar } from "lucide-react"
import { Link } from "react-router-dom"

export default function GiftBoxCard({ id, image, brand, collection, to = "/themes/gift-boxes" }) {
  return (
    <Link to={to} className="block border-2 border-gray-200 bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      {/* Image */}
      <div className="relative w-[80%] mx-auto mt-4 aspect-square bg-muted overflow-hidden rounded-xl">
        <img src={image || "/placeholder.svg"} alt={collection} className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col gap-2">
        {/* Brand and Collection */}
        <div className="flex items-center gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-1.5 text-foreground">
            <Package className="w-3.5 h-3.5" />
            <span>{brand}</span>
          </div>
          <div className="flex items-center gap-1.5 text-foreground">
            <Calendar className="w-3.5 h-3.5" />
            <span>{collection}</span>
          </div>
        </div>

        {/* View More Button */}
        <div className="w-full py-1.5 px-3 border-2 border-foreground text-foreground rounded-full text-sm font-medium hover:bg-foreground hover:text-card transition-colors text-center">
          View more
        </div>
      </div>
    </Link>
  )
}
