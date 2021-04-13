const form = document.querySelector('#form');
const input = document.querySelector('.inputField');
const result = document.querySelector('.result');

const getData = async address => {
  try {
    result.textContent = 'Loading...';

    const response = await fetch(`/weather?address=${address}`);

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    result.textContent = `Location: ${data.location} and the forecast: ${data.forecast}`;
  } catch (err) {
    result.textContent = err.message;
  }
};

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const address = input.value;

    getData(address);

    input.value = '';
  });
}
