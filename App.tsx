import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PokedexScreen } from './src/screens/PokedexScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <PokedexScreen />
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}