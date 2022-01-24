

export function verifyPassword() {
    const Validation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;
    const valid = Validation.test(this.password);
    if (!valid) {
        return this.$t('errors.passwordNotCorrect');
    } else {
        return null;
    }
}

export function verifyEmail() {
    const Validation = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm;
    const valid = Validation.test(this.email);
    if (!valid) {
        return this.$t('errors.emailNotCorrect');
    } else {
        return null;
    }
}