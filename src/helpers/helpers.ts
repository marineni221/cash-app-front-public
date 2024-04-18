export function countdown(minutes: number) {
    let seconds = minutes * 60;

    const timerInterval = setInterval(() => {
        const minutesRemaining = Math.floor(seconds / 60);
        const secondsRemaining = seconds % 60;

        console.log(
            `${minutesRemaining}:${secondsRemaining < 10 ? "0" : ""
            }${secondsRemaining}`
        );

        if (seconds === 0) {
            clearInterval(timerInterval);
            console.log("Temps écoulé !");
        } else {
            seconds--;
        }
    }, 1000);
}

export interface PasswordValidation {
    size: boolean;
    digits: boolean;
    lower: boolean;
    upper: boolean;
    specialChar: boolean;
}

export const validatePassword = (password: string): PasswordValidation => {
    const errors: PasswordValidation = {
        size: false,
        digits: false,
        lower: false,
        upper: false,
        specialChar: false,
    };


    if (password.length < 8 || password.length > 64) {
        errors.size = false;
    } else {
        errors.size = true;
    }

    if (!/\d/.test(password)) {
        errors.digits = false;
    } else {
        errors.digits = true;
    }

    if (!/[a-z]/.test(password)) {
        errors.lower = false;
    } else {
        errors.lower = true;
    }

    if (!/[A-Z]/.test(password)) {
        errors.upper = false;
    } else {
        errors.upper = true;
    }

    if (!/[^\w\s]/.test(password)) {
        errors.specialChar = false;
    } else {
        errors.specialChar = true;
    }

    return errors;
};

export function bytesToMegabytes(bytes: number): number {
    return bytes / (1024 * 1024);
}

export function bytesToKilobytes(bytes: number): number {
    return bytes / 1024;
}

export const formatAmount = (amount: string) => {
    const amountString = unFormatAmmount(amount);

    if (amountString.length > 3) {
        let finalAmount = '';
        const reverseString = amountString.split('').reverse().join('');
        let resetedString = '';
        for (const char of reverseString) {
            finalAmount += char;
            resetedString = finalAmount.split(' ').join('');
            if (resetedString.length % 3 === 0) {
                finalAmount += ' ';
            }
        }

        if (finalAmount.split(' ').join('').length % 3 === 0) {
            finalAmount = finalAmount.split('').reverse().join('').slice(1);
            return finalAmount;
        }
        return finalAmount.split('').reverse().join('');
    }
    return amountString;
};

export const unFormatAmmount = (amountFormatted: string) => {
    return String(amountFormatted).split(' ').join('');
};

export interface StatusTexts {
    success: string;
    pending: string;
    inprogress: string;
    failed: string;
}

export const statusTexts : StatusTexts = {
    success: "Success",
    pending: "Pending",
    inprogress: "In Progress",
    failed: "Failed",
};
