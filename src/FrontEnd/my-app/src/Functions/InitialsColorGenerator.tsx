export const initialsColorGenerator = () => {
    const minColorValue = 100;

    const randomColorComponent = () => {
      return Math.floor(Math.random() * (256 - minColorValue)) + minColorValue;
    };

    const red = randomColorComponent().toString(16);
    const green = randomColorComponent().toString(16);
    const blue = randomColorComponent().toString(16);

    return `#${red}${green}${blue}`;
  };