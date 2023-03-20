import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
  Observable,
  catchError,
  forkJoin,
  from,
  map,
  of,
  switchMap,
} from 'rxjs';
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
    const { firstName, lastName, email, password, feedPosts: posts } = user;
    return this.hashPassword(password).pipe(
      switchMap((hashedPassword: string) => {
        return from(
          this.userRepository.save({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            feedPosts: posts,
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
  getUserById(id: number): Observable<User> {
    return from(
      this.userRepository.findOne({
        where: [
          {
            id: id,
          },
          // many in ft
        ],
        select: ['id', 'firstName', 'lastName', 'email', 'password', 'role'],
        relations: { feedPosts: true },
      }),
    );
  }
  viewProfile(user: User): Observable<User> {
    return this.getUserById(user.id).pipe(
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
  updateProfile(id: number, user: User): Observable<UpdateResult> {
    const updateUser = this.getUserById(id);
    if (!updateUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return from(this.userRepository.update(id, user));
  }
  updateUserWithArrPosts(id: number, user: User): Observable<User> {
    const source = {
      user: this.getUserById(id),
      hashedPassword: of(''),
    };
    if (user.password) source.hashedPassword = this.hashPassword(user.password);
    const result = forkJoin(source).pipe(
      map((value: { user: User; hashedPassword: string }) => {
        if (!value.user) {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        } else {
          value.user.email = user.email;
          value.user.firstName = user.firstName;
          value.user.lastName = user.lastName;
          value.user.feedPosts = user.feedPosts;
          if (user.password) value.user.password = value.hashedPassword;
          this.userRepository.save(value.user);
          delete value.user.password;
          return value.user;
        }
      }),
    );
    return result;
  }
}
