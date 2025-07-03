import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const req = context.switchToHttp().getRequest<Request>();
    const { method, url } = req;

    return next
      .handle()
      .pipe(
        tap(() =>
          console.log(`[${method}] ${url} - done in ${Date.now() - now}ms`),
        ),
      );
  }
}
