module.exports = {
	branches: [
		"master",
		{
			name: "staging",
			prerelease: true
		}
	],
	plugins: [
		"@semantic-release/commit-analyzer",
		"@semantic-release/release-notes-generator",
		"@semantic-release/changelog",
		[
			"@semantic-release/npm",
			{
				npmPublish: false
			}
		],
		"@semantic-release/github",
		[
			"@semantic-release/git",
			{
				assets: [
					"src/**/*.{js,json}",
					"package*.json"
				],
				message: "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
			}
		]
	]
}
