const fromAmountElement = document.querySelector(".amount");
const convertedAmountElement = document.querySelector(".convertedAmount");
const fromCurrencyElement = document.querySelector(".fromcurrency");
const tocurrencyElement = document.querySelector(".tocurrency");
const resultElement = document.querySelector(".result");
resultElement.textContent = "fetching Exchange Rates!"
const converterContainer = document.querySelector('.converter-container')

// Array to populate the select tags with these countries..
const countries = [
    
    {code : "USD" , name :"united states Dollar"},
    {code : "INR" , name :"INDIAN RUPEES"},
    {code : "AED" , name :"ARAB EMIRATES DEHRUM"},
    {code : "CNY" , name :"CHINESE YUAN"},
    {code : "HKD" , name :"HONG KONG DOLLAR"},
    {code : "HRK" , name :"CROTIAN KUNA"},
    {code : "PKR" , name :"PAKISTANI RUPEES"},
    {code : "JPY" , name :"JAPANESE YEN"},
    {code : "ISK" , name :"ICELANDIC KRONA"},
    

    
];

// SHOIWNG CONTRIES FROM ARRAY TO SELECT TAG

countries.forEach((country)=>{
    const option1 =document.createElement('option');
    option1.value=country.code;
    option1.textContent = `${country.code} (${country.name})`
    fromCurrencyElement.appendChild(option1);

    const option2 =document.createElement('option');
    option2.value=country.code;
    option2.textContent = `${country.code} (${country.name})`
    tocurrencyElement.appendChild(option2);

    // SHOWING CONTRIES DEFUALT VALUES!
    fromCurrencyElement.value = "USD";
    tocurrencyElement.value = "INR";
})

// FUNCTION TO GET EXVHANGE RATE USING API

const getExchangeAmount = async() =>{
    const amount = parseFloat(fromAmountElement.value);
    const fromcurrency = fromCurrencyElement.value;
    const tocurrency = tocurrencyElement.value;
    resultElement.textContent = "fetching Exchange Rates!"

    try{
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromcurrency}`);
        const data = await response.json();
        const conversionrate = data.rates[tocurrency];
        const convertedAmount = (amount*conversionrate).toFixed(2);

        if(typeof conversionrate ==="undefined")
        {
            resultElement.textContent ="Exchange Rate data isn't available for selected country!"
            convertedAmountElement = "";
        }
        else{
            convertedAmountElement.value  =convertedAmount;
            resultElement.textContent = `${amount} ${fromcurrency} = ${convertedAmount} ${tocurrency}`;
        
        }
       
    }
    catch(error){
        converterContainer.innerHTML = `<h2>Error while fetching exchange Rates!</h2>`;
    }

    // fetch data from api
}

// fetching exchange-rate when user inputs the amount!
fromAmountElement.addEventListener('input',getExchangeAmount);
// fetching exchange-rate when user chnag ethe currency!

fromCurrencyElement.addEventListener('change',getExchangeAmount);
tocurrencyElement.addEventListener('change',getExchangeAmount);
window.addEventListener('load',getExchangeAmount);