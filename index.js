function getMenu() {
  // "https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json"
  return fetch(
    "https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json"
  )
    .then((response) => response.json())
    .then((data) => {
      const menulist = document.getElementById("menu-list");
      data.forEach((item) => {
        const menuitem = document.createElement("li");
        menuitem.textContent = `${item.name} - ${item.price}`;
        menulist.appendChild(menuitem);
      });
    })
    .catch((error) => {
      console.log("Error fetching the data: " + error);
    });
}

function takeOrder() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const burgers = ["Cheeseburger", "Chicken Burger", "Veggie Burger"];
      const randomBurgers = [];
      for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * burgers.length);
        randomBurgers.push(burgers[randomIndex]);
      }
      const order = { burgers: randomBurgers };
      resolve(order);
    }, 2500);
  });
}

function orderPrep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ order_status: true, paid: false });
    }, 1500);
  });
}

function payOrder() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ order_status: true, paid: true });
    }, 1000);
  });
}

function thankyouFnc() {
  alert("Thank you for eating with us today!");
}

// Handle promises using async/await
async function processOrder() {
  try {
    await getMenu();
    const order = await takeOrder();
    const prepStatus = await orderPrep();
    const paymentStatus = await payOrder();
    updateStatus("Order status: Paid");
    thankyouFnc();
  } catch (error) {
    console.error("Error processing order:", error);
  }
}

function updateStatus(message) {
  const statusMessage = document.getElementById("status-message");
  statusMessage.textContent = message;
}

// Call the processOrder function to start the order processing
processOrder();
