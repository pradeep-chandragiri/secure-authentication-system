export const validateLogin = (formData) => {

    const errors = {};

    // Regex
    const usernameRegex = /^[A-Za-z][A-Za-z0-9._]{6,}[A-Za-z]$/;
    const emailRegex = /^[A-Za-z0-9._]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    // Identifier
    if (!formData.identifier.trim()) {
        errors.identifier = "Email or username is required";
    }
    else if (!emailRegex.test(formData.identifier.trim()) && !usernameRegex.test(formData.identifier.trim())) {
        errors.identifier = "Enter a valid email or username";
    }

    return errors;
};