## NestJS

# Controller
- For quickly creating a CRUD controller with the validation built-in, you may use the CLI's CRUD generator: ` nest g resource [name]`
```typescript
@Controller("users") // app.use("/users", userRoutes);
export class UserController {
  @Get("profile") // users/profile
  register(@Body() user: User): string {
    return "profile";
  }
  @Get(":id") // users/:id
  findOne(@Param("id") id: string) {
    return `This action returns a #${id} user`;
  }

  @Post("update") // users/update
  @HttpCode(HttpStatus.OK)
  login(@Body() user: User): string {
    return " profile";
  }
}
```

# Asynchronicity

```typescript
    // ot 1
    @Get()
    async findAll(): Promise<any[]> {
    return [];
    }
    // ot 2
    @Get()
    findAll(): Observable<any[]> {
    return of([]);
    }
```

# Add controller to run

- Add in file `app.module.ts`

```typescript
import { Module } from "@nestjs/common";
import { CatsController } from "./cats/cats.controller";

@Module({
  controllers: [CatsController],
})
export class AppModule {}
```

# Provider `@Injectable()`
- Run: `nest g service cats`
    ```typescript
    import { Injectable } from '@nestjs/common';

    import { Cat } from './interfaces/cat.interface';

    @Injectable()
    export class CatsService {
        private readonly cats: Cat[] = [];

        create(cat: Cat) {
        this.cats.push(cat);
        }

        findAll(): Cat[] {
        return this.cats;
        }
    }

    ```

# Module `nest g module [name]`
- Apply modules
    ```typescript
        // before
        //file app.module.ts
        @Module({
        imports: [],
        controllers: [AppController, AuthController, UserController],
        providers: [AppService],
        })
        // after
        //create file cats.module.ts
        import { Module } from '@nestjs/common';
        import { CatsController } from './cats.controller';
        import { CatsService } from './cats.service';

        @Module({
        controllers: [CatsController],
        providers: [CatsService],
        })
        export class CatsModule {}

        //update app.module.ts
        import { Module } from '@nestjs/common';
        import { CatsModule } from './cats/cats.module';

        @Module({
        imports: [CatsModule],
        })
        export class AppModule {}
        //
    ```
- Global modules: `@Global()`
- Dynamic modules: 
    ```typescript
    // same as DBContext
    import { Module, DynamicModule } from '@nestjs/common';
    import { createDatabaseProviders } from './database.providers';
    import { Connection } from './connection.provider';

    @Module({
    providers: [Connection],
    })
    export class DatabaseModule {
    static forRoot(entities = [], options?): DynamicModule {
        const providers = createDatabaseProviders(options, entities);
        return {
        module: DatabaseModule,
        providers: providers,
        exports: providers,
        };
    }
    }
    ```
    Read: https://docs.nestjs.com/fundamentals/dynamic-modules
# Middleware
- Create:
    ```typescript
    import { Injectable, NestMiddleware } from '@nestjs/common';
    import { Request, Response, NextFunction } from 'express';

    @Injectable()
    export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log('Request...');
        next();
    }
    }
    ```
- Apply:
    ```typescript
    import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
    import { LoggerMiddleware } from './common/middleware/logger.middleware';
    import { CatsModule } from './cats/cats.module';

    @Module({
    imports: [CatsModule],
    })
    export class AppModule implements NestModule {
        configure(consumer: MiddlewareConsumer) {
            consumer
            .apply(LoggerMiddleware)
            .forRoutes('cats');
            // or
            .forRoutes({ path: 'cats', method: RequestMethod.GET }); // only GET
        }
    }
    ```
# Exception filters (same .NET)

- Create
    ```typescript
    @Get()
    async findAll() {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    //or: overriding the entire response body and providing an error cause
    @Get()
    async findAll() {
        try {
            await this.service.findAll()
        } catch (error) { 
            throw new HttpException({
            status: HttpStatus.FORBIDDEN,
            error: 'This is a custom message',
            }, HttpStatus.FORBIDDEN, {
            cause: error
            });
        }
    }
    ```
- Custom exceptions
    ```typescript
    export class ForbiddenException extends HttpException {
        constructor() {
            super('Forbidden', HttpStatus.FORBIDDEN);
        }
    }
    ```
- Http exception filter -> binding filter
    ```typescript
    import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
    import { Request, Response } from 'express';

    @Catch(HttpException)
    export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        response
        .status(status)
        .json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
    }
    ```
    ```typescript
    // passing instance
    @Post()
    @UseFilters(new HttpExceptionFilter()) 
    async create(@Body() createCatDto: CreateCatDto) {
        throw new ForbiddenException();
    }
    // passing class
    @Post()
    @UseFilters(HttpExceptionFilter)
    async create(@Body() createCatDto: CreateCatDto) {
        throw new ForbiddenException();
    }
    ```
- Scope: method-scoped, controller-scoped, or global-scoped
    + Method:
        ```typescript
        @Post()
        @UseFilters(HttpExceptionFilter)
        async create(@Body() createCatDto: CreateCatDto) {
        throw new ForbiddenException();
        }
        ```
    + Controller:
        ```typescript
        @UseFilters(new HttpExceptionFilter())
        export class CatsController {}
        ```
    + Global:
        ```typescript
        async function bootstrap() {
        const app = await NestFactory.create(AppModule);
        app.useGlobalFilters(new HttpExceptionFilter());
        await app.listen(3000);
        }
        bootstrap();
        ```
        - The `useGlobalFilters()` method does not set up filters for gateways or hybrid applications.
        -> you can register a global-scoped filter **directly from any module**
        ```typescript
        import { Module } from '@nestjs/common';
        import { APP_FILTER } from '@nestjs/core';

        @Module({
        providers: [
            {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
            },
        ],
        })
        export class AppModule {}
        ```
- Caching: In order to catch every unhandled exception (regardless of the exception type), leave the `@Catch()` decorator's parameter list empty, e.g., `@Catch()`.
    ```typescript
    import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    } from '@nestjs/common';
    import { HttpAdapterHost } from '@nestjs/core';

    @Catch()
    export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: unknown, host: ArgumentsHost): void {
        // In certain situations `httpAdapter` might not be available in the
        // constructor method, thus we should resolve it here.
        const { httpAdapter } = this.httpAdapterHost;

        const ctx = host.switchToHttp();

        const httpStatus =
        exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        const responseBody = {
        statusCode: httpStatus,
        timestamp: new Date().toISOString(),
        path: httpAdapter.getRequestUrl(ctx.getRequest()),
        };

        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
    }
    ```
- Inheritance: there might be use-cases when you would like to simply extend the built-in default global exception filter, and override the behavior based on certain factors
    ```typescript
    import { Catch, ArgumentsHost } from '@nestjs/common';
    import { BaseExceptionFilter } from '@nestjs/core';

    @Catch()
    export class AllExceptionsFilter extends BaseExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        super.catch(exception, host);
    }
    }
    ```
    **Method-scoped and Controller-scoped filters that extend the BaseExceptionFilter should not be instantiated with new. Instead, let the framework instantiate them automatically.**
# Pipes `@Injectable()`

- Pipes have two typical use cases:
    + transformation: transform input data to the desired form (e.g., from string to integer)
    + validation: evaluate input data and if valid, simply pass it through unchanged; otherwise, throw an exception
- Built-in pipes:
    ValidationPipe
    ParseIntPipe
    ParseFloatPipe
    ParseBoolPipe
    ParseArrayPipe
    ParseUUIDPipe
    ParseEnumPipe
    DefaultValuePipe
    ParseFilePipe
- Sample:
    ```typescript
    @Get(':id')
    async findOne(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
    id: number,
    ) {
    return this.catsService.findOne(id);
    }
    ```
- **Object schema validation**: `npm install --save joi`
    ```javascript
    import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
    import { ObjectSchema } from 'joi';

    @Injectable()
    export class JoiValidationPipe implements PipeTransform {
    constructor(private schema: ObjectSchema) {}

    transform(value: any, metadata: ArgumentMetadata) {
        const { error } = this.schema.validate(value);
        if (error) {
        throw new BadRequestException('Validation failed');
        }
        return value;
    }
    }
    //build schema validate
    const createCatSchema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().required(),
    breed: Joi.string().required(),
    })

    export interface CreateCatDto {
    name: string;
    age: number;
    breed: string;
    }
    // use @UsePipes
    @Post()
    @UsePipes(new JoiValidationPipe(createCatSchema))
    async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
    }
    ```
- Class validator `npm i --save class-validator class-transformer`
    ```typescript
    //in dto
    import { IsString, IsInt } from 'class-validator';

    export class CreateCatDto {
    @IsString()
    name: string;

    @IsInt()
    age: number;

    @IsString()
    breed: string;
    }
    //validation.pipe.ts
    import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
    import { validate } from 'class-validator';
    import { plainToInstance } from 'class-transformer';

    @Injectable()
    export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
        return value;
        }
        const object = plainToInstance(metatype, value);
        const errors = await validate(object);
        if (errors.length > 0) {
        throw new BadRequestException('Validation failed');
        }
        return value;
    }

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
    }
    //controller file
    @Post()
    async create(
    @Body(new ValidationPipe()) createCatDto: CreateCatDto,
    ) {
    this.catsService.create(createCatDto);
    }
    //global pipe
    async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3000);
    }
    bootstrap();
    //or
    import { Module } from '@nestjs/common';
    import { APP_PIPE } from '@nestjs/core';

    @Module({
    providers: [
        {
        provide: APP_PIPE,
        useClass: ValidationPipe,
        },
    ],
    })
    export class AppModule {}
    ```
# Guards `@Injectable()` Guards are executed after all middleware, but before any interceptor or pipe.
- Must implement `canActivate()`
- Dont need `next()`
- Scope: controlled-scope, method -> `@UseGuards()`
    + global:
    ```typescript
    const app = await NestFactory.create(AppModule);
    app.useGlobalGuards(new RolesGuard());
    //or
    //app.module.ts
    import { Module } from '@nestjs/common';
    import { APP_GUARD } from '@nestjs/core';

    @Module({
    providers: [
        {
        provide: APP_GUARD,
        useClass: RolesGuard,
        },
    ],
    })
    export class AppModule {}
    ```
- Roles:
    ```typescript
    @Post()
    @SetMetadata('roles', ['admin'])
    async create(@Body() createCatDto: CreateCatDto) {
        this.catsService.create(createCatDto);
    }
    ```
    - With the construction above, we attached the roles metadata (roles is a key, while ['admin'] is a particular value) to the create() method. While this works, it's not good practice to use @SetMetadata() directly in your routes. Instead, create your own decorators, as shown below:
    ```typescript
    //roles.decorator.ts
    import { SetMetadata } from '@nestjs/common';

    export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
    //in file controller
    @Post()
    @Roles('admin')
    async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
    }
    ```
# Interceptors `@Injectable()`
- Interceptors have a set of useful capabilities which are inspired by the Aspect Oriented Programming (AOP) technique. They make it possible to:
    - bind extra logic before / after method execution
    - transform the result returned from a function
    - transform the exception thrown from a function
    - extend the basic function behavior
    - completely override a function depending on specific conditions (e.g., for caching purposes)
