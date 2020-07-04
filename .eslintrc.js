module.exports = {
    'plugins': [
        'mocha',
        'chai-friendly'
    ],
    'env': {
        'node': true,
        'commonjs': true,
        'es2020': true,
        'mocha': true
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
        'ecmaVersion': 11
    },
    'rules': {
        'quotes': ['error', 'single'],
    }
};
