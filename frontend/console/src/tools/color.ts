export function ConvertColorToTranslucent(
    color: string,
    opacity: number = 0.3,
): string {
    const hex = color.replace(/^#/, "");

    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export function getRandomColor() {
    const colors = [
        "magenta",
        "red",
        "volcano",
        "orange",
        "gold",
        "lime",
        "green",
        "cyan",
        "blue",
        "geekblue",
        "purple",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}
