// utils/formatActivity.js

const formatActionType = (action) => {
    return action
        .split("_")
        .map(word => word.charAt(0) + word.slice(1).toLowerCase())
        .join(" ");
};

const formatUserAgent = (ua) => {
    if (!ua) return "Unknown";
    if (ua.includes("PostmanRuntime")) return "Postman";
    if (ua.includes("insomnia")) return "Insomnia";

    const browserMap = [
        { key: "Edg/",    label: "Edge"    },
        { key: "OPR/",    label: "Opera"   },
        { key: "Chrome/", label: "Chrome"  },
        { key: "Firefox/",label: "Firefox" },
        { key: "Safari/", label: "Safari"  },
    ];

    const osMap = [
        { key: "Windows NT", label: "Windows" },
        { key: "Macintosh",  label: "Mac"     },
        { key: "Linux",      label: "Linux"   },
        { key: "Android",    label: "Android" },
        { key: "iPhone",     label: "iOS"     },
    ];

    const browser = browserMap.find(b => ua.includes(b.key))?.label || "Unknown Browser";
    const os      = osMap.find(o => ua.includes(o.key))?.label      || "Unknown OS";

    return `${browser} on ${os}`;
};

const formatIp = (ip) => {
    if (!ip || ip === "::1" || ip === "127.0.0.1") return "Localhost";
    if (ip === "Unknown") return "Unknown";
    return ip;
};

// highlight-start
const formatDate = (timestamp) => {
    if (!timestamp) return "Unknown";

    const date = new Date(timestamp);
    const now  = new Date();
    const diffMs   = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHrs  = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1)   return "Just now";
    if (diffMins < 60)  return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
    if (diffHrs  < 24)  return `${diffHrs} hour${diffHrs > 1 ? "s" : ""} ago`;
    if (diffDays < 7)   return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;

    return date.toLocaleDateString("en-IN", {
        day:   "numeric",
        month: "short",
        year:  "numeric",
    });
};

export const formatActivity = (activities) => {
    return activities.map(({ action_type, description, ip_address, user_agent, created_at }) => ({
        action:      formatActionType(action_type),
        description,
        ip:          formatIp(ip_address),
        device:      formatUserAgent(user_agent),
        initiated_at:        formatDate(created_at),
    }));
};