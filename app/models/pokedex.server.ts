interface Response {
  image: string;
  name: string;
  url: string;
}

export function getPeople() {
  return new Promise<Response[]>((resolve) => {
    resolve([
      {
        image: "https://avatars.githubusercontent.com/u/4191549?v=4",
        name: "Lucas Vilaboim",
        url: "http://vilaboim.com/",
      },
      {
        image: "https://avatars.githubusercontent.com/u/4191549?v=4",
        name: "Lucas Vilaboim",
        url: "http://vilaboim.com/",
      },
      {
        image: "https://avatars.githubusercontent.com/u/4191549?v=4",
        name: "Lucas Vilaboim",
        url: "http://vilaboim.com/",
      },
    ]);
  });
}

export function getCompanies() {
  return new Promise<Response[]>((resolve) => {
    resolve([
      {
        image:
          "https://firebasestorage.googleapis.com/v0/b/devfestcerrado2022.appspot.com/o/sponsors%2Fgoogle-developers.png?alt=media",
        name: "Google Developers",
        url: "https://developers.google.com/",
      },
      {
        image:
          "https://firebasestorage.googleapis.com/v0/b/devfestcerrado2022.appspot.com/o/sponsors%2Ftqi.png?alt=media",
        name: "TQI",
        url: "https://www.tqi.com.br/",
      },
      {
        image:
          "https://firebasestorage.googleapis.com/v0/b/devfestcerrado2022.appspot.com/o/sponsors%2Fsankhya.png?alt=media",
        name: "Sankhya",
        url: "https://www.sankhya.com.br/",
      },
    ]);
  });
}
