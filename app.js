async function getRate(from, to) {
    const response = await fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}`)
    const data = await response.json();
    return data.result
}

async function getAllCurrenices(event) {
    const response = await fetch(`https://api.exchangerate.host/symbols`)
    const data = await response.json();
    console.log(data)

    let targetFrom = document.getElementById('from');
    let targetTo = document.getElementById('to');

    let symbols = data.symbols

    for (let row in symbols) {
        let fromElement = document.createElement('option');
        fromElement.setAttribute('value', row);
        fromElement.innerHTML = `${row} - ${symbols[row].description}`;
        let toElement = document.createElement('option');
        toElement.setAttribute('value', row);
        toElement.innerHTML = `${row} - ${symbols[row].description}`;
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


    const rate = await getRate(from, to);
    console.log(rate)

    const result = Number(amount) * Number(rate);

    document.getElementById('result').value = Number(result).toFixed(2);

};