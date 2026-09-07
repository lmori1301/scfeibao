import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseDto } from '../dto/response.dto';
import { stripTestDataMarker } from '../utils/test-data-marker';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ResponseDto<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseDto<T>> {
    return next.handle().pipe(
      map((data) => {
        if (data instanceof ResponseDto) {
          data.data = stripTestDataMarker(data.data);
          return data;
        }
        return ResponseDto.success(stripTestDataMarker(data));
      }),
    );
  }
}
