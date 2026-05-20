const names = [
  "Kicsim💖",
  "Szerelmem💗",
  "Hercegnőm👑",
  "Babám💞",
  "Egyetlenem💘",
  "Szívem💓",
  "Anyu😜"
];

function randomName(){
  return names[Math.floor(Math.random()*names.length)];
}

const gifts = [
{
  hint:`${randomName()}, ott keresd, ahol reggelente a legnehezebb felkelni… mert nem vagyok melletted.`,
  image:"kepek/1.png"
},
{
  hint:`${randomName()}, valami fontos lapul ott, ahol a ruhák titkos találkozókat tartanak 👗💗`,
  image:"kepek/2.png"
},
{
  hint:`${randomName()}, húzd ki a megfelelő helyet, ahogy énis kihúzom időbe😜`,
  image:"kepek/3.png"
},
{
  hint:`${randomName()}, nézz oda, ahol minden nap látod, milyen gyönyörű vagy — még akkor is, amikor te nem veszed észre.`,
  image:"kepek/4.png"
},
{
  hint:`${randomName()}, a végső célpont közelebb van hozzád, mint hinnéd 👀💕`,
  image:"kepek/5.png"
}
];

const chat = document.getElementById("chat");

let currentGift = 0;
let waiting = false;

function createMessage(text, sender="bot", image=null){

  const wrapper = document.createElement("div");
  wrapper.className = `message ${sender}`;

  const avatar = document.createElement("div");
  avatar.className = `avatar ${sender === "bot" ? "bot-avatar" : "user-avatar"}`;
  avatar.innerHTML = sender === "bot" ? "AI" : "Te";

  const bubble = document.createElement("div");
  bubble.className = "bubble";

  if(sender === "bot"){

    const typing = document.createElement("div");
    typing.className = "typing";

    bubble.appendChild(typing);

    wrapper.appendChild(avatar);
    wrapper.appendChild(bubble);

    chat.appendChild(wrapper);

    typeEffect(typing, text, () => {

      if(image){
        const img = document.createElement("img");
        img.src = image;
        img.className = "clue-image";
        bubble.appendChild(img);
      }

    });

  } else {

    bubble.innerText = text;

    wrapper.appendChild(avatar);
    wrapper.appendChild(bubble);

    chat.appendChild(wrapper);
  }

  chat.scrollTop = chat.scrollHeight;
}

function typeEffect(element, text, callback){

  let i = 0;

  const interval = setInterval(() => {

    element.textContent += text.charAt(i);

    i++;

    chat.scrollTop = chat.scrollHeight;

    if(i >= text.length){
      clearInterval(interval);
      element.style.borderRight = "none";

      if(callback) callback();
    }

  }, 24);
}

function thinking(callback){

  waiting = true;

  createMessage("AI gondolkodik...");

  setTimeout(() => {

    const botMessages = document.querySelectorAll(".message.bot");

    botMessages[botMessages.length - 1].remove();

    waiting = false;

    callback();

  }, 1200);
}

function sendMessage(){

  if(waiting) return;

  const input = document.getElementById("userInput");

  const text = input.value.trim().toLowerCase();

  if(!text) return;

  createMessage(text, "user");

  input.value = "";

  if(text.includes("tipp") || text.includes("igen")){

    thinking(() => {

      createMessage(gifts[currentGift].hint + "\nSegítségért írd be:\n - kép\nVagy ha megtaláltad:\n - megvan");

    });

  }

  else if(text.includes("kép") || text.includes("kep")){

    thinking(() => {

      createMessage(
        "Kép feltöltése folyamatban... ",
        "bot",
        gifts[currentGift].image
      );

      setTimeout(() => {

        createMessage("Ha megtaláltad az ajándékot, írd be:\n - megvan ");

      }, 1200);

    });

  }

  else if(text.includes("megvan")){

    thinking(() => {

      createMessage(
        "Ügyes vagy, " + randomName()
      );

      currentGift++;

      if(currentGift < gifts.length){

        setTimeout(() => {

          createMessage(
            "Jöhet a következő ajándék?"
          );

        }, 1200);

      } else {

        // 🔥 AUTOMATIKUS VÉGÜZENET + EMAIL KÜLDÉS
        setTimeout(() => {

          createMessage(
            "Megtaláltad az összes ajándékot! 💖\nNézd meg az e-mailjeidet 😉"
          );


          // EmailJS automatikus futtatás
          emailjs.send("service_8uk3dwk","template_hj7viip",{
          name: "asd",
          message: "asd",
          email: "sion7sion69@gmail.com",
          });

        }, 1200);
      }

    });

  }

  else{

    thinking(() => {

      createMessage(
        "Nincs ilyen parancs ocsemm\nPróbáld ezt:\n• tipp\n• kép\n• megvan"
      );

    });
  }
}

document.getElementById("userInput")
.addEventListener("keypress", function(e){

  if(e.key === "Enter"){
    sendMessage();
  }

});

function intro(){

  createMessage(
`Szia, ChatGPT 💖

5 kis ajándékot rejtettem el a szobában...
LeilaGPT készen áll a játékra.

Kezdéshez írd be:
• tipp`
  );

}

function floatingHearts(){

  const container = document.querySelector(".hearts");

  setInterval(() => {

    const heart = document.createElement("div");

    heart.className = "floating-heart";

    heart.innerHTML = "💖";

    heart.style.left = Math.random()*100 + "vw";

    heart.style.fontSize = (16 + Math.random()*16) + "px";

    heart.style.animationDuration = (5 + Math.random()*5) + "s";

    container.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 10000);

  }, 500);
}

intro();
floatingHearts();
