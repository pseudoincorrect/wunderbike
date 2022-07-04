import request from 'supertest';

import { TricksAccess } from '../../../database/tricks';
import { Trick } from '../../../models/trick';
import { router as tricksRouter } from '../../../routes/tricks';

const express = require('express');
const bodyParser = require('body-parser');

const app = new express();
app.use(bodyParser.json());
app.use((req: any, res: any, next: any) => {
  req.auth = { sub: '001' };
  next();
});
app.use('/tricks/', tricksRouter);

describe('Tricks controller', () => {
  describe('add', () => {
    afterAll(() => {
      jest.resetAllMocks();
    });

    it('should pass', async () => {
      let addSpy = jest.spyOn(TricksAccess.prototype, 'add');
      addSpy.mockImplementation(async () => {
        return getTrickModel();
      });

      const res = await request(app)
        .post('/tricks/')
        .set('Content-type', 'application/json')
        .send({
          title: 'my title',
          description: 'my super description !',
          imageUrl: 'www.maximeclement.com',
        });

      let jRes = JSON.parse(res.text);
      expect(res.statusCode).toBe(200);
      expect(jRes.trick).toEqual(getTrickModel());
    });

    it('should fail due to validation error', async () => {
      const res = await request(app)
        .post('/tricks/')
        .set('Content-type', 'application/json')
        .send({
          title: 'my title',
          description: 'too short',
          imageUrl: 'www.maximeclement.com',
        });

      expect(res.statusCode).toBe(400);
    });
  });

  it('should fail due to database error', async () => {
    let addSpy = jest.spyOn(TricksAccess.prototype, 'add');
    addSpy.mockImplementation(async () => {
      throw 'database error';
    });

    const res = await request(app)
      .post('/tricks/')
      .set('Content-type', 'application/json')
      .send({
        title: 'my title',
        description: 'my super description !',
        imageUrl: 'www.maximeclement.com',
      });

    expect(res.statusCode).toBe(500);
  });
});

function getTrickModel(): Trick {
  return {
    id: 'dd0aa162-1e6b-46b8-9fd5-fff6b278f711',
    createdAt: '2022-07-03 21:46:49.049929+00',
    userId: 'auth0|62bbfc49034eecf99807c91c',
    title: 'my title',
    description: 'my super description !',
    imageUrl: 'www.maximeclement.com',
  } as Trick;
}
