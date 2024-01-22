interface Theme {
    primary: string
    background: string
    text: string,
    label: string,
    bottomSheet: string,
}

const darkTheme: Theme = {
    primary: '#d47204',
    background: "#000000",
    text: "#ffffff",
    label: '#ababab',
    bottomSheet: '#212121',
}

export {darkTheme};
export default Theme;