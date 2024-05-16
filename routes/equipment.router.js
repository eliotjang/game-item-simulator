import express from 'express';
import Character from '../schemas/characters.schema.js';
import Item from '../schemas/items.schema.js';
import Equipment from '../schemas/equipment.schema.js';
import Joi from 'joi';

const router = express.Router();

const charcaterIdSchema = Joi.object({
  character_id: Joi.number().min(1).max(50).required(),
});

const itemCodeSchema = Joi.object({
  item_code: Joi.number().min(1).required(),
});

// 캐릭터가 장작한 아이템 목록 조회 API
router.get('/equipment/:character_id', async (req, res, next) => {
  try {
    const validateCharacterId = await charcaterIdSchema.validateAsync(
      req.params
    );
    const { character_id } = validateCharacterId;
    const character = await Character.findOne({ character_id }).exec();
    if (!character) {
      return res
        .status(404)
        .json({ errorMessage: '캐릭터 조회에 실패했습니다.' });
    }
    const equipment = await Equipment.findOne({ character_id }).exec();
    if (!equipment) {
      return res
        .status(404)
        .json({ errorMessage: '캐릭터가 장비를 착용하지 않았습니다.' });
    }
    let itemsList = [];
    const itemsCode = equipment.items_code;
    for (let i = 0; i < itemsCode.length; i++) {
      const item_code = itemsCode[i];
      const equipedItem = await Item.findOne({ item_code }).exec();
      const data = {
        item_code,
        item_name: equipedItem.item_name,
      };
      itemsList.push(data);
    }

    return res.status(200).json({ data: itemsList });
  } catch (error) {
    next(error);
  }
});

// 아이템 장착 API
router.post('/equipment/:character_id', async (req, res, next) => {
  try {
    const validateItemCode = await itemCodeSchema.validateAsync(req.body);
    const { item_code } = validateItemCode;
    const validateCharacterId = await charcaterIdSchema.validateAsync(
      req.params
    );
    const { character_id } = validateCharacterId;

    let equipment = await Equipment.findOne({ character_id }).exec();

    if (!equipment) {
      equipment = new Equipment({
        character_id,
        items_code: [item_code],
      });
    } else {
      const foundItem = equipment.items_code.find((itemCode) => {
        return itemCode === item_code;
      });
      if (foundItem) {
        return res
          .status(404)
          .json({ errorMessage: '이미 장착되어 있는 아이템입니다.' });
      }
      equipment.items_code.push(item_code);
    }
    await equipment.save();

    const targetItem = await Item.findOne({ item_code }).exec();
    if (!targetItem) {
      return res
        .status(404)
        .json({ errorMessage: '아이템 조회에 실패했습니다.' });
    }

    const character = await Character.findOne({ character_id }).exec();
    if (!character) {
      return res
        .status(404)
        .json({ errorMessage: '캐릭터 조회에 실패했습니다.' });
    }
    const { name, health, power } = character;
    const base_health = health;
    const base_power = power;

    character.health += targetItem.item_stat.health;
    character.power += targetItem.item_stat.power;
    await character.save();

    return res.status(200).json({
      message: `캐릭터 ${name}의 스탯이 변경되었습니다.`,
      base_stat: {
        base_health,
        base_power,
      },
      changed_stat: {
        health: character.health,
        power: character.power,
      },
    });
  } catch (error) {
    next(error);
  }
});

// 아이템 탈착 API
router.delete('/equipment/:character_id', async (req, res, next) => {
  try {
    const validateItemCode = await itemCodeSchema.validateAsync(req.body);
    const { item_code } = validateItemCode;
    const validateCharacterId = await charcaterIdSchema.validateAsync(
      req.params
    );
    const { character_id } = validateCharacterId;

    const character = await Character.findOne({ character_id }).exec();
    if (!character) {
      return res
        .status(404)
        .json({ errorMessage: '캐릭터 조회에 실패했습니다.' });
    }
    const { name, health, power } = character;
    const base_health = health;
    const base_power = power;

    const equipment = await Equipment.findOne({ character_id }).exec();
    if (!equipment) {
      return res
        .status(404)
        .json({ errorMessage: '캐릭터 장비 조회에 실패했습니다.' });
    } else {
      const foundItem = equipment.items_code.find((itemCode) => {
        return itemCode === item_code;
      });
      if (!foundItem) {
        return res
          .status(404)
          .json({ errorMessage: '장착되어 있지 않은 아이템입니다.' });
      }
    }

    const targetItem = await Item.findOne({ item_code }).exec();
    character.health -= targetItem.item_stat.health;
    character.power -= targetItem.item_stat.power;
    await character.save();

    for (let i = 0; i < equipment.items_code.length; i++) {
      if (equipment.items_code[i] === item_code) {
        equipment.items_code.splice(i, 1);
        break;
      }
    }

    await equipment.save();

    return res.status(200).json({
      message: `캐릭터 ${name}의 스탯이 변경되었습니다.`,
      base_stat: {
        base_health,
        base_power,
      },
      changed_stat: {
        health: character.health,
        power: character.power,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
