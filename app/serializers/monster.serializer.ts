import { Admin, Monster } from "@prisma/client";
import { FormatedUtil } from "@utils";

interface MetaDataType {
  page: number;
  limit: number;
  total: number;
}

export default class AdminSerializer {
  static index(data: Monster[], meta: MetaDataType) {
    const mapping = data.map((item) => {
      return {
        id: item.id,
        name: item.name,
        type: item.type,
        picture: item.picture,
        is_liked: false, // this should be dynamic to user relationship with monster. If a user's catched a pokemon, it should be true. However for the sake of simplicity, i'll make all false
        created_at: FormatedUtil.formatDateTime(item.created_at),
        updated_at: FormatedUtil.formatDateTime(item.updated_at),
      };
    });

    return {
      data: mapping,
      meta: meta,
    };
  }

  static create(data: Monster) {
    return {
      id: data.id,
      name: data.name,
      type: data.type,
      description: data.description,
      picture: data.picture,
      height: data.height,
      weight: data.weight,
      health: data.health,
      attack: data.attack,
      speed: data.speed,
      is_liked: false, // this should be dynamic to user relationship with monster. If a user's catched a pokemon, it should be true. However for the sake of simplicity, i'll make all false
      created_at: FormatedUtil.formatDateTime(data.created_at),
      updated_at: FormatedUtil.formatDateTime(data.updated_at),
    };
  }

  static find(data: Monster) {
    return {
      id: data.id,
      name: data.name,
      type: data.type,
      description: data.description,
      picture: data.picture,
      height: data.height,
      weight: data.weight,
      health: data.health,
      attack: data.attack,
      speed: data.speed,
      is_liked: false, // this should be dynamic to user relationship with monster. If a user's catched a pokemon, it should be true. However for the sake of simplicity, i'll make all false
      created_at: FormatedUtil.formatDateTime(data.created_at),
      updated_at: FormatedUtil.formatDateTime(data.updated_at),
    };
  }

  static update(data: Monster) {
    return {
      id: data.id,
      name: data.name,
      type: data.type,
      description: data.description,
      picture: data.picture,
      height: data.height,
      weight: data.weight,
      health: data.health,
      attack: data.attack,
      speed: data.speed,
      is_liked: false, // this should be dynamic to user relationship with monster. If a user's catched a pokemon, it should be true. However for the sake of simplicity, i'll make all false
      created_at: FormatedUtil.formatDateTime(data.created_at),
      updated_at: FormatedUtil.formatDateTime(data.updated_at),
    };
  }

  static delete(data: Monster) {
    return {};
  }
}
