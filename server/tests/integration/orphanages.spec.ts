import request from 'supertest';
import { Connection, getRepository } from 'typeorm';
import { createConnection } from 'typeorm';
import fs from 'fs';

import app from '../../src/app';
import Image from '../../src/models/Image';
import Orphanage from '../../src/models/Orphanage';
import factory from '../utils/factory';


describe('Orphanates controller', () => {
  const now = new Date().getTime();
  let connection: Connection;

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  beforeEach(async () => {
    const orphanagesRepository = getRepository(Orphanage);
    const imagesRepository = getRepository(Image);
    await orphanagesRepository.clear();
    await imagesRepository.clear();
  });

  afterAll(async () => {
    await fs.unlink(
      __dirname + '/../../tmp/uploads/' + now + '-example.jpg',
      () => {},
    );
    await connection.dropDatabase();
  });

  it('should be able to get a list of orphanates', async () => {
    const orphanages = await factory.attrsMany<Orphanage>('Orphanage', 1);

    const promises: Promise<Orphanage>[] = [];
    const orphanagesRepository = getRepository(Orphanage);
    orphanages.forEach(orphanage => {
      const data = orphanagesRepository.create(orphanage);
      promises.push(orphanagesRepository.save(data));
    });

    const savedOrphanages = await Promise.all(promises);
    const images = await factory.attrsMany<Image>(
      'Image',
      1,
      savedOrphanages.map(orphanage => ({ orphanage })),
    );

    const imagesRepository = getRepository(Image);
    await imagesRepository.save(imagesRepository.create(images));

    const response = await request(app).get('/orphanages').send();

    orphanages.forEach(orphanage => {
      const regex = new RegExp(`${process.env.BASE_URL}/orphanages/\\d`);
      expect(response.body).toContainEqual({
        id: expect.any(Number),
        name: orphanage.name,
        latitude: Number(orphanage.latitude),
        longitude: Number(orphanage.longitude),
        about: orphanage.about,
        instructions: orphanage.instructions,
        opening_hours: orphanage.opening_hours,
        open_on_weekends: orphanage.open_on_weekends,
        images: [
          {
            id: expect.any(Number),
            path: expect.any(String),
          },
        ],
        url: expect.stringMatching(regex),
      });
    });
  });

});
