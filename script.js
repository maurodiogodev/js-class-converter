const USD = 5.88
const EUR = 6.20
const GBP = 7.50

const form = document.querySelector("form")
const amount = document.querySelector("#amount")
const currency = document.querySelector("#currency")
const footer = document.querySelector("main footer")
const description = document.querySelector("#description")
const result = document.querySelector("#result")
const errorMessage = document.querySelector("footer p")

amount.addEventListener("input", () => {
    const hasCharactersRegex = /\D+/g

    amount.value = amount.value.replace(hasCharactersRegex, "")
})

form.onsubmit = (event) => {
    event.preventDefault()

    switch (currency.value) {
        case "USD":
            convertCurrency(amount.value, USD, "US$")
            break;

        case "EUR":
            convertCurrency(amount.value, EUR, "€")
            break;

        case "GBP":
            convertCurrency(amount.value, GBP, "£")
            break;
    }
}

function convertCurrency(amount, price, symbol) {

    try {

        let baseCurrency
        if (price === USD) {
            baseCurrency = `${symbol} 1`
        } else {
            baseCurrency = `${symbol}1`
        }

        description.textContent = `${baseCurrency} = ${formatCurrencyBRL(price)}`

        let total = amount * price

        if (isNaN(total)) {
            errorMessage.textContent = "Digite um valor numérico!"
            footer.classList.add("show-result")
            return
        }

        total = formatCurrencyBRL(total).replace("R$", "")
        result.textContent = `${total} Reais`

        footer.classList.remove("error-message")
        footer.classList.add("show-result")
    } catch (error) {
        footer.classList.add("error-message")
        console.log(error)
    }
}

function formatCurrencyBRL(value) {
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })
}