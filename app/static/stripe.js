
function getAbsoluteUrl(path) {
    var loc = window.location
    return `${loc.protocol}//${loc.hostname}:${loc.port}${path}`;
}

function invoke_paid_estimation(paymentCallback) {
    // either it's first calculation attempt or all calculations have been used - initiating payment dialog
    if (!window.paymentData || window.paymentData.calculationsLeft === 0) {
        // setup initial state
        $(".ElementsModal--modal").remove();
        window.paymentData = null

        var xhr = new XMLHttpRequest();
        xhr.open("POST", getAbsoluteUrl("/initiatepayment"),true);

        xhr.onerror = function () {
            alert(xhr.responseText);
        };
        xhr.onloadend = function (e) {
            var response = JSON.parse(e.target.responseText);

            window.paymentModal.create({
                businessName: "www.EstimateBodyFat.com",
                // not used for now
                productName: "Get 3 Body Fat % Estimates",
                amount: response.payment_amount
            });

            window.paymentData = {
                paymentKey: response.payment_key,
                paymentId: response.payment_id,
                paymentPublishableKey: response.publishable_key,
                // will be fulfilled after the payment
                calculationsLeft: 0
            }

            start_payment(window.paymentData, paymentCallback);
        };
        xhr.send();

    // payed calculation is available - process to the calculation callback
    } else {
        paymentCallback(window.paymentData)
        window.paymentData.calculationsLeft = window.paymentData.calculationsLeft - 1
    }
}

function start_payment(paymentData, paymentCallback) {
    togglePaymentModalVisibility();

    var stripe = Stripe(paymentData.paymentPublishableKey);

    // Create an instance of Elements.
    var elements = stripe.elements();

    // Create an instance of the card Element.
    var card = elements.create("card", {
        hidePostalCode: true
    });

    // Add an instance of the card Element into the `card-element` <div>.
    card.mount("#card-element");

    // Handle payment submission when user clicks the pay button.
    var form = document.getElementById("payment-form");
    form.addEventListener("submit", function(event) {
        document.getElementById("overlay").style.display = "block"
        event.preventDefault();
        customerEmail = document.getElementById("stripe-email").value
        stripe
            .confirmCardPayment(paymentData.paymentKey, {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: customerEmail
                    }
                },
                receipt_email: customerEmail
            })
            .then(function(result) {
                document.getElementById("overlay").style.display = "none"
                if (result.error) {
                    var displayError = document.getElementById("card-errors");
                    displayError.textContent = result.error.message;
                } else {
                    stripePaymentHandler(paymentData, paymentCallback);
                }
            });
    });
}

// Implement logic to handle the users authorization for payment.
// Here you will want to redirect to a successful payments page, or update the page.
function stripePaymentHandler(paymentData, paymentCallback) {
    window.paymentData.calculationsLeft = 3
    togglePaymentModalVisibility();
    paymentCallback(paymentData)
    window.paymentData.calculationsLeft = window.paymentData.calculationsLeft - 1


}

function calculateDisplayAmountFromCurrency(amount) {
    var amountToDisplay = amount / 100;

    return amountToDisplay.toLocaleString("en", {
        style: "currency",
        currency: "usd"
    });
}

