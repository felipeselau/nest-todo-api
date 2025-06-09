import { ExecutionContext, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { TasksModule } from './tasks/tasks.module';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt.guards';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    TasksModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ],
})
export class AppModule {}
