module.exports = {
  branches: [
    "release",
    { name: "preview", channel: "alpha", prerelease: "alpha" },
  ],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "conventionalcommits",
      },
    ],
    "@semantic-release/release-notes-generator",
    [
      "@semantic-release/exec",
      {
        prepareCmd: "npm run build -- ${nextRelease.version}",
      },
    ],
    [
      "@semantic-release/npm",
      {
        // We're not publishing a package to `npm` or artifactory, so disable the
        // publish step. This plugin still updates the version in package.json.
        npmPublish: false,
      },
    ],
    [
      "@semantic-release/github",
      {
        assets: "dist/asset.txt",
      },
    ],
    // TODO: discuss - this would mean package.json version is not relied upon,
    // but prevents needing backmerges.
    // "@semantic-release/git",
  ],
};
