import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  collectCoverage: true,
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json',
    },
  },
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 50,
      functions: 50,
      lines: 50,
    },
  },
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '\\.(png|jpg|jpeg|gif)$': 'jest-transform-stub',
    '\\.svg$': '<rootDir>/__mocks__/FileMock.tsx',
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};

export default config;
