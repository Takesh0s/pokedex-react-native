import { memo } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { DEFAULT_TYPE_COLOR, TYPE_COLORS } from '../theme/typeColors';
import { Pokemon } from '../types/pokemon';

type Props = {
  pokemon: Pokemon;
};

function formatNumber(id: number): string {
  return `#${String(id).padStart(3, '0')}`;
}

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function PokemonCardComponent({ pokemon }: Props) {
  return (
    <View style={styles.card}>
      {pokemon.imageUrl ? (
        <Image
          source={{ uri: pokemon.imageUrl }}
          style={styles.image}
          resizeMode="contain"
        />
      ) : (
        <View style={[styles.image, styles.imagePlaceholder]}>
          <Text style={styles.placeholderText}>?</Text>
        </View>
      )}

      <Text style={styles.number}>{formatNumber(pokemon.id)}</Text>
      <Text style={styles.name} numberOfLines={1}>
        {capitalize(pokemon.name)}
      </Text>

      <View style={styles.types}>
        {pokemon.types.map((type) => (
          <View
            key={type}
            style={[
              styles.typeBadge,
              { backgroundColor: TYPE_COLORS[type] ?? DEFAULT_TYPE_COLOR },
            ]}
          >
            <Text style={styles.typeText}>{capitalize(type)}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export const PokemonCard = memo(PokemonCardComponent);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 16,
    backgroundColor: '#F2F2F2',
  },
  image: {
    width: 96,
    height: 96,
  },
  imagePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 32,
    color: '#BBBBBB',
  },
  number: {
    marginTop: 6,
    fontSize: 12,
    color: '#888888',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222222',
  },
  types: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 6,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  typeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});