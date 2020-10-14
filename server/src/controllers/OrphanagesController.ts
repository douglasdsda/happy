import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Orphanage from "../models/Orphanage";
import orphanagesView from "../views/orphanages_view";
import * as Yup from "yup";

export default {
  async create(request: Request, response: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = request.body;

    const orphanageRepository = getRepository(Orphanage);

    const requestImages = request.files as Express.Multer.File[];

    const images = requestImages.map((image) => {
      return { path: image.filename };
    });

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images
    }

    const shema = Yup.object().shape({
      name: Yup.string().required("Nome obrigatorio"),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(Yup.object().shape({
        path: Yup.string().required()
      })
      )
    });

    await shema.validate(data , { abortEarly: false });

    const orphanage = orphanageRepository.create(data);

    await orphanageRepository.save(orphanage);

    return response.status(201).json(orphanage);
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
