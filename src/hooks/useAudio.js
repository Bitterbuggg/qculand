import { Howl } from "howler";

export const useAudio = () => {
  const bgm = new Howl({ src: ["/audio/gamebg.ogg"], loop: true, volume: 0.5 });
  const click = new Howl({ src: ["/audio/click_001.ogg"], volume: 0.8 });

  return {
    playBgm: () => bgm.play(),
    stopBgm: () => bgm.stop(),
    playClick: () => click.play(),
  };
};
