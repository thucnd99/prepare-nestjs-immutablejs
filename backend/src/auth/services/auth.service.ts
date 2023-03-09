import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Observable, catchError, from, map, switchMap } from 'rxjs';
import { User } from '../models/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../models/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}
  hashPassword(password: string): Observable<string> {
    return from(bcrypt.hash(password, 12));
  }
  registerAccount(user: User): Observable<User> {
    const { firstName, lastName, email, password } = user;
    return this.hashPassword(password).pipe(
      switchMap((hashedPassword: string) => {
        return from(
          this.userRepository.save({
            firstName,
            lastName,
            email,
            password: hashedPassword,
          }),
        ).pipe(
          map((user: User) => {
            delete user.password;
            return user;
          }),
        );
      }),
    );
  }
  validateUser(email: string, password: string): Observable<User> {
    return from(
      this.userRepository.findOne({
        where: {
          email: email,
        },
        select: ['id', 'firstName', 'lastName', 'email', 'password', 'role'],
      }),
    ).pipe(
      switchMap((user: User) =>
        from(bcrypt.compare(password, user.password)).pipe(
          map((isValidPassword: boolean) => {
            if (isValidPassword) {
              delete user.password;
              return user;
            }
          }),
        ),
      ),
    );
  }
  login(user: User): Observable<string> {
    const { email, password } = user;
    return this.validateUser(email, password).pipe(
      switchMap((user: User) => {
        if (user) {
          return from(this.jwtService.signAsync({ user }));
        }
      }),
    );
  }
  getUserById(user: User): Observable<User> {
    return from(
      this.userRepository.findOne({
        where: [
          {
            id: user.id,
          },
          {
            email: user.email,
          },
          // many in ft
        ],
        select: ['id', 'firstName', 'lastName', 'email', 'password', 'role'],
      }),
    );
  }
  viewProfile(user: User): Observable<User> {
    return this.getUserById(user).pipe(
      map((user: User) => {
        if (!user) {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        delete user.password;
        return user;
      }),
    );
  }
  validateUpdateUser(user: User): Observable<User> {
    return from(
      this.userRepository.findOne({
        where: [
          {
            email: user.email,
          },
          // many in ft
        ],
      }),
    );
  }
  updateProfile(user: User): Observable<UpdateResult> {
    const updateUser = this.getUserById(user);
    if (!updateUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return from(this.userRepository.update(user.id, user));
  }
}
