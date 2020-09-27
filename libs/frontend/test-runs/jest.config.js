module.exports = {
  name: 'frontend-test-runs',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/frontend/test-runs',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
