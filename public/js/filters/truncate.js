app.filter("truncate", function () {
  return function (description) {
    return description.slice(0, 10) + "...";
  };
});
