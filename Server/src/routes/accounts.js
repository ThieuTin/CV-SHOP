const express = require('express');
const router = express.Router();

// Controllers
const accountsAPI = require('../app/controllers/AccountsAPI');
// Middlewares
const verifyToken = require('../app/middlewares/verifyToken');
const upload = require('../app/middlewares/upload');


router.get('/verify', verifyToken, (req, res) => {
    res.json(!!req.user._id);
});
router.get('/role-guard', verifyToken, (req, res) => {
    res.json(req.user.role);
});
router.delete('/:accountID', accountsAPI.deletebyID);
router.put('/:accountID', upload.single('image'), accountsAPI.edit);
router.patch('/profile', verifyToken, accountsAPI.editProfile);
router.patch('/:accountID', accountsAPI.restoreByID);
router.patch('/', accountsAPI.deletedAll);
router.post('/refreshToken', accountsAPI.refreshToken);
router.post('/login', accountsAPI.login);
router.post('/register', accountsAPI.register);
router.post('/', upload.single('image'), accountsAPI.insert);
router.get('/profile', verifyToken, accountsAPI.getProfile);
router.get('/checkExist/:email', accountsAPI.checkExist);
router.get('/:accountID', accountsAPI.findById);
router.get('/', accountsAPI.findAll);

module.exports = router;
