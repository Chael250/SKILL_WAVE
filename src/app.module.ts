import { Module } from '@nestjs/common';
import { InstructorsModule } from './instructors/instructors.module';
import { StudentsModule } from './students/students.module';
import { CoursesModule } from './courses/courses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Instructor } from './instructors/entities/instructor.entity';
import { Course } from './courses/entities/course.entity';
import { AuthStuModule } from './auth-stu/auth-stu.module';
import { AuthInsModule } from './auth-ins/auth-ins.module';
import { AtStuGuard } from './common/guards';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { Student } from './students/entities/student.entity';

@Module({
  imports: [InstructorsModule, StudentsModule, 
    ConfigModule.forRoot({
      isGlobal: true
    }),
    CoursesModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config:ConfigService) => ({
        type: "postgres",
        host: config.get("DB_HOST"),
        port: config.get("DB_PORT"),
        username: config.get("DB_USERNAME"),
        password: config.get("DB_PASSWORD"),
        database: config.get("DB_DATABASE"),
        entities: [Instructor, Course, Student],
        synchronize: true //Data loss during production
      })
  }),
    AuthStuModule,
    AuthInsModule,
    JwtModule.register({
      global: true
    })
    
  ],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: AtStuGuard
  }],
})
export class AppModule {}


//Host
//Port
//username
//password
//database
//entities
//Synchronize
