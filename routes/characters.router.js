import express from 'express';
import Character from '../schemas/characters.schema.js';
import Joi from 'joi';

const createCharacterSchema = Joi.object({
  name: Joi.string().min(1).max(50).required(),
});
const getOrDeleteCharacterSchema = Joi.object({
  character_id: Joi.number().min(1).required(),
});

const router = express.Router();

// 캐릭터 생성 API
router.post('/characters', async (req, res, next) => {
  try {
    const validation = await createCharacterSchema.validateAsync(req.body);
    const { name } = validation;

    const maxCharacterId = await Character.findOne()
      .sort('-character_id')
      .exec();
    const characterId = maxCharacterId ? maxCharacterId.character_id + 1 : 1;
    const character = new Character({
      character_id: characterId,
      name,
    });

    await character.save();

    return res.status(201).json({
      message: `새로운 캐릭터 ${name}을(를) 생성했습니다.`,
      data: {
        character_id: characterId,
      },
    });
  } catch (error) {
    next(error);
  }
});

// 캐릭터 전체 조회 API
router.get('/characters', async (req, res) => {
  const characters = await Character.find().sort('-character_id').exec();
  let charactersList = [];
  characters.forEach((characterData) => {
    const { character_id, name, health, power } = characterData;
    const data = {
      character_id,
      name,
      health,
      power,
    };
    charactersList.push(data);
  });
  return res.status(200).json({ data: charactersList });
});

// 캐릭터 상세 조회 API
router.get('/characters/:character_id', async (req, res, next) => {
  try {
    const validation = await getOrDeleteCharacterSchema.validateAsync(
      req.params
    );
    const { character_id } = validation;
    const character = await Character.find({ character_id }).exec();
    if (!character[0]) {
      return res
        .status(404)
        .json({ errorMessage: '캐릭터 조회에 실패했습니다.' });
    }
    const { name, health, power } = character[0];
    return res.status(200).json({
      data: {
        character_id: parseInt(character_id),
        name,
        health,
        power,
      },
    });
  } catch (error) {
    next(error);
  }
});

// 캐릭터 삭제 API
router.delete('/characters/:character_id', async (req, res, next) => {
  try {
    const validation = await getOrDeleteCharacterSchema.validateAsync(
      req.params
    );
    const { character_id } = validation;
    const character = await Character.find({ character_id }).exec();
    if (!character[0]) {
      return res
        .status(404)
        .json({ errorMessage: '캐릭터 조회에 실패했습니다.' });
    }
    const { name } = character[0];
    await Character.deleteOne({ character_id }).exec();

    return res.status(200).json({
      message: `캐릭터 ${name}을(를) 삭제했습니다.`,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
