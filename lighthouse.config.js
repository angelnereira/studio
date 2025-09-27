module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/services',
        'http://localhost:3000/admin',
      ],
      numberOfRuns: 3,
      startServerCommand: 'npm run start',
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.95 }],
        "uses-rel-preconnect": "off",
        "uses-webp-images": "off"
      },
    },
  },
};
