    const games = [
{ url: "https://agar.su/", video: "https://игры.online/video/agarsu.mp4" },
{ url: "https://agartime.ru/", img: "https://agartime.ru/img/512x512.png" },
{ url: "https://krunker.io/", img: "https://clan.steamstatic.com/images/39005686/ebb792ee30c08f6ba1241398ecd6ca021c760edc.png" },
{ url: "https://shellshock.io/", img: "https://www.shellshock.io/img/previewImage_shellShockers.webp" },
{ url: "https://games.voodoo.io/paperio2", img: "https://игры.online/photo/paper.png" },
{ url: "https://smashkarts.io/", img: "https://watchdocumentaries.com/wp-content/uploads/smash-karts-game-768x432.jpg" },
{ url: "https://www.onlinegames.io/games/2021/unity/army-combat/index.html", img: "https://static.wgplayground.com/a46bcda7b51d30c2427700dc1d51e28e/wgplayground/69afdcaf7beb92af828db763568e1ffe.jpg" },
{ url: "https://starve.io/", img: "https://starve.io/img/share-banner.png" },
{ url: "https://hordes.io/", img: "https://cubiq.ru/wp-content/uploads/2023/01/hordes-io-base-660x371.webp" },
{ url: "https://miniroyale.io/", img: "https://miniroyale.io/thumbnail.jpg?v=1.1.145" },
{ url: "https://slowroads.io/", img: "https://slowroads.io/meta-2.0.0.jpg" },
{ url: "https://littlebigsnake.com/", img: "https://littlebigsnake.com/img/sharing_img.png" },
{ url: "https://gartic.io/", img: "https://gartic.io/static/images/thumb.png?v=10" },
{ url: "https://taming.io/", img: "https://игры.online/photo/tamingio.png" }
];
    function extractName(url) {
        try {
            const u = new URL(url);
            return u.hostname.replace("www.", ""); // slug = домен
        } catch {
            return url;
        }
    }

function buildGrid(list){
    const grid = document.getElementById("grid");
    grid.innerHTML = "";

    list.forEach(g => {
        const title = extractName(g.url);

        let mediaHTML = "";

        if (g.video) {
            mediaHTML = `
                <video 
                    class="thumb" 
                    autoplay 
                    loop 
                    muted 
                    playsinline
                    src="${g.video}">
                </video>
            `;
        } else {
            mediaHTML = `
                <img src="${g.img}" class="thumb" alt="${title}">
            `;
        }

        const card = document.createElement("div");
        card.className = "game-card";
        card.innerHTML = `
            ${mediaHTML}
            <div class="info">
                <div class="title">${title}</div>
                <a class="play-btn" href="/game/?url=${encodeURIComponent(g.url)}">Играть</a>
            </div>
        `;

        grid.appendChild(card);
    });
}

document.getElementById("search").addEventListener("input", e => {
    const term = e.target.value.toLowerCase();

    const filtered = games.filter(g =>
        extractName(g.url).toLowerCase().includes(term)
    );

    buildGrid(filtered);
});

/* Счетчик игр */
function updateCounter() {
    document.getElementById("game-counter").textContent =
        "бесплатных игр сейчас: " + games.length;
}

/* АВТО-ТЕМА */
const mediaQuery=window.matchMedia("(prefers-color-scheme: dark)");
function applyTheme(t){document.documentElement.setAttribute("data-theme",t);}
function initTheme(){
    const saved=localStorage.getItem("theme");
    applyTheme(saved || (mediaQuery.matches?"dark":"light"));
}
function toggleTheme(){
    const current=document.documentElement.getAttribute("data-theme");
    const newTheme=current==="dark"?"light":"dark";
    applyTheme(newTheme);
    localStorage.setItem("theme",newTheme);
}
mediaQuery.addEventListener("change",e=>{
    if(!localStorage.getItem("theme")){
        applyTheme(e.matches?"dark":"light");
    }
});

buildGrid(games);
initTheme();
updateCounter();
