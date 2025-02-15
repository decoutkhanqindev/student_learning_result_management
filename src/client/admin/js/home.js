document.addEventListener("DOMContentLoaded", () => {
  // handle active class for nav items
  // 1. get all nav items
  const navItems = document.querySelectorAll(".nav-item");
  // 2. loop through all nav items
  navItems.forEach((item) => {
    // 3. add click event on each nav item
    item.addEventListener("click", () => {
      // 4. remove active class for all nav items
      navItems.forEach((item) => {
        item.classList.remove("active");
      });
      // 5. add active class for current nav item
      item.classList.add("active");
    });
  });
});
