const navItems = document.querySelectorAll('.nav__item');
const stats = document.querySelectorAll('.card__content--stats');

// Fetch data from data.json
const getData = async () => {
  const res = await fetch('./data/data.json');
  const data = await res.json();

  return data;
};

// Loop through and add event listener to nav items
navItems.forEach(item => {
  item.addEventListener('click', e => {
    const prevItem = document.querySelector('.active');

    if (item) prevItem.classList.remove('active');
    e.target.classList.add('active');
    // Loop data and update HTML
    getData().then(data => {
      data.forEach(({ title, timeframes }) => {
        stats.forEach(stat => {
          const statsHeading = stat.querySelector('h2').textContent;
          const statsText = stat.querySelector('.stats__text');

          if (e.target.textContent === 'Daily' && statsHeading === title) {
            statsText.querySelector(
              'h3'
            ).textContent = `${timeframes.daily.current}hrs`;
            statsText.querySelector(
              'span'
            ).textContent = `Yesterday - ${timeframes.daily.previous}hrs`;
          } else if (
            e.target.textContent === 'Weekly' &&
            statsHeading === title
          ) {
            statsText.querySelector(
              'h3'
            ).textContent = `${timeframes.weekly.current}hrs`;
            statsText.querySelector(
              'span'
            ).textContent = `Last Week - ${timeframes.weekly.previous}hrs`;
          } else if (
            e.target.textContent === 'Monthly' &&
            statsHeading === title
          ) {
            statsText.querySelector(
              'h3'
            ).textContent = `${timeframes.monthly.current}hrs`;
            statsText.querySelector(
              'span'
            ).textContent = `Last Month - ${timeframes.monthly.previous}hrs`;
          }
        });
      });
    });
  });
});
