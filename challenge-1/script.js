document.addEventListener("DOMContentLoaded", () => {
    const faqItems = document.querySelectorAll(".item");
  
    faqItems.forEach((item) => {
      const question = item.querySelector(".question");
      const icon = document.createElement("img");
      icon.src = "./assets/images/icon-plus.svg";
      icon.alt = "Plus Icon";
      icon.classList.add("icon");
      question.appendChild(icon);
  
      question.addEventListener("click", () => {
        const isActive = item.classList.contains("active");
        
        // Close all open items
        faqItems.forEach((faq) => {
          faq.classList.remove("active");
          faq.querySelector(".icon").src = "./assets/images/icon-plus.svg";
        });
        
        if (!isActive) {
          item.classList.add("active");
          icon.src = "./assets/images/icon-minus.svg";
        } else {
          icon.src = "./assets/images/icon-plus.svg";
        }
      });
    });
  });
  