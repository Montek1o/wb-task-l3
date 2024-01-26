import "./icons";
import Router from "./router";
import { cartService } from "./services/cart.service";
import { userService } from "./services/user.service";

async function app() {
  cartService.init();
  await userService.init();

  const route = new Router();
  route.route();

  setTimeout(() => {
    document.body.classList.add("is__ready");
  }, 250);
}

app();
