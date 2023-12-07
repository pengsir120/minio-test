const express = require('express');
const Minio = require('minio');
const bodyParser = require('body-parser'); // 解析 req.body
const multer = require('multer');//formdata数据处理
const cors = require('cors'); //设置允许跨域
const upload = multer();
const { accessKey, secretKey } = require('./config/config.default')

const minioClient = new Minio.Client({
  endPoint: '127.0.0.1',
  port: 9000,
  useSSL: false,
  accessKey,
  secretKey
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file; // 获取上传文件
    const fileArr = file.originalname.split('.')
    const mimeType = fileArr[fileArr.length - 1]
    const bucketName = 'test'; //自己创建的桶名
    const objectName = `${Date.now()}.${mimeType}`; // 设置对象名称
    const data = await minioClient.putObject(bucketName, objectName, file.buffer); // 上传到MinIO
    console.log(data);
    res.send({
      code: 200,
      url: `http://127.0.0.1:9000/${bucketName}/${objectName}`, // 返回访问URL
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(8808, () => {
  console.log('listening on port 8808');
});

