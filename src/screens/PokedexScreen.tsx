import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PokemonCard } from '../components/PokemonCard';
import { usePokemonList } from '../hooks/usePokemonList';

export function PokedexScreen() {
  const { pokemons, loading, error, hasMore, loadMore } = usePokemonList();

  if (pokemons.length === 0 && loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text style={styles.message}>Carregando...</Text>
      </SafeAreaView>
    );
  }

  if (pokemons.length === 0 && error) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.message}>{error}</Text>
        <Button title="Tentar novamente" onPress={loadMore} />
      </SafeAreaView>
    );
  }

  function renderFooter() {
    if (loading) {
      return <ActivityIndicator style={styles.footer} />;
    }

    if (error) {
      return (
        <View style={styles.footer}>
          <Text style={styles.message}>{error}</Text>
          <Button title="Tentar novamente" onPress={loadMore} />
        </View>
      );
    }

    if (!hasMore) {
      return <Text style={[styles.footer, styles.message]}>Fim da Pokédex</Text>;
    }

    return null;
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Text style={styles.title}>Pokédex</Text>

      <FlatList
        data={pokemons}
        keyExtractor={(pokemon) => String(pokemon.id)}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  list: {
    paddingHorizontal: 12,
    paddingBottom: 24,
    gap: 12,
  },
  row: {
    gap: 12,
  },
  footer: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  message: {
    textAlign: 'center',
    color: '#666666',
  },
});