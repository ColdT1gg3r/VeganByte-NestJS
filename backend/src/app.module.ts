import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { User } from './user.entity';

@Module({
  imports: [
    // Configuración de TypeORM para MySQL
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root', // Usuario de tu MySQL Workbench
      password: '1604', // Cambia por tu contraseña real
      database: 'auth_db',
      entities: [User],
      synchronize: true, // Solo para desarrollo (no usar en producción)
    }),

    // Módulo de Passport con estrategia local
    PassportModule.register({ defaultStrategy: 'local' }),

    // Módulo de TypeORM para la entidad User
    TypeOrmModule.forFeature([User]),

    // Módulo JWT
    JwtModule.register({
      secret: 'tu_clave_secreta', // Cambia por un secreto seguro
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AppController, AuthController],
  providers: [
    AuthService,
    LocalStrategy, // Estrategia local
    JwtStrategy,   // Estrategia JWT
    AppService,
  ],
})
export class AppModule {}