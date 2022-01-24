import * as errorMessages from "./error-message.ts";
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
                return this.$t('errors.language');
            case errorMessages.ERROR_PASSWORD_CONFIRMATION:
                return this.$t('errors.passwordConfirmation');
            case errorMessages.ERROR_INVALID_CREDENTIALS:
                return this.$t('errors.credentials');
            case errorMessages.ERROR_INVALID_PASSWORD:
                return this.$t('errors.passwordNotCorrect');
            case errorMessages.ERROR_NOT_AUTHORIZED:
                return this.$t('errors.notAuthorized');
            case errorMessages.ERROR_USER_ALREADY_EXIST:
                return this.$t('errors.userAlreadyExist');
            case errorMessages.ERROR_USER_NOT_FOUND:
                return this.$t('errors.userNotFound');
            case errorMessages.ERROR_INVALID_EMAIL_FORMAT:
                return this.$t('errors.emailNotCorrect');
            case errorMessages.ERROR_INVALID_PHONE_FORMAT:
                return this.$t('errors.phoneNotCorrect');
            case errorMessages.ERROR_INVALID_ADDRESS:
                return this.$t('errors.invalidAddress');
            case errorMessages.ERROR_INVALID_TOKEN:
                return this.$t('errors.invalidToken');
            case errorMessages.ERROR_INVALID_SPECIES:
                return this.$t('errors.specieNotCorrect');
            case errorMessages.ERROR_SPECIES_NOT_CREATED:
                return this.$t('errors.specieNotCreated');
            case errorMessages.FILTER_INVALID_SPECIES:
                return this.$t('errors.specieNotCorrect');
            case errorMessages.FILTER_INVALID_PET_MIN_AGE:
                return this.$t('errors.minAgeNotCorrect');
            case errorMessages.FILTER_INVALID_PET_MAX_AGE:
                return this.$t('errors.maxAgeNotCorrect');
            case errorMessages.FILTER_INVALID_RADIUS:
                return this.$t('errors.radiusNotCorrect');
            case errorMessages.FILTER_INVALID_GENDER:
                return this.$t('errors.genderNotCorrect');
            case errorMessages.FILTER_INVALID_PAGE:
                return this.$t('errors.pageNotCorrect');
            case errorMessages.ERROR_ADVERT_NOT_FOUND:
                return this.$t('errors.advertNotFound');
            case errorMessages.ERROR_ADVERT_NOT_CREATED:
                return this.$t('errors.advertNotCreated');
            case errorMessages.ERROR_FILE_NOT_FOUND:
                return this.$t('errors.fileNotFound');
            case errorMessages.ERROR_FILE_NOT_UPLOADED:
                return this.$t('errors.fileNotUploaded');
        }
        return this.$t('errors.unknown');
    }
}