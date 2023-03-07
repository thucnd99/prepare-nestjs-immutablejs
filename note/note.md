## NestJS

# Controller

```typescript
@Controller("users") // app.use("/users", userRoutes);
export class UserController {
  @Get("profile") // users/profile
  register(@Body() user: User): string {
    return "profile";
  }
  @Get(':id') // users/:id
  findOne(@Param('id') id: string) {
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
