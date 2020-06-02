module.exports = {
  name: 'sample-platform',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/sample-platform',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
