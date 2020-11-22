type ColorName =
  | 'blueJeans'
  | 'aqua'
  | 'mint'
  | 'grass'
  | 'sunflower'
  | 'bittersweet'
  | 'grapefruit'
  | 'lavender'
  | 'pinkRose'
  | 'lightGray'
  | 'mediumGray'
  | 'darkGray';

type ColorDef = ColorName | [ColorName, keyof Color];

interface Color {
  light: string;
  dark: string;
}

interface Theme {
  theme: {
    colors: Record<ColorName, Color>;
  };
}
