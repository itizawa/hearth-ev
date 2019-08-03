const orderByDate = (a, b) => {
  let r = 0;
  if (a.timestamp < b.timestamp) {
    r = -1;
  } else if (a.timestamp > b.timestamp) {
    r = 1;
  }

  return -1 * r;
};

export default orderByDate;
