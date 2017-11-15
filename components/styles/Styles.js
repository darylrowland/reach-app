const COLOURS = {
    white: "#ffffff",
    black: "#1D1D1D",
    border: "#121212",
    primary: "#F08D1A",
    lightText: "#95989A",
    lightBackground: "#e5e5e5"
};

const FONTS = {
    bold: "NeuzeitGro-Bol",
    black: "NeuzeitGro-Bla",
    default: "Neuzeit Grotesk"
};

module.exports = {
    activeOpacity: 0.9,
    hitSlop: {left: 20, right: 20, bottom: 20, top: 20},
    colours: COLOURS,
    fonts: FONTS,
    styles: {
        content: {
            padding: 30
        },
        mediumTitle: {
            fontSize: 36,
            lineHeight: 36,
            color: COLOURS.black,
            fontFamily: FONTS.bold,
            marginBottom: 10
        },
        smallTitle: {
            fontSize: 28,
            lineHeight: 28,
            color: COLOURS.black,
            fontFamily: FONTS.bold
        },
        description: {
            marginTop: 20,
            fontSize: 18,
            color: COLOURS.black,
            fontFamily: FONTS.default
        },
        content: {
            flex: 1,
            padding: 30
        }
    }
}; 