export const distinguishImage = (image, characters = ['https', 'http']) => {
  const isExternalCloud = characters.some((character) => image.indexOf(character) >= 0);
  return isExternalCloud ? image : `${process.env.REACT_APP_IMAGE_URL}/${image}`;
};
