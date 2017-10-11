/** This server will be domicile in the engines route */
import express from 'express';
import dotenv from 'dotenv';
import multer from 'multer';
import fileSystem from 'fs';
import Promise from 'promise';
import bodyParser from 'body-parser';
import deleter from 'del';
import InvertedIndex from '../src/inverted-index';

const runApps = new InvertedIndex();

dotenv.config();

const upload = multer({ dest: 'fixtures/uploads' });
const port = process.env.PORT;
const app = express();

app.use('/api/search', bodyParser.urlencoded({ extended: false }));
app.use('/api/search', bodyParser.json());

app.post('/api/create', upload.array('file'), (req, res) => {
  const books = req.files;
  let content;
  let fileName;
  const populateIndex = () =>
    new Promise((resolve, reject) => {
      books.forEach((book) => {
        fileSystem.readFile(book.path, 'utf8', (err, data) => {
          if (err) {
            res.send(err.message);
          } else {
            fileName = book.originalname;
            try {
              content = JSON.parse(data);
              runApps.createIndex(fileName, content);
              resolve();
            } catch (err) {
              if (err instanceof SyntaxError) {
                reject('Not a JSON file');
              } else if (err instanceof TypeError) {
                reject('Malformed file');
              } else {
                reject(err.message);
              }
            } finally {
              deleter('fixtures/uploads*');
            }
          }
        });
      });
    });
  populateIndex().then(() => {
    if (req.files.length === 1) {
      res.status(200).json(runApps.indices[fileName]);
    } else {
      res.status(200).json(runApps.indices);
    }
  }).catch((fromReject) => {
    res.status(400).send(fromReject);
  });
});
app.post('/api/search', (req, res) => {
  const indices = runApps.indices;
  let result;
  const searchTerms = InvertedIndex.arrayFromText(req.body.terms);
  const search = () =>
    new Promise((resolve, reject) => {
      if (Object.keys(indices).length > 0) {
        result = InvertedIndex.searchIndex(indices, searchTerms);
        resolve(result);
      } else {
        reject('Create index first!');
      }
    });
  search().then((fromResolve) => {
    res.status(200).json(fromResolve);
  }).catch((fromReject) => {
    res.send(fromReject);
  });
});

app.all('*', (req, res) => {
  res.status(400).send('400 Bad Request');
});
app.listen(port);
