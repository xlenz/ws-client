module.exports = {
    "parser": "esprima",
    "env": {
        "node": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "off",
            "unix"
        ],
        "quotes": [
            "warn",
            "single"
        ],
        "semi": [
            "warn",
            "always"
        ],
        "no-unused-vars": ["error", { "vars": "all", "args": "none" }]
    },
    "globals": {
        "log": true,
        "CONFIG": true
    }
};