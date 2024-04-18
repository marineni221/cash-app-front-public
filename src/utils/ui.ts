

// export const IMAGES = {
//     bg4:  require('../assets/auth/bg4.jpg'),
//     authBg: require('../assets/auth/auth-bg.png'),
//     google: require('../assets/icons/social/google.png'),
//     verifyEmail: require('../assets/auth/please-verify-your-email.png'),
// };

export const COLORS = {
    primary: "#1b84ff",
    secondary: "#9CA3AF",
    borderColor: "#CBD5FF",
    gray: "#9CA3AF",
}

export const styles = {
    primaryText: `text-[${COLORS.primary}]`,
    primaryBg: `bg-[${COLORS.primary}]`,
    secondaryText: `text-[${COLORS.secondary}]`,
};

export interface StatusColors {
    success: { textColor: string; bgColor: string };
    pending: { textColor: string; bgColor: string };
    inprogress: { textColor: string; bgColor: string };
    failed: { textColor: string; bgColor: string };
}

export const statusColors = {
    success: {
        textColor: "#1b85ff",
        bgColor: "#EBF5FB",
    },
    pending: {
        textColor: "#ffb703",
        bgColor: "#FEF9E7",
    },
    inprogress: {
        textColor: "#ffb703",
        bgColor: "#FEF9E7",
    },
    failed: {
        textColor: "#E74C3C",
        bgColor: "#FDEDEC",
    },
};
