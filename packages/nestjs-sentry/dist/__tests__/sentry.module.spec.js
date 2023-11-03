"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
const common_1 = require("@nestjs/common");
describe('SentryModule', () => {
    const config = {
        dsn: 'https://45740e3ae4864e77a01ad61a47ea3b7e@o115888.ingest.sentry.io/25956308132020',
        debug: true,
        environment: 'development',
        logLevels: ['debug']
    };
    class TestService {
        createSentryModuleOptions() {
            return config;
        }
    }
    let TestModule = class TestModule {
    };
    TestModule = __decorate([
        (0, common_1.Module)({
            exports: [TestService],
            providers: [TestService]
        })
    ], TestModule);
    describe('forRoot', () => {
        it('should provide the sentry client', () => __awaiter(void 0, void 0, void 0, function* () {
            const mod = yield testing_1.Test.createTestingModule({
                imports: [sentry_module_1.SentryModule.forRoot(config)]
            }).compile();
            const sentry = mod.get(sentry_constants_1.SENTRY_TOKEN);
            console.log('sentry', sentry);
            expect(sentry).toBeDefined();
            expect(sentry).toBeInstanceOf(sentry_service_1.SentryService);
        }));
    });
    describe('forRootAsync', () => {
        describe('when the `useFactory` option is used', () => {
            it('should provide sentry client', () => __awaiter(void 0, void 0, void 0, function* () {
                const mod = yield testing_1.Test.createTestingModule({
                    imports: [
                        sentry_module_1.SentryModule.forRootAsync({
                            useFactory: () => config
                        })
                    ]
                }).compile();
                const sentry = mod.get(sentry_constants_1.SENTRY_TOKEN);
                expect(sentry).toBeDefined();
                expect(sentry).toBeInstanceOf(sentry_service_1.SentryService);
            }));
        });
    });
    describe('when the `useClass` option is used', () => {
        it('should provide the sentry client', () => __awaiter(void 0, void 0, void 0, function* () {
            const mod = yield testing_1.Test.createTestingModule({
                imports: [
                    sentry_module_1.SentryModule.forRootAsync({
                        useClass: TestService
                    })
                ]
            }).compile();
            const sentry = mod.get(sentry_constants_1.SENTRY_TOKEN);
            expect(sentry).toBeDefined();
            expect(sentry).toBeInstanceOf(sentry_service_1.SentryService);
        }));
    });
    describe('when the `useExisting` option is used', () => {
        it('should provide the stripe client', () => __awaiter(void 0, void 0, void 0, function* () {
            const mod = yield testing_1.Test.createTestingModule({
                imports: [
                    sentry_module_1.SentryModule.forRootAsync({
                        imports: [TestModule],
                        useExisting: TestService
                    })
                ]
            }).compile();
            const sentry = mod.get(sentry_constants_1.SENTRY_TOKEN);
            expect(sentry).toBeDefined();
            expect(sentry).toBeInstanceOf(sentry_service_1.SentryService);
        }));
    });
});
