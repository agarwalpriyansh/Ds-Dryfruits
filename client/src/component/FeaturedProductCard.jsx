import { Package, Calendar } from "lucide-react"
import { Link } from "react-router-dom"
import LazyImage from "./LazyImage"

export default function FeaturedProductCard({ id, image, brand, collection, to = "/themes/gift-boxes" }) {
  const bgImage = "https://res.cloudinary.com/dsbu2gzgi/image/upload/v1765387511/prouctbg_jkhkhw.png";

  return (
    <Link to={to} className="block border-2 border-gray-200 bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      {/* Image with Background */}
      <div 
        className="relative w-full aspect-square bg-muted overflow-hidden flex items-center justify-center p-6"
        style={{
          backgroundImage: `url('${bgImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="relative w-full h-full rounded-full border-4 border-white overflow-hidden shadow-md">
          <LazyImage src={image || "/placeholder.svg"} alt={collection} className="w-full h-full object-cover" skeletonClassName="rounded-full" />
        </div>
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
        <div className="w-full py-2 px-4 border-2 border-foreground text-foreground rounded-full font-medium hover:bg-foreground hover:text-card transition-colors text-center">
          View more
        </div>
      </div>
    </Link>
  )
}
