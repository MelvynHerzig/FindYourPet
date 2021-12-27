import * as errorMessages from "./error-message.ts";

export function manageErrors(errorMessage) {
    switch (errorMessage) {
        case errorMessages.ERROR_LANGUAGE:
            return this.$t("error.langage");
        case errorMessages.ERROR_PASSWORD_CONFIRMATION:
            return this.$t("error.passwordConfirmation");
        case errorMessages.ERROR_INVALID_CREDENTIALS:
            return this.$t("error.credentials");
        case errorMessages.ERROR_USER_ALREADY_EXIST:
            return this.$t("error.userAlreadyExist");
        case errorMessages.ERROR_USER_NOT_FOUND:
            return this.$t("error.userNotFound");
        case errorMessages.ERROR_INVALID_TOKEN:
            return this.$t("error.invalidToken");
        case errorMessages.ERROR_INVALID_ADDRESS:
            return this.$t('error.invalidAddress');
    }
}