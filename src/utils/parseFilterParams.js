const parseType = (type) => {
  return typeof type === 'string' && ['work', 'home', 'personal'].includes(type) ? type : undefined;
};


const parseIsFavourite = (isFavourite, defaultValue = undefined) => {
  return typeof isFavourite === 'string' && (isFavourite === 'true' || isFavourite === 'false')
    ? isFavourite
    : defaultValue;
};

export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const parsedType = parseType(type);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    type: parsedType,
    isFavourite: parsedIsFavourite,
  };
};
