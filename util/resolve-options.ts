import { readdirSync, readFileSync } from 'fs';
import { dirname, join, parse } from 'path';
import { RuleSetUse, RuleSetUseItem } from 'webpack';

interface RuleSetUseData {
  resource: string;
  realResource: string;
  resourceQuery: string;
  issuer: string;
  compiler: string;
}

interface SourceDescriptor {
  ext: string | string[];
  parser: Function | Function[];
}

const resolveSource = (filepath: string, descriptors: SourceDescriptor[]) => {
  const dir = dirname(filepath);
  const file = parse(filepath).name.toLowerCase();
  const siblings = readdirSync(dir, { encoding: 'utf-8' });

  if (siblings.length < 2) {
    return;
  }

  const lower = siblings.map((sibling) => sibling.toLowerCase());

  for (const desc of descriptors) {
    if ('string' === typeof desc.ext) {
      desc.ext = [desc.ext];
    }

    for (const ext of desc.ext) {
      const index = lower.indexOf(file + '.' + ext);

      if (index > -1) {
        const path = join(dir, siblings[index]);
        const source = readFileSync(path, { encoding: 'utf-8', flag: 'r' });

        if ('function' === typeof desc.parser) {
          desc.parser = [desc.parser];
        }

        return desc.parser.reduce((prev, cur) => cur(prev), source);
      }
    }
  }

  return {};
};

const resolveOptions = (
  loader: string,
  ...descriptors: SourceDescriptor[]
): RuleSetUse => {
  return ({ resource }: RuleSetUseData): RuleSetUseItem[] => {
    return [
      {
        loader,
        options: resolveSource(resource, descriptors),
      },
    ];
  };
};

export default resolveOptions;
