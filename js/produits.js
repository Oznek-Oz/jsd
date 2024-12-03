fetchData();

async function fetchData(){
    const reponse = await fetch('/json/produits.json');
    const produits = await reponse.json();    
    init(produits);
}

function init(gasData){
    gasData.forEach(gas => {
        addArticle(gas);
    });
    btnInfoPopup();

    const btnInfos = document.querySelectorAll('.btnInfo');
    const descripName = document.querySelector('.descripName');
    const descripDispo = document.querySelector('.descripDispo');
    const descripPU = document.querySelector('.descripPU');

    btnInfos.forEach(btn => {
        btn.addEventListener('click', () => {
            const dataId = btn.getAttribute('data-id');
            for (let i = 0; i < gasData.length; i++) {
                if (gasData[i].id === parseInt(dataId)) {
                    descripName.innerHTML = `${gasData[i].name}`;
                    let val = "Non";
                    if (gasData[i].disponible) { val = "Oui"; }
                    descripDispo.innerHTML = `${val}`;
                    descripPU.innerHTML = `${gasData[i].price} XAF`;
                }
            }
        });
    });
}

function addArticle(gas){
    let couleurRond = '';
    if (gas.disponible) { couleurRond = 'red';}else{ couleurRond = 'blue';}
    const parentArticle = document.querySelector('.parentArticle');
    const article = 
    `
        <article>
            <div class="card shadow-sm">
                <div class="card-header">
                    <div class="petitRond" style = "background-color:${couleurRond}"></div>
                    <h5>${gas.name}</h5>
                    <button type="button" class="btn btnPanier">
                        <img src="/images/icons/panier.png" alt="" width="25px" height="25px">
                    </button>
                </div>
                <div class="card-body">
                </div>
                <div class="card-footer">
                    <button class="btn btnInfo" data-id="${gas.id}">Info</button>
                    <div class="input-group">
                        <input class="form-control fw-bold" type="text" value="${gas.price}" disabled>
                        <div class="input-group-append">
                            <span class="input-group-text px-1">XAF</span>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    `;
    parentArticle.innerHTML += article ;
}

function search(gas){
    const searchBar = document.querySelector('.inputSearch');
    searchBar.addEventListener('input', () => {
        document.querySelector('.parentArticle').innerHTML = '';

        const searchResult = gas.filter((gas) => {
            return gas.nom === searchBar.value;
        });
        searchResult.forEach(element => {
            addArticle(element);
        });
    });
}

function btnInfoPopup(){
    const btnInfos = document.querySelectorAll('.btnInfo');
    const popupInfo = document.querySelector('.popupInfo');
    const overlay = document.querySelector('.overlay');
    const btnFermerPopup = document.querySelector('.btnFermerPopup');

    btnInfos.forEach(btn => {
        
        btn.addEventListener('click', () => {
            showPopup(overlay,popupInfo);
        });
    });
    
    overlay.addEventListener('click', () => {
        hidePopup(overlay, popupInfo);
    });
    btnFermerPopup.addEventListener('click', () => {
        hidePopup(overlay, popupInfo);
    });
}

function showPopup(overlay, popupInfo){
    overlay.classList.remove('d-none');
    popupInfo.classList.remove('d-none');
}

function hidePopup(overlay, popupInfo){
    overlay.classList.add('d-none');
    popupInfo.classList.add('d-none');
}