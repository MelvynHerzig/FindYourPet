import i18n from "../i18n.js";

export function verifyPassword(password) {
    const Validation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;
    const valid = Validation.test(password);
    if (!valid) {
        return i18n.global.t('errors.passwordNotCorrect');
    } else {
        return null;
    }
}

export function verifyEmail(email) {
    const Validation = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm;
    const valid = Validation.test(email);
    if (!valid) {
        return i18n.global.t('errors.emailNotCorrect');
    } else {
        return null;
    }
}

export function verifyPhone(phone) {
    const Validation = /^([0][1-9][0-9](\s|)[0-9][0-9][0-9](\s|)[0-9][0-9](\s|)[0-9][0-9])$|^(([0][0]|\+)[1-9][0-9](\s|)[0-9][0-9](\s|)[0-9][0-9][0-9](\s|)[0-9][0-9](\s|)[0-9][0-9])$/gm;
    const valid = Validation.test(phone);
    if (!valid) {
        return i18n.global.t('errors.phoneNotCorrect');
    } else {
        return null;
    }
}