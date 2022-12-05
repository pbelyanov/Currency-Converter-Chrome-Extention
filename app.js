async function getRate(from, to, amount) {
    const response = await fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`, {
        method: 'GET',
        headers: {
            'apikey': 'ugKDa0ZpOXEe75Y5gTE04j0Pyh3jJNR8'
        },
    })
    const data = await response.json();
    return data.result
}

async function getAllCurrenices(event) {
    const response = await fetch(`https://api.apilayer.com/exchangerates_data/symbols`, {
        method: 'GET',
        headers: {
            'apikey': 'ugKDa0ZpOXEe75Y5gTE04j0Pyh3jJNR8'
        },
    })
    const data = await response.json();

    let targetFrom = document.getElementById('from');
    let targetTo = document.getElementById('to');

    let symbols = data.symbols

    for (let row in symbols) {
        let fromElement = document.createElement('option');
        fromElement.setAttribute('value', row);
        fromElement.innerHTML = `${row} - ${symbols[row]}`;
        let toElement = document.createElement('option');
        toElement.setAttribute('value', row);
        toElement.innerHTML = `${row} - ${symbols[row]}`;
        targetFrom.appendChild(fromElement);
        targetTo.appendChild(toElement);
    }

    let submitButton = document.getElementById('submit')

    submitButton.addEventListener('click', calculateRate)

}

addEventListener('load', getAllCurrenices);





async function calculateRate() {
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const amount = document.getElementById('amount').value;


    const result = await getRate(from, to, amount);

    const response = await fetch(`https://api.apilayer.com/exchangerates_data/symbols`, {
        method: 'GET',
        headers: {
            'apikey': 'ugKDa0ZpOXEe75Y5gTE04j0Pyh3jJNR8'
        },
    });


    document.getElementById('result').value = Number(result).toFixed(2);

};