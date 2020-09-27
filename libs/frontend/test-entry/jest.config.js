module.exports = {
  name: 'frontend-test-entry',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/frontend/test-entry',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
