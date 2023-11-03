"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphqlInterceptor = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const node_1 = require("@sentry/node");
const nestjs_sentry_1 = require("@travelerdev/nestjs-sentry");
let GraphqlInterceptor = exports.GraphqlInterceptor = class GraphqlInterceptor extends nestjs_sentry_1.SentryInterceptor {
    captureException(context, scope, exception) {
        if (context.getType() === 'graphql') {
            this.captureGraphqlException(scope, graphql_1.GqlExecutionContext.create(context), exception);
        }
        else {
            super.captureException(context, scope, exception);
        }
    }
    captureGraphqlException(scope, gqlContext, exception) {
        const info = gqlContext.getInfo();
        const context = gqlContext.getContext();
        scope.setExtra('type', info.parentType.name);
        if (context.req) {
            const data = node_1.Handlers.parseRequest({}, context.req, {});
            scope.setExtra('req', data.request);
            if (data.extra)
                scope.setExtras(data.extra);
            if (data.user)
                scope.setUser(data.user);
        }
        this.client.instance().captureException(exception);
    }
};
exports.GraphqlInterceptor = GraphqlInterceptor = __decorate([
    (0, common_1.Injectable)()
], GraphqlInterceptor);
