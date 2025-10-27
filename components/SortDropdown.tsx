import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'stock-asc' | 'stock-desc';

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="sort">Urutkan Berdasarkan</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="sort" className="w-full">
          <SelectValue placeholder="Pilih pengurutan" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">Default</SelectItem>
          <SelectItem value="price-asc">Harga (Terendah ke Tertinggi)</SelectItem>
          <SelectItem value="price-desc">Harga (Tertinggi ke Terendah)</SelectItem>
          <SelectItem value="stock-asc">Stok (Terendah ke Tertinggi)</SelectItem>
          <SelectItem value="stock-desc">Stok (Tertinggi ke Terendah)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
