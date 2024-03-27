import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from '../src/users/users.module';
import { JwtAccessTokenAuthGuard } from '../src/auth/guards/jwt-access-auth.guard';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/users/models/user.entity';
import { AccountsModule } from '../src/accounts/accounts.module';
import { Account } from '../src/accounts/models/account.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../src/users/users.service';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let usersService: UsersService;
  let userRepository: Repository<User>;
  let accountRepository: Repository<Account>;

  const userRepositoryToken = getRepositoryToken(User);
  const accountRepositoryToken = getRepositoryToken(Account);

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'test.db',
          autoLoadEntities: true,
          synchronize: true,
          dropSchema: true,
          entities: [User, Account],
        }),
        UsersModule,
        AccountsModule,
      ],
    })
      .overrideGuard(JwtAccessTokenAuthGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => {
          const request = context.switchToHttp().getRequest();
          request.user = { id: 1, email: 'hello@nestjs.com' };
          return true;
        },
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    usersService = moduleFixture.get<UsersService>(UsersService);
    userRepository = moduleFixture.get<Repository<User>>(userRepositoryToken);
    accountRepository = moduleFixture.get<Repository<Account>>(
      accountRepositoryToken,
    );
    await usersService.create({ email: 'hello@nestjs.com', name: 'hello' });
  });

  afterAll(async () => {
    await userRepository.query('DELETE FROM user;');
    await accountRepository.query('DELETE FROM account;');
    await app.close();
  });

  it('/users/self (GET)', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/users/self')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(body).toEqual({ email: 'hello@nestjs.com', name: 'hello' });
  });

  it('/users/self (PUT)', async () => {
    const { body } = await request(app.getHttpServer())
      .put('/users/self')
      .send({ name: 'nestjs' })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(body).toEqual({ email: 'hello@nestjs.com', name: 'nestjs' });
  });

  it('/users/self (DELETE)', async () => {
    return request(app.getHttpServer()).delete('/users/self').expect(200);
  });
});
