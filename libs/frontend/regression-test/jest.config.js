module.exports = {
  name: 'frontend-regression-test',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/frontend/regression-test',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
