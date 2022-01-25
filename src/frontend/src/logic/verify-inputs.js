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

export function verifyGender(gender) {
    if(gender !== i18n.global.t('ad_create.male') && gender !== i18n.global.t('ad_create.female')) {
        return i18n.global.t('errors.genderNotCorrect');
    } else {
        return null;
    }
}

export function verifyAge(age) {
    if(!isInRange(age, 0, 1200)) {
        return i18n.global.t('errors.ageNotCorrect');
    } else {
        return null;
    }
}

export function verifyMinAge(age) {
    if(!isInRange(age, 0, 1200)) {
        return i18n.global.t('errors.minAgeNotCorrect');
    } else {
        return null;
    }
}

export function verifyMaxAge(age) {
    if(!isInRange(age, 0, 1200)) {
        return i18n.global.t('errors.maxAgeNotCorrect');
    } else {
        return null;
    }
}

export function verifyDistance(distance) {
    if(!isInRange(distance, 0, 1000000)) {
        return i18n.global.t('errors.distanceNotCorrect');
    } else {
        return null;
    }
}

export function verifyImage(image) {
    const Validation = /([^\s]+(\.(?i)(jpg|png|gif|bmp))$)/;
    const valid = Validation.test(image);
    if (!valid) {
        return i18n.global.t('errors.imageNotCorrect');
    } else {
        return null;
    }
}

export function isEmpty(value) {
    return value === "" || value == null;
}

function isInRange(value, min, max) {
    return value >= min && value <= max;
}