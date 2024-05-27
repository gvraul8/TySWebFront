import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentsService } from '../services/payments/payments.service';
import { stripeKEY } from 'src/app/app.properties';


declare let Stripe: any;

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit, AfterViewInit {
  showModal = false;
  showPaymentForm = false;
  amount: number = 1;
  transactionId?: string;
  stripe: any;
  card: any;
  submitButton: any;

  constructor(private router: Router, private paymentsService: PaymentsService) {
    this.stripe = Stripe(stripeKEY);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.showPaymentForm) {
      this.showForm();
    }
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  closePaymentForm() {
    this.showPaymentForm = false;
  }

  requestPrepayment() {
    this.paymentsService.prepay(this.amount).subscribe({
      next: (response: any) => {
        this.transactionId = response.body;
        this.showModal = false;
        this.showPaymentForm = true;
        
        setTimeout(() => {
          this.showForm();
        }, 0);
      },
      error: (error: any) => {
        alert(error);
        console.error('Error initiating payment:', error);
      }
    });
  }

  showForm() {
    let elements = this.stripe.elements();
    let style = {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        fontFamily: 'Arial, sans-serif',
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    };
    this.card = elements.create("card", { style: style });
    this.card.mount("#card-element");
    this.card.on("change", function (event: any) {
      document.querySelector("button")!.disabled = event.empty;
      document.querySelector("#card-error")!.textContent =
        event.error ? event.error.message : "";
    });
    let self = this;
    let form = document.getElementById("payment-form");
    form!.addEventListener("submit", function (event) {
      event.preventDefault();
      self.payWithCard(self.card);
    });
    form!.style.display = "block";
  }

  payWithCard(card: any) {
    let self = this;
    this.submitButton = document.querySelector("button");
    this.submitButton.disabled = true;

    this.stripe.confirmCardPayment(this.transactionId, {
      payment_method: {
        card: card
      }
    }).then(function (response: any) {
      self.submitButton.disabled = false;

      if (response.error) {
        alert(response.error.message);
      } else {
        if (response.paymentIntent.status === 'succeeded') {
          alert("Pago exitoso");
          self.router.navigate(["/Juegos"]);
        }
      }
    });
  }

}