function init(content) {
    var amount = calculateDisplayAmountFromCurrency(content.amount);
    var modal = document.createElement("div");
    modal.className = "ElementsModal--modal";
    modal.innerHTML = `
  <div id="stripe-modal" class="ElementsModal--modal-content">
  <div id="overlay"> </div>
  <div class="ElementsModal--top-banner">
    <div class="ElementsModal--sales-info">
      <div class="ElementsModal--top">
        <div class="ElementsModal--company">${content.businessName || ""}</div>
        <button class="ElementsModal--close" onClick="window.paymentModal.toggleElementsModalVisibility()">
          <svg
            width="20px"
            height="20px"
            viewBox="0 0 20 20"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <defs>
              <path
                d="M10,8.8766862 L13.6440403,5.2326459 C13.9542348,4.92245137 14.4571596,4.92245137 14.7673541,5.2326459 C15.0775486,5.54284044 15.0775486,6.04576516 14.7673541,6.3559597 L11.1238333,9.99948051 L14.7673541,13.6430016 C15.0775486,13.9531961 15.0775486,14.4561209 14.7673541,14.7663154 C14.4571596,15.0765099 13.9542348,15.0765099 13.6440403,14.7663154 L10,11.1222751 L6.3559597,14.7663154 C6.04576516,15.0765099 5.54284044,15.0765099 5.2326459,14.7663154 C4.92245137,14.4561209 4.92245137,13.9531961 5.2326459,13.6430016 L8.87616671,9.99948051 L5.2326459,6.3559597 C4.92245137,6.04576516 4.92245137,5.54284044 5.2326459,5.2326459 C5.54284044,4.92245137 6.04576516,4.92245137 6.3559597,5.2326459 L10,8.8766862 Z"
                id="path-1"
              ></path>
            </defs>
            <g
              id="Payment-recipes"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
            >
              <g
                id="Elements-Popup"
                transform="translate(-816.000000, -97.000000)"
              >
                <g id="close-btn" transform="translate(816.000000, 97.000000)">
                  <circle
                    id="Oval"
                    fill-opacity="0.3"
                    fill="#AEAEAE"
                    cx="10"
                    cy="10"
                    r="10"
                  ></circle>
                  <mask id="mask-2" fill="white">
                    <use xlink:href="#path-1"></use>
                  </mask>
                  <use
                    id="Mask"
                    fill-opacity="0.5"
                    fill="#FFFFFF"
                    opacity="0.5"
                    xlink:href="#path-1"
                  ></use>
                </g>
              </g>
            </g>
          </svg>
        </button>
      </div>
      <div class="ElementsModal--product ElementsModal--details">
        <div>
            <div>3 Body Fat % Estimates</div>
            <div style="text-align: center; font-weight: bold">+</div>
            <div>FREE Keto Course (worth $75)</div>
        </div>
      </div>
      <div class="ElementsModal--price ElementsModal--details">${amount}</div>
    </div>
  </div>
  <div class="ElementsModal--payment-details">
    <form
      class="ElementsModal--payment-form"
      id="payment-form"
    >
      <div class="form-row">
        <div class="ElementsModal--forms">
          <div class="ElementsModal--form">
            <label for="ElementsModal--card-element">
              <span class="ElementsModal--form-label spacer"
                >Card details</span
              >
              <div class="StripeElement" id="card-element">
                <!-- A Stripe Element will be inserted here. -->
              </div>
            </label>
            <!-- Used to display form errors. -->
            <div
              id="card-errors"
              class="ElementsModal--error-message"
              role="alert"
            ></div>
          </div>
          <div class="ElementsModal--form">
            <label class="select">
              <span class="ElementsModal--form-label spacer">Payment email</span>
              <div class="ElementsModal--form-select">
                <input id="stripe-email" type="text" aria-label="Payment email">
              </div>
            </label>
          </div>
          <div class="ElementsModal--form">
            <input
              type="hidden"
              name="amount"
              value="${amount}"
            />
            <input
              type="hidden"
              name="description"
              value="${content.productName}"
            />
            <button class="ElementsModal--pay-button">Pay ${amount}</button>
          </div>
          <!-- Edit your terms and conditions here   -->
          <div class="footer ElementsModal--footer-text">
            By purchasing this body fat estimate, you agree to estimatebodyfat.com
            <a target="_blank" class="ElementsModal--footer-text" href="https://www.estimatebodyfat.com/termsofuse.html"
              > Terms and Conditions.</a
            >
          </div>
        </div>
      </div>
    </form>
  </div>
</div>
`;
    // insert modal in dom
    document.body.insertBefore(modal, document.body.firstChild);
}

function togglePaymentModalVisibility() {
    var modal = document.querySelector(".ElementsModal--modal");
    modal.classList.toggle("ElementsModal--show-modal");
}

function create(content) {
    init(content);

    // UI enhancement to dismiss the Elements modal when the user clicks
    // outside of the modal and in the window.
    function dismissElementsModalOnWindowClick(event) {
        var modal = document.querySelector(".ElementsModal--modal");
        if (
            event.target === modal &&
            modal.classList[1] === "ElementsModal--show-modal"
        ) {
            togglePaymentModalVisibility();
        }
    }
    window.addEventListener("click", dismissElementsModalOnWindowClick);

    // Allows the user to dismiss the Elements modal when using the esc key
    document.addEventListener("keyup", function(event) {
        if (event.defaultPrevented) {
            return;
        }

        var key = event.key || event.keyCode;

        if (key === "Escape" || key === "Esc" || key === 27) {
            var modal = document.querySelector(".ElementsModal--modal");
            if (modal.classList[1] === "ElementsModal--show-modal") {
                togglePaymentModalVisibility();
            }
        }
    });
}


window.paymentModal = (() => {
    return { create, toggleElementsModalVisibility: togglePaymentModalVisibility };
})();
