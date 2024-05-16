import express from 'express';
import Item from '../schemas/items.schema.js';
import Joi from 'joi';

const createItemSchema = Joi.object({
  item_code: Joi.number().min(1).required(),
  item_name: Joi.string().min(1).max(50).required(),
  item_stat: Joi.object(),
});

const patchItemSchema = Joi.object({
  item_name: Joi.string().min(1).max(50).required(),
  item_stat: Joi.object(),
});

const checkCodeSchema = Joi.object({
  item_code: Joi.number().min(1).required(),
});

const router = express.Router();

// 아이템 생성 API
router.post('/items', async (req, res, next) => {
  try {
    const validation = await createItemSchema.validateAsync(req.body);
    const { item_code, item_name, item_stat } = validation;

    const item = new Item({
      item_code,
      item_name,
      item_stat,
    });

    await item.save();

    return res.status(201).json({
      message: `새로운 아이템 ${item_name}을(를) 생성했습니다.`,
      data: {
        item_code,
      },
    });
  } catch (error) {
    next(error);
  }
});

// 아이템 수정 API
router.patch('/items/:item_code', async (req, res, next) => {
  try {
    const validation = await patchItemSchema.validateAsync(req.body);
    const checkCode = await checkCodeSchema.validateAsync(req.params);
    const { item_code } = checkCode;
    const { item_name, item_stat } = validation;

    const targetItem = await Item.findOne({ item_code }).exec();
    if (!targetItem) {
      return res
        .status(404)
        .json({ errorMessage: '아이템 조회에 실패했습니다.' });
    }
    const base_name = targetItem.item_name;
    // 깊은 복사 사용
    const base_stat = JSON.parse(JSON.stringify(targetItem.item_stat));
    targetItem.item_name = item_name;
    targetItem.item_stat = item_stat;

    await targetItem.save();

    return res.status(200).json({
      message: `기존 아이템 ${base_name}이(가) 수정되었습니다.`,
      base_data: {
        base_name,
        base_stat,
      },
      patched_ata: {
        item_name: targetItem.item_name,
        item_stat: targetItem.item_stat,
      },
    });
  } catch (error) {
    next(error);
  }
});

// 아이템 목록 조회 API
router.get('/items', async (req, res) => {
  const items = await Item.find().sort('-item_code').exec();
  let itemsList = [];
  items.forEach((itemData) => {
    const { item_code, item_name } = itemData;
    const data = {
      item_code,
      item_name,
    };
    itemsList.push(data);
  });

  return res.status(200).json({ data: itemsList });
});

// 아이템 상세 조회 API
router.get('/items/:item_code', async (req, res, next) => {
  try {
    const validation = await checkCodeSchema.validateAsync(req.params);
    const { item_code } = validation;

    const targetItem = await Item.find({ item_code }).exec();
    if (!targetItem[0]) {
      return res
        .status(404)
        .json({ errorMessage: '아이템 조회에 실패했습니다.' });
    }
    const { item_name, item_stat } = targetItem[0];
    return res.status(200).json({
      data: {
        item_code,
        item_name,
        item_stat,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
