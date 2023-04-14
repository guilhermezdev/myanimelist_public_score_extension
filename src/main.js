const setupPublicScoreColumn = () => {
  const publicScoreHeaderTitle =
    '<th class="header-title public-score"> <a  class="link sort"> Public Score </a> </th>';
  $("th.header-title.score").after(publicScoreHeaderTitle);
};

const clearCache = () => {
  localStorage.clear();
};

const extractAnimeMangaEntry = () => {};

const fetchPublicScores = () => {
  const animesRawList = $("tbody.list-item");

  for (const anime of animesRawList) {
    const animeUrl = $(anime).find("td.title > a").attr("href");

    var publicScoreElement = $(anime).find("td.public-score");

    if (publicScoreElement.length === 0) {
      $(anime).find("td.score").after(`<td class="data public-score"> - </td>`);
      publicScoreElement = $(anime).find("td.public-score");
    }

    const valueInCache = localStorage.getItem(animeUrl);

    if (valueInCache != null) {
      $(publicScoreElement).text(valueInCache);
    } else {
      $.get(`https://myanimelist.net/${animeUrl}`, (result) => {
        const score = $(result).find(".score").text().trim();
        localStorage.setItem(animeUrl, score);
        $(publicScoreElement).text(score);
      });
    }
  }
};

const init = () => {
  setupPublicScoreColumn();
  fetchPublicScores();
};

init();
