/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: 'no-core-to-infra',
      comment: 'core/ tidak boleh import infrastructure/',
      severity: 'error',
      from: { path: '^src/core' },
      to: { path: '^src/infrastructure' },
    },
    {
      name: 'no-core-to-modules',
      comment: 'core/ tidak boleh import modules/',
      severity: 'error',
      from: { path: '^src/core' },
      to: { path: '^src/modules' },
    },
    {
      name: 'no-infra-to-modules',
      comment: 'infrastructure/ tidak boleh import modules/',
      severity: 'error',
      from: { path: '^src/infrastructure' },
      to: { path: '^src/modules' },
    },
    {
      name: 'no-shared-to-internal',
      comment: 'shared/ tidak boleh import core/modules/infrastructure',
      severity: 'error',
      from: { path: '^src/shared' },
      to: { path: '^src/(core|modules|infrastructure|guards|interceptors|middleware)' },
    },
    {
      name: 'no-circular',
      severity: 'error',
      from: {},
      to: { circular: true },
    },
  ],
  options: {
    doNotFollow: { path: 'node_modules' },
    tsConfig: { fileName: 'tsconfig.json' },
  },
};
