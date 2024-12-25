// This file is created by egg-ts-helper@1.35.1
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportCard = require('../../../app/controller/card');
import ExportCategory = require('../../../app/controller/category');
import ExportHome = require('../../../app/controller/home');
import ExportUploadIndex = require('../../../app/controller/upload/index');

declare module 'egg' {
  interface IController {
    card: ExportCard;
    category: ExportCategory;
    home: ExportHome;
    upload: {
      index: ExportUploadIndex;
    }
  }
}
