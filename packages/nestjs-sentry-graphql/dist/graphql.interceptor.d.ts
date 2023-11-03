import { ExecutionContext } from '@nestjs/common';
import { Scope } from '@sentry/hub';
import { SentryInterceptor } from '@travelerdev/nestjs-sentry';
export declare class GraphqlInterceptor extends SentryInterceptor {
    protected captureException(context: ExecutionContext, scope: Scope, exception: unknown): void;
    private captureGraphqlException;
}
//# sourceMappingURL=graphql.interceptor.d.ts.map