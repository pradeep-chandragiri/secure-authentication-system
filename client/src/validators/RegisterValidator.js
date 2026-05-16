export const validateRegister = (formData) => {

    const errors = {};

    // Regex
    const nameRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
    const usernameRegex = /^[A-Za-z][A-Za-z0-9._]{6,}[A-Za-z]$/;
    const emailRegex = /^[A-Za-z0-9._]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_#^()[\]{}\-+=~`|:;"'<>,./\\])[A-Za-z\d@$!%*?&_#^()[\]{}\-+=~`|:;"'<>,./\\]{8,64}$/;

    // Name
    if (!formData.name.trim()) {
        errors.name = "Full name is required";
    }
    else if (formData.name.trim().length < 8) {
        errors.name = "Name must contain at least 8 characters";
    }
    else if (!nameRegex.test(formData.name.trim())) {
        errors.name = "Only alphabets and single spaces are allowed";
    }

    // Username
    if (!formData.username.trim()) {
        errors.username = "Username is required";
    }
    else if (formData.username.trim().length < 8) {
        errors.username = "Username must contain at least 8 characters";
    }
    else if (formData.username.includes(" ")) {
        errors.username = "Username must not contain spaces";
    }
    else if (!usernameRegex.test(formData.username.trim())) {
        errors.username =
            "Username must start/end with letters and can contain 0-9, . or _";
    }

    // Email
    if (!formData.email.trim()) {
        errors.email = "Email is required";
    }
    else if (!emailRegex.test(formData.email.trim())) {
        errors.email = "Enter a valid email address";
    }

    // Password
    if (!formData.password.trim()) {
        errors.password = "Password is required";
    }
    else if (!passwordRegex.test(formData.password)) {
        errors.password =
            "Password must contain uppercase, lowercase, number, special character and be 8-64 characters long";
    }

    return errors;
};


export const passwordValidate = (password) => {

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_#^()[\]{}\-+=~`|:;"'<>,./\\])[A-Za-z\d@$!%*?&_#^()[\]{}\-+=~`|:;"'<>,./\\]{8,64}$/;

    if (!password.trim()) {
        setError('New password is required');
        return false;
    }

    if (password.length < 8) {
        setError('Password must be at least 8 characters');
        return false;
    }

    if (password.length > 64) {
        setError('Password must be under 64 characters');
        return false;
    }

    if (!/[a-z]/.test(password)) {
        setError('Password must include at least one lowercase letter');
        return false;
    }

    if (!/[A-Z]/.test(password)) {
        setError('Password must include at least one uppercase letter');
        return false;
    }

    if (!/\d/.test(password)) {
        setError('Password must include at least one number');
        return false;
    }

    if (!/[@$!%*?&_#^()[\]{}\-+=~`|:;"'<>,./\\]/.test(password)) {
        setError('Password must include at least one special character');
        return false;
    }

    if (!passwordRegex.test(password)) {
        setError('Password does not meet the required format');
        return false;
    }

    return null;
};