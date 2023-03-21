import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { loadStripe } from "@stripe/stripe-js";
import { Cart, CartItem } from "src/app/models/cart.model";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
})
export class CartComponent implements OnInit {
  cart: Cart = {
    items: [
      {
        product: "https://via.placeholder.com/150",
        name: "snickers",
        price: 150,
        quantity: 1,
        id: 1,
      },
      {
        product: "https://via.placeholder.com/150",
        name: "snickers",
        price: 100,
        quantity: 5,
        id: 2,
      },
      {
        product: "https://via.placeholder.com/150",
        name: "snickers",
        price: 200,
        quantity: 2,
        id: 3,
      },
    ],
  };

  dataSource: Array<CartItem> = [];
  dispplayedColumuns: Array<string> = [
    "product",
    "name",
    "price",
    "quantity",
    "total",
    "action",
  ];

  constructor(private cartService: CartService, private http: HttpClient) {}

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
    // return item
    //   .map((item) => item.price * item.quantity)
    //   .reduce((prev, current) => prev + current, 0);
  }

  onCleartCart(): void {
    this.cartService.clearCart();
  }

  onRemoveFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }

  onAddQuantify(item: CartItem): void {
    this.cartService.addToCart(item);
  }

  onRemoveQuantify(item: CartItem): void {
    this.cartService.removeQuantity(item);
  }

  onCheckout(): void {
    this.http
      .post("http://localhost:4242/checkout", {
        items: this.cart.items,
      })
      .subscribe(async (res: any) => {
        let stripe = await loadStripe(
          "pk_test_51MnlgDSANat8DXCIWp4jPkdVROUQ9wXCymb5v7hyqQkpjv7grKUYLMsSvGQW6Jk7klMgey7OQlLYhWYhN7ArNLsm00VImfq5HO"
        );
        stripe?.redirectToCheckout({
          sessionId: res.id,
        });
      });
  }
  // onCheckout(): void {
  //   this.http
  //     .post("http://localhost:4242/checkout", {
  //       items: this.cart.items,
  //     })
  //     .subscribe(async (res: any) => {
  //       let stripe = await loadStripe("");
  //       stripe?.redirectToCheckout({
  //         sessionId: res.id,
  //       });
  //     });
  // }
}
