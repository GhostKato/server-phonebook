const parseIsFavourite = (isFavourite, defaultValue = undefined) => {
  return typeof isFavourite === 'string' && (isFavourite === 'true' || isFavourite === 'false')
    ? isFavourite
    : defaultValue;
};

export const parseFilterParams = (query) => {
  const { isFavourite } = query;

  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    isFavourite: parsedIsFavourite,
  };
};
