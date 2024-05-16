export default function (err, req, res, next) {
  console.log(err.code);
  //console.log(err.message);

  // 400 body를 입력받지 못한 경우
  if (err.name === 'ValidationError') {
    //return res.status(400).json({ errorMessage: err.message });
    return res
      .status(400)
      .json({ errorMessage: '데이터 형식이 올바르지 않습니다.' });
  }
  // mongoose에서 정의한 field가 중복된 경우
  if (err.code === 11000) {
    return res
      .status(409)
      .json({ errorMessage: '아이템 고유 코드가 중복되었습니다.' });
  }

  return res.status(500).json({ errorMessage: '서버에서 에러 발생' });
}
