export function mapAdminRegisterFormToPayload(form) {
    return {
        userName: form.login,
        password: form.password,
        email: form.email,
        phoneNumber: form.phone,
    };
}
