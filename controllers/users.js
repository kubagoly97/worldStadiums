const User = require('../models/user');

module.exports.renderRegisterPage = (req, res) => {
    res.render('users/register')
};

module.exports.registerUser = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', `Welcome to World Stadiums, ${req.user.username.toUpperCase()}`);
            res.redirect('/stadiums')
        });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register')
    }
};

module.exports.loginPage = (req, res) => {
    res.render('users/login');
};

module.exports.getLogin = (req, res) => {
    req.flash('success', `Welcome back, ${req.user.username.toUpperCase()}`);
    const redirectUrl = res.locals.returnTo || '/stadiums';
    res.redirect(redirectUrl)
};

module.exports.getLogout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'You are loged out')
        res.redirect('/stadiums')
    })
}