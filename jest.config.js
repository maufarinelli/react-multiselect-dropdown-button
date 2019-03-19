module.exports = {
    collectCoverageFrom: ['src/**/*.(jsx|js)', '!src/**/*.mock.js'],
    coverageThreshold: {
        global: {
            branches: 0,
            functions: 0,
            lines: 20
        }
    },
    coveragePathIgnorePatterns: ['/node_modules/', '/coverage/', '/dist/', '/scripts/', '/public/', '/config/'],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?)$',
    watchPathIgnorePatterns: ['/node_modules/', '/dist/', '/coverage/', '/scripts/', '/public/', '/config/'],
    setupFilesAfterEnv: ['./src/setupTests.js'],
    snapshotSerializers: ['enzyme-to-json/serializer'],
    testMatch: null,
    testPathIgnorePatterns: ['/node_modules/', '/coverage/', '/dist/', '/scripts/', '/public/', '/config/']
};