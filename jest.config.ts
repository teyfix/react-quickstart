import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>src/setupTests.ts'],
  testEnvironment: 'node',
  // moduleNameMapper: {
  //   '\\.(jpe?g|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
  //     'EmptyModule',
  //   '\\.(css|less)$': 'EmptyModule',
  // },
};

export default config;
