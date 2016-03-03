var express = require('express');
var router = express.Router();
var asset =  require('../local_controllers/assetTypeController');


//set routes for asset
router.get('/', asset.list); // list all assets
router.get('/:id', asset.view); // view individual asset
router.put('/:id', asset.update); // update an asset
router.post('/:id', asset.delete);



module.exports = router;
