import { useAudioPlayer } from 'expo-audio';
import { useCallback, useRef } from 'react';

export function usePokemonCry() {
  const player = useAudioPlayer();
  const currentUrlRef = useRef<string | null>(null);

  const playCry = useCallback(
    async (url: string) => {
      if (currentUrlRef.current === url) {
        await player.seekTo(0);
      } else {
        player.replace({ uri: url });
        currentUrlRef.current = url;
      }

      player.play();
    },
    [player]
  );

  return { playCry };
}