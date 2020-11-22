const resolveColor = (
  theme: Theme,
  color: ColorDef,
  fn: (color: string) => string,
): string => {
  if (null == color) {
    return '';
  }

  if ('string' === typeof color) {
    return resolveColor(theme, [color, 'dark'], fn);
  }

  const {
    theme: { colors },
  } = theme;

  if (color[0] in colors) {
    if (color[1] in colors[color[0]]) {
      return fn(colors[color[0]][color[1]]);
    }

    throw new Error('Unknown color shade ' + color[1]);
  }

  throw new Error('Unknown color ' + color[0]);
};

export default resolveColor;
