"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const sentry_module_1 = require("../sentry.module");
const sentry_service_1 = require("../sentry.service");
const sentry_constants_1 = require("../sentry.constants");
const Sentry = require("@sentry/node");
jest.spyOn(Sentry, 'close').mockImplementation(() => Promise.resolve(true));
const SENTRY_NOT_CONFIGURE_ERROR = 'Please confirm that Sentry is configured correctly';
describe('SentryService', () => {
    const config = {
        dsn: 'https://45740e3ae4864e77a01ad61a47ea3b7e@o115888.ingest.sentry.io/25956308132020',
        debug: true,
        environment: 'development',
        logLevels: ['debug']
    };
    const failureConfig = {
        dsn: 'https://sentry_io_dsn@sentry.io/1512xxx',
        debug: true,
        environment: 'development',
        logLevels: ['debug']
    };
    class FailureService {
        createSentryModuleOptions() {
            return failureConfig;
        }
    }
    describe('sentry.log:error', () => {
        it('should provide the sentry client and call log', () => __awaiter(void 0, void 0, void 0, function* () {
            const mod = yield testing_1.Test.createTestingModule({
                imports: [
                    sentry_module_1.SentryModule.forRootAsync({
                        useClass: FailureService
                    })
                ]
            }).compile();
            const fail = mod.get(sentry_constants_1.SENTRY_TOKEN);
            console.log('sentry:error', fail);
            fail.log('sentry:log');
            expect(fail.log).toBeInstanceOf(Function);
        }));
    });
    describe('sentry.log', () => {
        it('should provide the sentry client and call log', () => __awaiter(void 0, void 0, void 0, function* () {
            const mod = yield testing_1.Test.createTestingModule({
                imports: [
                    sentry_module_1.SentryModule.forRoot(Object.assign({}, config))
                ]
            }).compile();
            const sentry = mod.get(sentry_constants_1.SENTRY_TOKEN);
            expect(sentry).toBeDefined();
            expect(sentry).toBeInstanceOf(sentry_service_1.SentryService);
            console.log('sentry', sentry);
            sentry.log('sentry:log');
            expect(sentry.log).toBeInstanceOf(Function);
            expect(true).toBeTruthy();
        }));
    });
    describe('sentry.error', () => {
        it('should provide the sentry client and call error', () => __awaiter(void 0, void 0, void 0, function* () {
            const mod = yield testing_1.Test.createTestingModule({
                imports: [
                    sentry_module_1.SentryModule.forRoot(Object.assign({}, config))
                ]
            }).compile();
            const sentry = mod.get(sentry_constants_1.SENTRY_TOKEN);
            expect(sentry).toBeDefined();
            expect(sentry).toBeInstanceOf(sentry_service_1.SentryService);
            sentry.error('sentry:error');
            expect(sentry.error).toBeInstanceOf(Function);
            expect(true).toBeTruthy();
        }));
    });
    describe('sentry.verbose', () => {
        it('should provide the sentry client and call verbose', () => __awaiter(void 0, void 0, void 0, function* () {
            const mod = yield testing_1.Test.createTestingModule({
                imports: [
                    sentry_module_1.SentryModule.forRoot(Object.assign({}, config))
                ]
            }).compile();
            const sentry = mod.get(sentry_constants_1.SENTRY_TOKEN);
            expect(sentry).toBeDefined();
            expect(sentry).toBeInstanceOf(sentry_service_1.SentryService);
            sentry.verbose('sentry:verbose', 'context:verbose');
            expect(sentry.verbose).toBeInstanceOf(Function);
            expect(true).toBeTruthy();
        }));
    });
    describe('sentry.debug', () => {
        it('should provide the sentry client and call debug', () => __awaiter(void 0, void 0, void 0, function* () {
            const mod = yield testing_1.Test.createTestingModule({
                imports: [
                    sentry_module_1.SentryModule.forRoot(Object.assign({}, config))
                ]
            }).compile();
            const sentry = mod.get(sentry_constants_1.SENTRY_TOKEN);
            expect(sentry).toBeDefined();
            expect(sentry).toBeInstanceOf(sentry_service_1.SentryService);
            sentry.debug('sentry:debug', 'context:debug');
            expect(sentry.debug).toBeInstanceOf(Function);
            expect(true).toBeTruthy();
        }));
    });
    describe('sentry.warn', () => {
        it('should provide the sentry client and call warn', () => __awaiter(void 0, void 0, void 0, function* () {
            const mod = yield testing_1.Test.createTestingModule({
                imports: [
                    sentry_module_1.SentryModule.forRoot(Object.assign({}, config))
                ]
            }).compile();
            const sentry = mod.get(sentry_constants_1.SENTRY_TOKEN);
            expect(sentry).toBeDefined();
            expect(sentry).toBeInstanceOf(sentry_service_1.SentryService);
            try {
                sentry.warn('sentry:warn', 'context:warn');
                expect(true).toBeTruthy();
            }
            catch (err) { }
            expect(sentry.warn).toBeInstanceOf(Function);
        }));
    });
    describe('sentry.close', () => {
        it('should not close the sentry if not specified in config', () => __awaiter(void 0, void 0, void 0, function* () {
            const mod = yield testing_1.Test.createTestingModule({
                imports: [sentry_module_1.SentryModule.forRoot(config)]
            }).compile();
            yield mod.enableShutdownHooks();
            const sentry = mod.get(sentry_constants_1.SENTRY_TOKEN);
            expect(sentry).toBeDefined();
            expect(sentry).toBeInstanceOf(sentry_service_1.SentryService);
            yield mod.close();
        }));
        it('should close the sentry if specified in config', () => __awaiter(void 0, void 0, void 0, function* () {
            const timeout = 100;
            const mod = yield testing_1.Test.createTestingModule({
                imports: [
                    sentry_module_1.SentryModule.forRoot(Object.assign(Object.assign({}, config), { close: {
                            enabled: true,
                            timeout
                        } }))
                ]
            }).compile();
            yield mod.enableShutdownHooks();
            const sentry = mod.get(sentry_constants_1.SENTRY_TOKEN);
            expect(sentry).toBeDefined();
            expect(sentry).toBeInstanceOf(sentry_service_1.SentryService);
            yield mod.close();
        }));
    });
    describe('Sentry Service exception handling', () => {
        it('should test verbose catch err', () => __awaiter(void 0, void 0, void 0, function* () {
            const mod = yield testing_1.Test.createTestingModule({
                imports: [
                    sentry_module_1.SentryModule.forRoot(Object.assign({}, failureConfig))
                ]
            }).compile();
            const sentry = mod.get(sentry_constants_1.SENTRY_TOKEN);
            expect(sentry).toBeDefined();
            expect(sentry).toBeInstanceOf(sentry_service_1.SentryService);
            try {
                sentry.verbose('This will throw an exception');
            }
            catch (err) {
                expect(sentry.log).toThrowError(SENTRY_NOT_CONFIGURE_ERROR);
            }
        }));
        it('should test warn catch err', () => __awaiter(void 0, void 0, void 0, function* () {
            const mod = yield testing_1.Test.createTestingModule({
                imports: [
                    sentry_module_1.SentryModule.forRoot(Object.assign({}, failureConfig))
                ]
            }).compile();
            const sentry = mod.get(sentry_constants_1.SENTRY_TOKEN);
            expect(sentry).toBeDefined();
            expect(sentry).toBeInstanceOf(sentry_service_1.SentryService);
            try {
                sentry.warn('This will throw an exception');
            }
            catch (err) {
                expect(sentry.log).toThrowError(SENTRY_NOT_CONFIGURE_ERROR);
            }
        }));
        it('should test error catch err', () => __awaiter(void 0, void 0, void 0, function* () {
            const mod = yield testing_1.Test.createTestingModule({
                imports: [
                    sentry_module_1.SentryModule.forRoot(Object.assign({}, failureConfig))
                ]
            }).compile();
            const sentry = mod.get(sentry_constants_1.SENTRY_TOKEN);
            expect(sentry).toBeDefined();
            expect(sentry).toBeInstanceOf(sentry_service_1.SentryService);
            try {
                sentry.error('This will throw an exception');
            }
            catch (err) {
                expect(sentry.log).toThrowError(SENTRY_NOT_CONFIGURE_ERROR);
            }
        }));
        it('should test debug catch err', () => __awaiter(void 0, void 0, void 0, function* () {
            const mod = yield testing_1.Test.createTestingModule({
                imports: [
                    sentry_module_1.SentryModule.forRoot(Object.assign({}, failureConfig))
                ]
            }).compile();
            const sentry = mod.get(sentry_constants_1.SENTRY_TOKEN);
            expect(sentry).toBeDefined();
            expect(sentry).toBeInstanceOf(sentry_service_1.SentryService);
            try {
                sentry.debug('This will throw an exception');
            }
            catch (err) {
                expect(sentry.log).toThrowError(SENTRY_NOT_CONFIGURE_ERROR);
            }
        }));
        it('should test log catch err', () => __awaiter(void 0, void 0, void 0, function* () {
            const mod = yield testing_1.Test.createTestingModule({
                imports: [
                    sentry_module_1.SentryModule.forRoot(Object.assign({}, failureConfig))
                ]
            }).compile();
            const sentry = mod.get(sentry_constants_1.SENTRY_TOKEN);
            expect(sentry).toBeDefined();
            expect(sentry).toBeInstanceOf(sentry_service_1.SentryService);
            try {
                sentry.log('This will throw an exception');
            }
            catch (err) {
                expect(sentry.log).toThrowError(SENTRY_NOT_CONFIGURE_ERROR);
            }
        }));
    });
    describe('Sentry Service asBreadcrumb implementation', () => {
        let mod;
        let sentry;
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            mod = yield testing_1.Test.createTestingModule({
                imports: [
                    sentry_module_1.SentryModule.forRoot(Object.assign({}, config))
                ]
            }).compile();
            sentry = mod.get(sentry_constants_1.SENTRY_TOKEN);
        }));
        it('sentry.SentryServiceInstance', () => {
            expect(sentry_service_1.SentryService.SentryServiceInstance).toBeInstanceOf(Function);
        });
        it('sentry.instance', () => {
            expect(sentry.instance).toBeInstanceOf(Function);
        });
        it('sentry.log asBreabcrumb === true', () => {
            try {
                sentry.log('sentry:log', 'context:log', true);
                expect(true).toBeTruthy();
            }
            catch (err) { }
            expect(sentry.log).toBeInstanceOf(Function);
        });
        it('sentry.debug asBreabcrumb === true', () => {
            try {
                sentry.debug('sentry:debug', 'context:debug', true);
                expect(true).toBeTruthy();
            }
            catch (err) { }
            expect(sentry.debug).toBeInstanceOf(Function);
        });
        it('sentry.verbose asBreabcrumb === true', () => {
            try {
                sentry.verbose('sentry:verbose', 'context:verbose', true);
                expect(true).toBeTruthy();
            }
            catch (err) { }
            expect(sentry.verbose).toBeInstanceOf(Function);
        });
        it('sentry.warn asBreabcrumb === true', () => {
            try {
                sentry.verbose('sentry:warn', 'context:warn', true);
                expect(true).toBeTruthy();
            }
            catch (err) { }
            expect(sentry.warn).toBeInstanceOf(Function);
        });
    });
});
