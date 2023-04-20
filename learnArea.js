const myPromise = new Promise((resolve, reject) => {
  if (true) {
    resolve("stuff worked");
    console.log("It worked");
  } else {
    reject(Error("It broke"));
    console.log("It broke");
  }
});
