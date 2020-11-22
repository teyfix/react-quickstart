import resolveColor from 'helper/resolveColor';

interface BasicProps {
  margin?: string | number;
  marginLeft?: string | number;
  marginRight?: string | number;
  marginTop?: string | number;
  marginBottom?: string | number;
  padding?: string | number;
  paddingLeft?: string | number;
  paddingRight?: string | number;
  paddingTop?: string | number;
  paddingBottom?: string | number;
  color?: ColorDef;
  bgColor?: ColorDef;
}

const resolveNumeric = (
  value: number | string,
  fn: (result: string) => string,
): string => {
  if (null == value) {
    return '';
  }

  if ('number' === typeof value) {
    if (Number.isFinite(value)) {
      value = value.toString();
    } else {
      throw new Error('Invalid numeric value given: ' + value);
    }
  }

  if ('string' === typeof value) {
    if (
      /^\d+(\.\d+)?(cm|mm|in|px|pt|pc|em|ex|ch|rem|vw|vh|vmin|vmax|%)$/.test(
        value,
      )
    ) {
      return fn(value);
    }

    if (/^\d+(\.\d+)?$/.test(value)) {
      return fn(value + 'px');
    }
  }

  throw new SyntaxError('Could not parse numeric value: ' + value);
};

const colorResolver = (style: string) => {
  return (props: BasicProps, prop: ColorDef) => {
    return resolveColor(
      props as Theme,
      prop,
      (result) => style + ':' + result + ';',
    );
  };
};

const numberResolver = (style: string) => {
  return (prop: number | string) => {
    return resolveNumeric(prop, (result) => style + ':' + result + ';');
  };
};

const resolvers: any = {
  color: colorResolver('color'),
  bgColor: colorResolver('background-color'),
  padding: numberResolver('padding'),
  paddingLeft: numberResolver('padding-left'),
  paddingRight: numberResolver('padding-right'),
  paddingTop: numberResolver('padding-top'),
  paddingBottom: numberResolver('padding-bottom'),
  margin: numberResolver('margin'),
  marginLeft: numberResolver('margin-left'),
  marginRight: numberResolver('margin-right'),
  marginTop: numberResolver('margin-top'),
  marginBottom: numberResolver('margin-bottom'),
};

const basicStyles = (props: BasicProps) => {
  let style = '';

  for (const propName in props) {
    if (!props.hasOwnProperty(propName) || !(propName in resolvers)) {
      continue;
    }

    const resolver = resolvers[propName];
    const propValue = (props as any)[propName];
    const result =
      resolver.length === 1 ? resolver(propValue) : resolver(props, propValue);

    if (null == result || '' === result) {
      continue;
    }

    style += result;
  }

  return style;
};

export type { BasicProps };
export default basicStyles;
