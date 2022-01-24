import * as errorMessages from "./error-message.ts";
import i18n from "../i18n.js";
import {destroyMemberToken} from "@/logic/apicalls";


export function manageErrors(error) {
    if(error.status === 401) {
        destroyMemberToken();
        this.$store.commit('disconnect');
        this.$router.push('/login');
        return;
    }
    if(error.status === 400) {
        switch (error.message) {
            case errorMessages.ERROR_LANGUAGE:
                return i18n.global.t('errors.language');
            case errorMessages.ERROR_PASSWORD_CONFIRMATION:
                return i18n.global.t('errors.passwordConfirmation');
            case errorMessages.ERROR_INVALID_CREDENTIALS:
                return i18n.global.t('errors.credentials');
            case errorMessages.ERROR_INVALID_PASSWORD:
                return i18n.global.t('errors.passwordNotCorrect');
            case errorMessages.ERROR_NOT_AUTHORIZED:
                return i18n.global.t('errors.notAuthorized');
            case errorMessages.ERROR_USER_ALREADY_EXIST:
                return i18n.global.t('errors.userAlreadyExist');
            case errorMessages.ERROR_USER_NOT_FOUND:
                return i18n.global.t('errors.userNotFound');
            case errorMessages.ERROR_INVALID_EMAIL_FORMAT:
                return i18n.global.t('errors.emailNotCorrect');
            case errorMessages.ERROR_INVALID_PHONE_FORMAT:
                return i18n.global.t('errors.phoneNotCorrect');
            case errorMessages.ERROR_INVALID_ADDRESS:
                return i18n.global.t('errors.invalidAddress');
            case errorMessages.ERROR_INVALID_TOKEN:
                return i18n.global.t('errors.invalidToken');
            case errorMessages.ERROR_INVALID_SPECIES:
                return i18n.global.t('errors.specieNotCorrect');
            case errorMessages.ERROR_SPECIES_NOT_CREATED:
                return i18n.global.t('errors.specieNotCreated');
            case errorMessages.FILTER_INVALID_SPECIES:
                return i18n.global.t('errors.specieNotCorrect');
            case errorMessages.FILTER_INVALID_PET_MIN_AGE:
                return i18n.global.t('errors.minAgeNotCorrect');
            case errorMessages.FILTER_INVALID_PET_MAX_AGE:
                return i18n.global.t('errors.maxAgeNotCorrect');
            case errorMessages.FILTER_INVALID_RADIUS:
                return i18n.global.t('errors.radiusNotCorrect');
            case errorMessages.FILTER_INVALID_GENDER:
                return i18n.global.t('errors.genderNotCorrect');
            case errorMessages.FILTER_INVALID_PAGE:
                return i18n.global.t('errors.pageNotCorrect');
            case errorMessages.ERROR_ADVERT_NOT_FOUND:
                return i18n.global.t('errors.advertNotFound');
            case errorMessages.ERROR_ADVERT_NOT_CREATED:
                return i18n.global.t('errors.advertNotCreated');
            case errorMessages.ERROR_FILE_NOT_FOUND:
                return i18n.global.t('errors.fileNotFound');
            case errorMessages.ERROR_FILE_NOT_UPLOADED:
                return i18n.global.t('errors.fileNotUploaded');
        }
        return this.$t('errors.unknown');
    }
}