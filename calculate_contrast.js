
function hslToRgb(h, s, l) {
    s /= 100;
    l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n =>
        l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [255 * f(0), 255 * f(8), 255 * f(4)];
}

function luminance(r, g, b) {
    const a = [r, g, b].map(v => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function contrast(rgb1, rgb2) {
    const lum1 = luminance(rgb1[0], rgb1[1], rgb1[2]);
    const lum2 = luminance(rgb2[0], rgb2[1], rgb2[2]);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
}

const colors = {
    background: [270, 60, 98],
    foreground: [270, 40, 25],
    muted: [270, 40, 93],
    mutedForeground: [270, 20, 45],
    primary: [280, 85, 58], // Updated to 58% lightness
    primaryForeground: [280, 15, 99],
    card: [280, 50, 97],
    cardForeground: [270, 30, 20],
    secondary: [160, 45, 90],
    secondaryForeground: [270, 30, 20],
    accent: [180, 65, 88],
    accentForeground: [270, 30, 18],
    destructive: [350, 75, 56], // Updated to 56% lightness
    destructiveForeground: [0, 10, 99],
};

const pairs = [
    ["Foreground on Background", "foreground", "background"],
    ["Muted Foreground on Background", "mutedForeground", "background"],
    ["Primary Foreground on Primary", "primaryForeground", "primary"],
    ["Secondary Foreground on Secondary", "secondaryForeground", "secondary"],
    ["Accent Foreground on Accent", "accentForeground", "accent"],
    ["Destructive Foreground on Destructive", "destructiveForeground", "destructive"],
    ["Card Foreground on Card", "cardForeground", "card"],
];

console.log("Contrast Ratios (WCAG 2.1):");
console.log("Min AA Normal: 4.5:1, Large: 3:1");
console.log("------------------------------------------------");

pairs.forEach(([name, fg, bg]) => {
    const rgb1 = hslToRgb(...colors[fg]);
    const rgb2 = hslToRgb(...colors[bg]);
    const ratio = contrast(rgb1, rgb2).toFixed(2);
    const passAA = ratio >= 4.5 ? "PASS" : "FAIL";
    const passAALarge = ratio >= 3.0 ? "PASS" : "FAIL";
    console.log(`${name}: ${ratio}:1 [AA: ${passAA}] [Large: ${passAALarge}]`);
});
