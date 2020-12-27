import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Orphanage from "../models/Orphanage";
import orphanagesView from "../views/orphanages_view";

export default {
  async create(request: Request, response: Response) : Promise<Response | void> {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = request.body;
    const images = request.files as Express.Multer.File[];

    const orphanagesRepository = getRepository(Orphanage);
    const orphanage = orphanagesRepository.create({
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends == 'true',
      images: images.map(image => ({
        path: image.filename,
      })),
    });

    await orphanagesRepository.save(orphanage);

    response.status(201).json(orphanage);
  },
  async index(request: Request, response: Response) {
    const orphanageRepository = getRepository(Orphanage);

    const list = await orphanageRepository.find({
      relations: ["images"],
    });

    return response.status(200).json(orphanagesView.renderMany(list));
  },
  async show(request: Request, response: Response) {
    const { id } = request.params;

    const orphanageRepository = getRepository(Orphanage);

    const ophanage = await orphanageRepository.findOneOrFail(id, {
      relations: ["images"],
    });

    return response.status(200).json(orphanagesView.render(ophanage));
  },
};
