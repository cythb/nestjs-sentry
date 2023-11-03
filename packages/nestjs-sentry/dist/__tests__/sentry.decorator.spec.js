"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const common_1 = require("@nestjs/common");
const sentry_decorator_1 = require("../sentry.decorator");
const sentry_module_1 = require("../sentry.module");
const sentry_service_1 = require("../sentry.service");
describe('InjectS3', () => {
    const config = {
        dsn: 'https://45740e3ae4864e77a01ad61a47ea3b7e@o115888.ingest.sentry.io/25956308132020',
        debug: true,
        environment: 'development',
        logLevels: ['debug']
    };
    let module;
    let InjectableService = class InjectableService {
        constructor(client) {
            this.client = client;
        }
    };
    InjectableService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, sentry_decorator_1.InjectSentry)()),
        __metadata("design:paramtypes", [sentry_service_1.SentryService])
    ], InjectableService);
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        module = yield testing_1.Test.createTestingModule({
            imports: [sentry_module_1.SentryModule.forRoot(config)],
            providers: [InjectableService]
        }).compile();
    }));
    describe('when decorating a class constructor parameter', () => {
        it('should inject the sentry client', () => {
            const testService = module.get(InjectableService);
            expect(testService).toHaveProperty('client');
            expect(testService.client).toBeInstanceOf(sentry_service_1.SentryService);
        });
    });
});
