import { Product } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg font-semibold truncate">{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Harga:</span>
            <span className="text-lg font-bold text-green-600">
              Rp {product.price.toLocaleString('id-ID')}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Stok:</span>
            <Badge variant={product.stock > 10 ? "default" : "destructive"}>
              {product.stock} unit
            </Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button onClick={() => onEdit(product)} variant="outline" className="flex-1">
          Edit
        </Button>
        <Button onClick={() => onDelete(product)} variant="destructive" className="flex-1">
          Hapus
        </Button>
      </CardFooter>
    </Card>
  );
}
