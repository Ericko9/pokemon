'use client';

import { useState, useEffect } from 'react';
import { PokemonAbility, PokemonListResponse, PokemonAbilityDetail } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function PokemonPage() {
  const [abilities, setAbilities] = useState<PokemonAbility[]>([]);
  const [abilityDetail, setAbilityDetail] = useState<PokemonAbilityDetail | null>(null);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [isLoadingDetail, setIsLoadingDetail] = useState(true);
  const [errorList, setErrorList] = useState<string | null>(null);
  const [errorDetail, setErrorDetail] = useState<string | null>(null);

  useEffect(() => {
    // Fetch Pokemon Abilities List
    const fetchAbilities = async () => {
      try {
        setIsLoadingList(true);
        const response = await fetch('https://pokeapi.co/api/v2/ability?limit=20');
        if (!response.ok) throw new Error('Failed to fetch abilities');
        const data: PokemonListResponse = await response.json();
        setAbilities(data.results);
      } catch (error) {
        setErrorList(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setIsLoadingList(false);
      }
    };

    // Fetch Battle Armor Ability Detail
    const fetchAbilityDetail = async () => {
      try {
        setIsLoadingDetail(true);
        const response = await fetch('https://pokeapi.co/api/v2/ability/battle-armor');
        if (!response.ok) throw new Error('Failed to fetch ability detail');
        const data: PokemonAbilityDetail = await response.json();
        setAbilityDetail(data);
      } catch (error) {
        setErrorDetail(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setIsLoadingDetail(false);
      }
    };

    fetchAbilities();
    fetchAbilityDetail();
  }, []);

  // Extract English effect from ability detail
  const getEnglishEffect = () => {
    if (!abilityDetail) return null;
    const englishEntry = abilityDetail.effect_entries.find(
      (entry) => entry.language.name === 'en'
    );
    return englishEntry?.effect || 'No English effect available';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="mb-4">
              ← Kembali ke Manajemen Produk
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Pokemon API Integration
          </h1>
          <p className="text-gray-600">
            Data diambil dari PokeAPI.co
          </p>
        </div>

        {/* Ability Detail Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Detail Ability: Battle Armor</CardTitle>
            <CardDescription>
              Data detail dari endpoint: https://pokeapi.co/api/v2/ability/battle-armor
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingDetail ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : errorDetail ? (
              <div className="text-red-500">Error: {errorDetail}</div>
            ) : abilityDetail ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Nama Ability:</h3>
                  <Badge variant="default" className="text-base px-4 py-2">
                    {abilityDetail.name.replace('-', ' ').toUpperCase()}
                  </Badge>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Effect:</h3>
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <p className="text-gray-700 leading-relaxed">{getEnglishEffect()}</p>
                  </div>
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>

        {/* Abilities List Section */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Pokemon Abilities</CardTitle>
            <CardDescription>
              Data list dari endpoint: https://pokeapi.co/api/v2/ability
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingList ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : errorList ? (
              <div className="text-red-500">Error: {errorList}</div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">No</TableHead>
                      <TableHead>Nama Ability</TableHead>
                      <TableHead>URL</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {abilities.map((ability, index) => (
                      <TableRow key={ability.name}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell className="font-semibold capitalize">
                          {ability.name.replace('-', ' ')}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground font-mono">
                          {ability.url}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
