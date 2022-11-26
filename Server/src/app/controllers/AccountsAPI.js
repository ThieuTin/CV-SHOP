const bcrypt = require('bcrypt');
const { generateToken } = require('../../utils/jwt');
const Account = require('../models/Account');
const mongoose = require('mongoose');
class AccountsAPI {
    // [GET] /accounts/checkExist/:email
    async checkExist(req, res) {
        try {
            const { email } = req.params;
            const accountExisted = await Account.findOne({ email: email });
            res.json({ exist: accountExisted ? true : false });
        } catch (error) {
            console.log(error);
        }
    };

    // [GET] /accounts
    async findAll(req, res) {
        try {
            const accounts = await Account
                .find({});
            res.json(accounts);
        } catch (error) {
            console.log(error);
        }
    };

    async findById(req, res) {
        try {
            const { accountID } = req.params;
            const account = await Account
                .findOne({ _id: accountID })
            res.json(account);
        } catch (error) {
            console.log(error);
        }
    }

    // [GET] /accounts/profile
    async getProfile(req, res) {
        const account = await Account
            .findOne({ _id: req.user._id });
        const { password, ...user } = account.toObject();
        res.json(user);
    };

    // [PATCH] /accounts/profile
    async editProfile(req, res) {
        const account = await Account
            .findByIdAndUpdate(req.user._id, req.body, {
                new: true
            });
        res.json({
            statusText: 'success',
            message: 'Update profile successfully!',
            account
        });
    };

    // [POST] /accounts/login
    async login(req, res) {
        const areFilled = Object.values(req.body).every(field => field !== '');
        if (!areFilled) {
            res.statusMessage = 'Fill all the fields, please!';
            res.status(400).end();
            return;
        }
        try {
            const account = await Account.findOne({ email: req.body.email });
            if (!account) {
                res.statusMessage = 'Wrong email or password!';
                res.status(400).end();
                return;
            }
            const isRightPassword = await bcrypt.compare(req.body.password, account.password);
            if (!isRightPassword) {
                res.statusMessage = 'Wrong email or password!';
                res.status(400).end();
                return;
            }
            const { _id, role } = account;
            const tokens = generateToken({ _id, role });
            account.refreshToken = tokens.refreshToken;
            await account.save();
            res.json({
                role,
                tokens
            });
        } catch (error) {
            console.log(error);
        };
    };

    // [POST] /accounts/register
    async register(req, res) {
        const areFilled = Object.values(req.body).every(field => field !== '');
        if (!areFilled) {
            res.statusMessage = 'Fill all the fields, please!';
            res.status(400).end();
            return;
        }
        try {
            const { email, password, passwordConfirm } = req.body;
            const accountExisted = await Account.findOne({ email: email });
            if (accountExisted) {
                res.statusMessage = 'This account already exists!';
                res.status(400).end();
                return;
            }
            if (password !== passwordConfirm) {
                res.statusMessage = 'Passwords are not synchronous!';
                res.status(400).end();
                return;
            }
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const account = new Account({
                ...req.body,
                password: hashedPassword
            });
            await account.save();
            res.json({
                message: 'Register successfully!'
            });
        } catch (error) {
            console.log(error);
        };
    };
    // [POST] /accounts
    async insert(req, res) {
        try {

            const { password } = req.body;
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const { email, ...accountBody } = req.body;
            const accountExisted = await Account.findOne({ email: email });
            if (accountExisted) {
                res.json({
                    statusText: 'error',
                    message: 'Account is existed'
                });
                console.log('error');
                return;
            }
            const isDeleted = await Account
                .findOneDeleted({ email: email });
            if (isDeleted) {
                res.json({
                    statusText: 'info',
                    message: 'Account is existed in recycle bin',
                    account: isDeleted
                });
                return;
            }
            const account = new Account({
                ...accountBody,
                email,
                password: hashedPassword,
                image: req.file.originalname
            });
            await account.save();
            res.json({
                statusText: 'success',
                message: 'Insert successfully!',
                account
            });
        } catch (error) {
            console.log(error);
        };
    };
    // [PUT] /accounts/:accountID
    async edit(req, res) {
        try {
            const { accountID } = req.params;
            const { email, image, password, ...newBody } = req.body;
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const body = {
                ...newBody
            };
            if (req.file) {
                body.image = req.file.originalname
            }
            const _account = await Account
                .findByIdAndUpdate(accountID, body, {
                    account: true,
                    password: hashedPassword,
                })
            res.json({
                statusText: 'success',
                message: 'Edit Success',
                account: _account
            });
        } catch (error) {
            console.log(error);
        };
    };
    // [DELETE] /accounts/:accountID
    async deletebyID(req, res) {
        try {
            const deletor = mongoose.Types.ObjectId("61af7d561ab0c6ea12eaa560");
            const { accountID } = req.params;
            const result = await Account
                .delete({ _id: accountID }, deletor);
            res.json({
                ...result,
                accountID
            });
        } catch (error) {
            console.log(error);
        };
    };

    // [PATCH] /accounts/:accountID
    async restoreByID(req, res) {
        try {
            const { accountID } = req.params;
            const restoredItem = await Account
                .restore({ _id: accountID });
            res.json({
                statusText: 'success',
                message: 'Restore successfully'
            })
        } catch (error) {
            console.log(error);
        }
    }

    // [DELETE] /accounts/
    async deletedAll(req, res) {
        try {
            const deletor = mongoose.Types.ObjectId("61af7d561ab0c6ea12eaa560");
            const { accountIDs } = req.body;
            const result = await Account
                .delete({ _id: { $in: accountIDs } }, deletor);
            res.json({
                ...result,
                accountIDs
            });
        } catch (error) {
            console.log(error);
        };
    };

    // [POST] /accounts/refreshToken
    async refreshToken(req, res) {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) return res.sendStatus(401);
            const account = await Account
                .findOne({
                    refreshToken
                });
            if (!account) return res.sendStatus(403);
            const { _id, role } = account;
            const tokens = generateToken({ _id, role });
            account.refreshToken = tokens.refreshToken;
            await account.save();
            res.json(tokens);
        } catch (error) {
            console.log(error);
        }
    };
};

module.exports = new AccountsAPI;
